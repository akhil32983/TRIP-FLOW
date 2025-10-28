import { API_BASE_URL } from "@/config/environment";
import { AUTH_LOCAL_STORAGE_KEY } from "@/providers/authProvider";
import { removeFromLocalStorage } from "@/utils/localStorageUtils";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const isAuthEndpoint = (path: string): boolean => {
    return path.startsWith("/api/auth/") || path === "/api/auth";
}

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(null);
    }
  });
  failedQueue = [];
};

async function refreshAuthToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function http<T>(
  path: string,
  method: HttpMethod = "GET",
  body?: unknown
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body) options.body = JSON.stringify(body);

  const url = `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const response = await fetch(url, options);

  // Handle 401 with refresh logic
  if (response.status === 401 && !isAuthEndpoint(path)) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => http<T>(path, method, body));
    }

    isRefreshing = true;

    try {
      const refreshed = await refreshAuthToken();

      if (refreshed) {
        processQueue(null);
        isRefreshing = false;
        return http<T>(path, method, body);
      } else {
        processQueue(new Error("Session expired"));
        isRefreshing = false;
        removeFromLocalStorage(AUTH_LOCAL_STORAGE_KEY);
        window.location.href = "/login";
        throw new Error("Session expired");
      }
    } catch (error) {
      processQueue(error as Error);
      isRefreshing = false;
      removeFromLocalStorage(AUTH_LOCAL_STORAGE_KEY);
      window.location.href = "/login";
      throw error;
    }
  }

  const data = await response.json();
  return data as T;
}
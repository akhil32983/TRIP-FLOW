import { API_BASE_URL } from "@/config/environment";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function http<T>(
  path: string,
  method: HttpMethod = "GET",
  body?: unknown
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      withCredentials: "true",
    },
  };

  if (body) options.body = JSON.stringify(body);

  const url = `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  // Perform the HTTP request
  const response = await fetch(url, options);

  // Parse the response
  const data = await response.json();

  return data as T;
}

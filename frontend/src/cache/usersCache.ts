import type { PublicUser } from "@/types/user";
import type { PageResponse } from "@/types/shared";

import { MemoryCache } from "@/utils/cache";

export const usersCache = new MemoryCache<string, PageResponse<PublicUser>>();

export const getUsersCacheKey = (page: number, search?: string) => {
    return `users|page:${page}|search:${search}`;
}
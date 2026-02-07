import type { PublicUser, UpdateProfileRequest } from "@/types/user";
import { http } from "./httpService";

import type { PageRequest, PageResponse } from "@/types/shared";

const BASE_PATH = "/api/v1/users";

/**
 * Retrieves a paginated list of users.
 * 
 * @param page The page number to retrieve.
 * @param search The search query to filter users by username.
 * @returns A promise that resolves to a page of users.
 */
export async function getUsers(page: PageRequest, search?: string): Promise<PageResponse<PublicUser>> {
    const query = new URLSearchParams({ page: page.page.toString(), size: page.size.toString() });
    if (search) query.append("search", search);
    
    return http<PageResponse<PublicUser>>(`${BASE_PATH}?${query.toString()}`, "GET");
}

/**
 * Deletes the user with the given username.
 * 
 * @param username The username of the user to delete.
 * @returns A promise that resolves when the user is deleted.
 */
export async function deleteAccount(username: string): Promise<void> {
    await http(`${BASE_PATH}/${username}`, "DELETE");
}

/**
 * Updates the profile of the user with the given username.
 * 
 * @param username The username of the user to update.
 * @param request The update profile request.
 * @returns A promise that resolves to the updated public user.
 */
export async function updateProfile(
    username: string,
    request: UpdateProfileRequest
): Promise<PublicUser> {
    return http<PublicUser>(`${BASE_PATH}/${username}`, "PUT", request);
}

/**
 * Uploads an avatar for the user with the given username.
 * 
 * @param username The username of the user to upload the avatar for.
 * @param file The file to upload as the avatar.
 * @returns A promise that resolves when the avatar is uploaded.
 */
export async function uploadAvatar(username: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append("avatar", file);
    await http(`${BASE_PATH}/${username}/avatar`, "POST", formData);
}
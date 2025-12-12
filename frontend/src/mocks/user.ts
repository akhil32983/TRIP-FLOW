import type { PageResponse } from "@/types/shared";
import type { PublicUser, UpdateProfileRequest } from "@/types/user";

const date = new Date().toISOString();

export const mockUser = {
    "/api/v1/users/:username": async (
        method: string,
        body?: unknown
    ): Promise<PublicUser | boolean> => {
        switch (method) {
            case "GET": {
                const user: PublicUser = {
                    name: "Demo User",
                    username: "demoUser",
                    description: "This is a demo user.",
                    location: "Demo City",
                    createdAt: date,
                    role: "USER",
                    plan: "FREE"
                }

                return user;
            }

            case "PUT": {
                const bodyData = body as UpdateProfileRequest;

                const user: PublicUser = {
                    name: bodyData.name || "Demo User",
                    username: "demoUser",
                    description: bodyData.description || "Updated description",
                    location: bodyData.location || "Updated location",
                    createdAt: date,
                    role: "USER",
                    plan: "FREE"
                }

                return user;
            }

            case "DELETE": {
                return true;
            }

            default:
                throw new Error(`Method ${method} not allowed on /api/v1/users/:username`);
        }
    },

    "/api/v1/users": async(_method: string): Promise<PageResponse<PublicUser>> => ({
        page: [{
            name: "Demo User",
            username: "demoUser",
            description: "This is a demo user.",
            location: "Demo City",
            createdAt: date,
            role: "USER",
            plan: "FREE"
        }],
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 1,
        isLastPage: true
    }),

    "/api/v1/users/:username/avatar": async (method: string): Promise<boolean> => {
        switch (method) {
            case "POST": {
                return true;
            }

            case "GET": {
                return true;
            }

            default:
                throw new Error(`Method ${method} not allowed on /api/v1/users/:username/avatar`);
        }
    }
}
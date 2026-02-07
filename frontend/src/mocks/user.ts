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
                    notificationsAllowed: true,
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
                    notificationsAllowed: bodyData.notificationsAllowed ?? true,
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

    "/api/v1/users": async (_method: string, _body: unknown, url?: string): Promise<PageResponse<PublicUser>> => {
        const users: PublicUser[] = [
            {
                name: "Demo User",
                username: "demoUser",
                description: "This is a demo user.",
                location: "Demo City",
                notificationsAllowed: true,
                createdAt: date,
                role: "USER",
                plan: "FREE"
            },
            {
                name: "Alice Smith",
                username: "alice",
                description: "Travel enthusiast",
                location: "London, UK",
                notificationsAllowed: true,
                createdAt: date,
                role: "USER",
                plan: "PREMIUM"
            },
            {
                name: "Bob Jones",
                username: "bob_builder",
                description: "Loves architecture",
                location: "New York, USA",
                notificationsAllowed: true,
                createdAt: date,
                role: "USER",
                plan: "PREMIUM"
            },
            {
                name: "Charlie Brown",
                username: "charlie",
                description: "Sports enthusiast",
                location: "San Francisco, USA",
                notificationsAllowed: true,
                createdAt: date,
                role: "USER",
                plan: "PRO"
            }
        ];

        let filteredUsers = users;
        if (url) {
            const searchParams = new URLSearchParams(url.split("?")[1]);
            const search = searchParams.get("search")?.toLowerCase();
            if (search) {
                filteredUsers = users.filter(u => 
                    u.username.toLowerCase().includes(search) || 
                    u.name.toLowerCase().includes(search)
                );
            }
        }

        return {
            page: filteredUsers,
            currentPage: 0,
            totalPages: 1,
            totalItems: filteredUsers.length,
            itemsPerPage: 10,
            isLastPage: true
        };
    },

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
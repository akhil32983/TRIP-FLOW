import type { UserStatsResponse } from "@/types/stats";

export const mockStats = {
  "/api/v1/stats/user": async (
    method: string,
    _body?: unknown,
    _url?: string
  ): Promise<UserStatsResponse> => {
    switch (method) {
      case "GET":
        return {
          stats: [
            { key: "activities", value: 42 },
            { key: "places_visited", value: 15 },
            { key: "total_days", value: 120 },
          ],
        };

      default:
        throw new Error(`Method ${method} not allowed on /api/v1/stats/user`);
    }
  },
};

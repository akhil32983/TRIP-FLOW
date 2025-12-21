import type { AIStatus, AIUsage } from "@/types/ai";

export const mockAI = {
  "/api/v1/ai": async (
    method: string,
    _body?: unknown,
    _url?: string
  ): Promise<AIUsage> => {
    switch (method) {
      case "POST":
        return {
            usedQuota: 1,
            remainingQuota: 1,
            limit: 2,
            resetDate: new Date().toISOString(),
        };

      default:
        throw new Error(`Method ${method} not allowed on /api/v1/ai`);
    }
  },
  "/api/v1/ai/status": async (
    method: string,
    _body?: unknown,
    _url?: string
  ): Promise<AIStatus> => {
    switch (method) {
      case "GET":
        return {
            isProcessing: false,
            canUseAI: true,
            dailyLimit: 2,
            remainingRequests: 1,
        };

      default:
        throw new Error(`Method ${method} not allowed on /api/v1/ai/status`);
    }
  },
};

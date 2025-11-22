import type { AIGenerationRequest, AIResponse } from "@/types/ai";

import { http } from "./httpService";

const BASE_PATH = "/api/v1/ai";

/**
 * Generate an itinerary using AI
 * 
 * @param request The itinerary request
 * @returns The AI response with rate limit information
 */
export async function generateItinerary(request: AIGenerationRequest): Promise<AIResponse> {
    return http(`${BASE_PATH}`, "POST", request);
}
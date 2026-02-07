import type { AIGenerationRequest, AIResponse, AIStatus } from "@/types/ai";

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

/**
 * Get the AI status and rate limit information for the current user
 * 
 * @returns The AI status with rate limit information
 */
export async function getAIStatus(): Promise<AIStatus> {
    return http(`${BASE_PATH}/status`, "GET");
}
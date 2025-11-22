export interface AIGenerationRequest {
    aiPrompt: string;
    destination: string;
    style: string;
    budget: number;
    lodging: string;
    duration: string;
    interests: string[];
}

export interface AIUsage {
    usedQuota: number;
    remainingQuota: number;
    limit: number;
    resetDate: string;
}

export interface AIResponse {
    message: string;
    aiUsage: AIUsage;
}
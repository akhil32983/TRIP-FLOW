export type UserRole = "USER" | "ADMIN";
export type UserPlan = "FREE" | "PRO" | "PREMIUM";

export type PublicUser = {
  name: string;
  username: string;
  description: string;
  location: string;
  notificationsAllowed: boolean;
  createdAt: string;
  role: UserRole;
  plan: UserPlan;
};

export type UpdateProfileRequest = {
    name?: string;
    description?: string;
    location?: string;
    notificationsAllowed?: boolean;
}
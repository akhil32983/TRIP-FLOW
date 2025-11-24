export type UserRole = "USER";
export type UserPlan = "FREE" | "PRO" | "PREMIUM";

export type PublicUser = {
  id: string;
  name: string;
  username: string;
  description: string;
  location: string;
  createdAt: string;
  role: UserRole;
  plan: UserPlan;
};

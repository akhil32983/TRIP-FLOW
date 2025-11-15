export type UserRole = "USER";

export type PublicUser = {
  id: string;
  name: string;
  username: string;
  description: string;
  location: string;
  createdAt: string;
  role: UserRole;
};

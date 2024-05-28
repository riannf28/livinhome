import { UserRole } from "@prisma/client";

export type AuthGenerateTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthSignInUsecaseResponse = {
  user: {
    id: string;
    name: string;
    role: UserRole;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

export type AuthSignUpUsecaseResponse = {
  id: string;
  createdAt: Date;
};

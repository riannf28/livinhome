export type AuthGenerateTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthSignInUsecaseResponse = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

export type AuthSignUpUsecaseResponse = {
  id: string;
  createdAt: Date;
};

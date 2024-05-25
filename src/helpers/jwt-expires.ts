export function generateTokenExpires(expiresIn: string): number {
  const expiresInInt = parseInt(expiresIn, 10);
  const now = new Date();
  const expires = new Date(now.getTime() + expiresInInt * 1000);
  return expires.getTime();
}

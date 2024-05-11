export function generateTokenExpires(expiresIn: string): number {
  const now = new Date();
  const expires = new Date(now.getTime() + parseInt(expiresIn, 10) * 1000);
  return expires.getTime();
}

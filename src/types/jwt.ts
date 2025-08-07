export interface JwtPayloadCustom {
  id: string;
  role: 'ADMIN' | 'USER';
  iat: number;
  exp: number;
}

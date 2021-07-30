export interface JWTContstants {
  secret: string;
}

export const jwtConstants: JWTContstants = {
  secret: 'secretKey',
};

export const EXPIRES_IN = 3600;

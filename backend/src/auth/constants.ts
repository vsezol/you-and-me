export interface JWTConstants {
  secret: string;
}

export const jwtConstants: JWTConstants = {
  secret: 'secretKey',
};

export const EXPIRES_IN = 3600;

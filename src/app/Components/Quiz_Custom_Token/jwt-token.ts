import { InjectionToken } from "@angular/core";

export interface JwtToken {
    jwtKey: string;
}

export const JWT_STORAGE_KEY = new InjectionToken<string>('JWT_STORAGE_KEY');
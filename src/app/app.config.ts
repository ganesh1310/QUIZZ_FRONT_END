import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { JWT_STORAGE_KEY, JwtToken } from './Components/Quiz_Custom_Token/jwt-token';

const jwtToken : JwtToken = {
  jwtKey : 'jwtToken'
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    {provide : JWT_STORAGE_KEY , useValue : jwtToken}
  ]
};

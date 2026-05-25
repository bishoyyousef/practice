import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enable modern component route parameter input binding
    provideRouter(routes, withComponentInputBinding()),
    
    // Mount interceptors in the required sequence: Logging -> Error
    provideHttpClient(
      withInterceptors([
        loggingInterceptor,
        errorInterceptor
      ])
    )
  ]
};

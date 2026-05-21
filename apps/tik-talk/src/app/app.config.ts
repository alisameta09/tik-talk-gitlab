import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideState, provideStore } from '@ngrx/store'
import { authTokenInterceptor } from '@tt/auth'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { CommunityEffects, communityFeature } from '@tt/data-access/communities'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideStore(),
    provideState(communityFeature),
    provideEffects(CommunityEffects),
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25,
    }),
  ],
}

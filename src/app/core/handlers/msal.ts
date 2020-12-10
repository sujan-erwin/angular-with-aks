import { MsalAngularConfiguration } from '@azure/msal-angular';
import { Configuration } from 'msal';
import { environment } from 'src/environments/environment';
export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const consents = ['User.Read', 'openid', 'profile', 'email'];
export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', consents]
];
export function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: environment.AZURE_APP_REGISTRATION.clientId,
      authority: environment.AZURE_APP_REGISTRATION.authority,
      validateAuthority: true,
      redirectUri: environment.AZURE_APP_REGISTRATION.redirectUri,
      postLogoutRedirectUri: environment.AZURE_APP_REGISTRATION.redirectUri,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  };
}

export function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: consents,
    unprotectedResources: ['https://www.microsoft.com/en-us/'],
    protectedResourceMap,
    extraQueryParameters: { }
  };
}

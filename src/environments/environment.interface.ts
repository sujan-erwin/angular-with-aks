export interface IEnvConfig {
  production: boolean;
  API: string;
  AZURE_APP_REGISTRATION: IAzureAppRegistration;
  RECAPTCHA_KEY: string;
  REDIRECT_URL: string;
}

export interface IAzureAppRegistration {
  clientId: string;
  authority: string;
  redirectUri: string;
}

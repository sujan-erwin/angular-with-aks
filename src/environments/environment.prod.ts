import { IEnvConfig } from './environment.interface';

export const environment: IEnvConfig = {
  production: true,
  API: 'https://erwinteamsbackend.azurefd.net/v1/api/',
  AZURE_APP_REGISTRATION: {
    clientId: '5fefd252-99cb-4bb6-b7db-770b8ed20bcc',
    // clientId: '508f4d07-c8c6-4285-bdd8-9ea3ee7a6bc3',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:4300/sign-in/',
  },
  RECAPTCHA_KEY: '6Ldj0ukZAAAAABbybAOWBH96PqoytLkGQjdv1Mh1',
  REDIRECT_URL: 'http://localhost:4200/'
};

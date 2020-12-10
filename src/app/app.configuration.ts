import * as _ from 'lodash';

type CaseConversion = 'upper' | 'toUpper' | 'toUpperCase' |
    'lower' | 'toLower' | 'toLowerCase' |
    'capitalize' | 'sentence' |
    'start' | 'startCase' | 'capitalizeEach' |
    'capitalizeFirst';

export abstract class AppConfiguration {
    public static readonly global = {
        locale: navigator && (navigator.language || 'en-US'),
    };
}

export class Languages {

    public static readonly locales = {
        'en-US': {
            global: {
                webModeler: 'web modeler',
                webModelerDescription: `web Modeler helps individuals and teams understand and communicate complex ideas, processess and
                systems. Collaborate on flowcharts, network diagrams, org charts and other visuals directly in Microsft Teams.`,
                signIn: ' sign in',
                signUp: 'sign up',
                description: 'you will be redirected to erwin website',
                step: 'step',
                chooseAPlan: 'choose a plan',
                continueWithFree: 'continue with free',
                continueUsing: 'continue using',
                useDifferentO365Account: 'Use different O365 account',
                loginWithMicrosoft: 'Login with Microsoft Account',
                loginWithZeta: 'login with zeta',
                contactSales: 'contact sales',
                of: 'of',
                createYourAccount: 'create your account',
                fullName: 'full name',
                workEmail: 'work email',
                password: 'password',
                use6OrMoreCharacters: 'use 6 or more characters',
                createAccount: 'create account',
                orContinueWith: 'or continue with',
                google: 'google',
                byRegisteringYouAgreetoOur: 'by registering, you agree to our',
                termsOfService: 'terms of service',
                and: 'and',
                privacyPolicy: 'privacy policy',
                alreadyhaveAccount: 'Already have an account ?',
                logIn: 'Log in',
                firstName: 'first name',
                lastName: 'last name',
                email: 'email',
            }
        }
    };

    public static readonly downloadType = {
        blob: 'blob-content',
        link: 'url'
    };

    static get(key: string, toCase?: CaseConversion, locale?: string) {
        let value: string;
        locale = _.has(this.locales, `[${locale}]`) ? locale : AppConfiguration.global.locale;
        value = _.get(this.locales, `['${locale}'].${key}`, _.get(this.locales, `['en-US'].${key}`, ''));
        switch (toCase) {
            case 'upper':
            case 'toUpper':
            case 'toUpperCase':
                value = _.toUpper(value);
                break;
            case 'lower':
            case 'toLower':
            case 'toLowerCase':
                value = _.toLower(value);
                break;
            case 'capitalize':
            case 'sentence':
                value = _.capitalize(value);
                break;
            case 'start':
            case 'startCase':
            case 'capitalizeEach':
                value = value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                break;
            case 'capitalizeFirst':
                value = value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));
                break;
        }
        return value;
    }
}

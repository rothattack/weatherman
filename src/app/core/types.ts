import { SocialUser } from '@abacritt/angularx-social-login';

export interface AppState {
  user?: SocialUser;
  isLoggedIn?: boolean;
  setting?: {
    weatherApiUrl: string;
    weatherApiKey: string;
  };
}

export enum AccountTypes {
  personal = "Personal",
  business = "Business",
}

export interface Users {
  _id: string;
  name: string;
  email: string;
  userName: string;
  accountType: AccountTypes;
  isEmailVarify: boolean;
  isActive: boolean;
  isBiometrics: boolean;
  isNotification: boolean;
  avatar: string | null;
}

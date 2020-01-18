export interface ISignupWithEmailRequiredParams {
  emailId: string;
  password: string;
}

export interface IEmailAuthRequiredParams {
  emailId: string;
  password: string;
}

interface IPermissionInformation {
  isAdmin: true;
  lastLogin: string;
}

export type TSignIn = {
  email: string;
  password: string;
};

export type TSignUp = TSignIn & {
  fullName: string;
  organization: string;
  referral: string;
  isPartner: boolean;
  isStaff: boolean;
  address: string;
};

export type TResetPassword = {
  token: string;
  password: string;
};

export type TUserDocCreate = {
  name: string;
  link: string;
  type: string;
  size: string;
  isReceived: boolean;
  requestId: string;
  userId: string;
};

export type TUserDocGet = TUserDocCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isApproved: boolean;
  isDeprecated: boolean;
  requestSubFormId: string;
};

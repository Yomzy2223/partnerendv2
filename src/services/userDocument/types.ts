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
};

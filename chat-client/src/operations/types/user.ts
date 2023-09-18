export type TUserAPI = {
  email: string;
  name: string;
  profilePicture: string;
  about: string;
  id: string;
  status: string;
};

export interface IUserLoginResponse {
  user: TUserAPI;
  accessToken: string;
}

export interface ICheckUserResponse {
  data: TUserAPI;
  status: boolean;
}

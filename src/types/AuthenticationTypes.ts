export enum AuthTypesEnums {
  local = 'local',
  google = 'google',
}

export type AddUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isActive?: boolean;
};
export type AuthTypes = 'local' | 'google'

export type AuthData = {
  type: AuthTypes,
  auth_id: string,
  accessToken: string
}

export interface IUser {
  id?: any | null,
  username: string,
  email: string,
  password: string,
  roles?: Array<string>
}

export interface objectIUser {
  accessToken: string,
  email: string,
  id: number,
  roles: Array<string>,
  tokenType: string,
  username: string,
}
export interface Auth {
  user_hashed_password: string;
  user_email: string;
}

export interface ResponAuth {
  token?: string;
  message?: string;
}

export interface ResponTokenVerify {
  creation_date: null;
  exp: number;
  user_email: string;
  user_hashed_password: string;
  user_id: number;
  user_is_active: boolean;
  user_name: string;
  user_name_login: string;
}

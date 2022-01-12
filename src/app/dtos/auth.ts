export interface Auth {
  user_hashed_password: string;
  user_email: string;
}

export interface ResponAuth {
  token?: string;
  message?: string;
}

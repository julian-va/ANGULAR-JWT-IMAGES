export interface UserBase {
  user_name: string;
  user_name_login: string;
  user_email: string;
  user_hashed_password: string;
  user_is_active: boolean;
  creation_date?: Date;
  user_id: number;
}

export interface UserCreate
  extends Omit<UserBase, 'user_id' | 'creation_date'> {}

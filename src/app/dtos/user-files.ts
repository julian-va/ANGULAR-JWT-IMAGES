export interface UserFiles {
  user_file_name: string;
  user_file_dir: string;
  user_file_type: string;
  user_is_active: boolean;
  user_id: number;
  creation_date: Date;
  user_file_id: number;
}

export interface FilesUrl extends UserFiles {
  url?: string;
}

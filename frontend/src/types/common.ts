export interface Post {
  id: number;
  body: string;
  likes: number;
  org?: Organization;
  user: User;
  updated_at: Date | string;
  created_at: Date | string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  about: string;
  birthday: Date | string;
  avatar: string;
  country: string;
  followerCount: number;
  created_at: Date | string;
}

export interface Organization {
  id: number;
  institute_id: number;
  owner_id: number;
  name: string;
  avatar_path: string;
  country_id: number;
  created_at: Date | string;
}

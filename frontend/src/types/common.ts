interface SignUp {
  email: string;
  username: string;
  name: string;
  surname: string;
  password: string;
}

interface User {
  email: string;
  username: string;
  name: string;
  surname: string;
  id: string;
  about: string;
  birthday: string;
  avatar_path: string | null;
  country: {
    id: string;
    name: string;
  };
  created_at: string;
  owned_organizations: {
    name: string;
    about: string;
    id: string;
    created_at: string;
  }[];
  educations: {
    id: string;
    name: string;
    about: string;
    entrance_year: string;
    graduation_year: string;
    academic_position: string;
    institute: {
      id: string;
      name: string;
    };
  }[];
  details: {
    count_posts: string;
    count_followers: string;
    count_following_users: string;
    count_following_organizations: string;
  };
}

interface UserEdit {
  name: string;
  surname: string;
  about: string;
  birthday: string;
}

interface Post {
  body: string;
  id: string;
  organization: string;
  created_at: string;
  updated_at: string | null;
  comments: {
    body: string;
    id: 2;
    user: {
      email: string;
      username: string;
      name: string;
      surname: string;
      id: string;
      avatar_path: string;
    };
    post_id: string;
    created_at: string;
  }[];
  user: {
    id: string;
    username: string;
    name: string;
    surname: string;
    avatar_path: string | null;
  };
}

interface Org {
  name: string;
  about: string;
  id: string;
  created_at: string;
  avatar_path: string;
  owner: {
    id: string;
    username: string;
    name: string;
    surname: string;
    avatar_path: string;
  };
  institute: {
    id: string;
    name: string;
  };
  country: {
    id: string;
    name: string;
  };
  details: {
    count_followers: string;
  };
}

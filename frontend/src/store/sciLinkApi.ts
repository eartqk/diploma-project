import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sciLinkApi = createApi({
  reducerPath: "sciLinkApi",
  tagTypes: ["User", "Me", "Post", "Users", "Org", "Orgs"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<void, SignUp>({
      query: (body) => ({
        url: "auth/sign-up",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<void, { username: string; password: string }>({
      query: (body) => ({
        url: "auth/sign-in",
        method: "POST",
        body: new URLSearchParams(body).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),

    getMe: builder.query<User, void>({
      query: () => "auth/user",
      providesTags: ["Me"],
    }),

    getUser: builder.query<User, string | undefined>({
      query: (user_id) => `users/${user_id}`,
      providesTags: ["User"],
    }),

    getUsers: builder.query<Partial<User>[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    getUserPosts: builder.query<Post[], string | undefined>({
      query: (user_id) => `users/${user_id}/posts`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Post" as const, id })), "Post"]
          : ["Post"],
    }),

    editUser: builder.mutation<void, UserEdit>({
      query: (body) => ({
        url: "users",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Me"],
    }),

    uploadAvatar: builder.mutation<void, FormData>({
      query: (body) => ({
        url: "users/avatar",
        method: "PUT",
        body,
        formData: true,
      }),
      invalidatesTags: ["Me"],
    }),

    deactivateUser: builder.mutation<void, void>({
      query: (body) => ({
        url: "users",
        method: "DELETE",
      }),
      invalidatesTags: ["Me"],
    }),

    editPost: builder.mutation<
      void,
      { post_id: string; editText: { body: string } }
    >({
      query: ({ post_id, editText }) => ({
        url: `posts/${post_id}`,
        method: "PUT",
        body: editText,
      }),
      invalidatesTags: ["Post"],
    }),

    createPost: builder.mutation<void, { body: string }>({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation<void, string>({
      query: (post_id) => ({
        url: `posts/${post_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    getUserFollowers: builder.query<Partial<User>[], string | undefined>({
      query: (user_id) => `users/${user_id}/followers`,
      providesTags: ["Users"],
    }),

    getUserFollowedUsers: builder.query<Partial<User>[], string | undefined>({
      query: (user_id) => `users/${user_id}`,
      providesTags: ["Users"],
    }),

    getUserFollowedOrgs: builder.query<Partial<Org>[], string | undefined>({
      query: (user_id) => `users/${user_id}`,
      providesTags: ["Orgs"],
    }),

    getOrgs: builder.query<Org[], { skip?: number; limit?: number }>({
      query: ({ skip, limit }) => ({
        url: "organizations",
        method: "GET",
        params: { skip, limit },
      }),
      providesTags: ["Orgs"],
    }),

    getOrg: builder.query<Org, string | undefined>({
      query: (org_id) => `organizations/${org_id}`,
      providesTags: ["Org"],
    }),

    getOrgPosts: builder.query<
      Post[],
      { org_id: string | undefined; skip?: number; limit?: number }
    >({
      query: ({ org_id, skip, limit }) => ({
        url: `organizations/${org_id}/posts`,
        method: "GET",
        params: { skip, limit },
      }),
      providesTags: (result, error, { org_id }) => [
        { type: "Post", id: org_id },
        "Post",
      ],
    }),

    getOrgFollowers: builder.query<Partial<User>[], string | undefined>({
      query: (org_id) => `organizations/${org_id}/followers`,
      providesTags: ["Users"],
    }),

    createOrg: builder.mutation<Org, Partial<Org>>({
      query: (body) => ({
        url: "organizations/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orgs"],
    }),

    editOrg: builder.mutation<
      Org,
      { org_id: string | undefined; body: Partial<Org> }
    >({
      query: ({ org_id, body }) => ({
        url: `organizations/${org_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Org"],
    }),

    createOrgPost: builder.mutation<
      void,
      { organization_id: string | undefined; post: { body: string } }
    >({
      query: ({ organization_id, post }) => ({
        url: `posts/organization/${organization_id}`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),

    uploadOrgAvatar: builder.mutation<
      void,
      { org_id: string | undefined; body: FormData }
    >({
      query: ({ org_id, body }) => ({
        url: `organizations/${org_id}/avatar`,
        method: "PUT",
        body,
        formData: true,
      }),
      invalidatesTags: ["Org"],
    }),

    addComment: builder.mutation<
      void,
      { post_id: string | undefined; comment: { body: string } }
    >({
      query: ({ post_id, comment }) => ({
        url: `comments/post/${post_id}`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export default sciLinkApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sciLinkApi = createApi({
  reducerPath: "sciLinkApi",
  tagTypes: ["User", "Me", "Posts"],
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

    getUserPosts: builder.query<Post[], string | undefined>({
      query: (user_id) => `users/${user_id}/posts`,
      providesTags: ["Posts"],
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
  }),
});

export default sciLinkApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sciLinkApi = createApi({
  reducerPath: "sciLinkApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<
      void,
      {
        email: string;
        username: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "public/sign-up",
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
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }),
    }),

    // logout: builder.mutation<void, void>({
    //   query: () => ({
    //     url: "logout",
    //     method: "GET",
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    getMe: builder.query<void, void>({
      query: () => "auth/me",
      providesTags: ["User"],
    }),

  }),
});

export default sciLinkApi;

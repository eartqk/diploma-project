import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sciLinkApi = createApi({
  reducerPath: "sciLinkApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.REACT_APP_API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<
      void,
      {
        token: string;
        name: string;
        surname: string;
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "public/signup",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<void, { email: string; password: string }>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    getMe: builder.query<void, void>({
      query: () => "user/me",
      providesTags: ["User"],
    }),

  }),
});

export default sciLinkApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7013/api/"
    }),
    tagTypes: ["Posts"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({
                url: "post"
            }),
            providesTags: ["Posts"],
        }),
        getPostById: builder.query({
            query: (id) => ({
                url: `post/${id}`
            }),
            providesTags: ["Posts"]
        }),
        createPost: builder.mutation({
        query: (data) => ({
            url: "post",
            method: "POST",
            body: data,
        }),
        invalidatesTags: ["Posts"],
        }),
        updatePost: builder.mutation({
        query: ({ data, id }) => ({
            url: `post/${id}`,
            method: "PUT",
            body: data,
        }),
        invalidatesTags: ["Posts"],
        }),
        deletePost: builder.mutation({
        query: (id) => ({
            url: "post/" + id,
            method: "DELETE",
        }),
        invalidatesTags: ["Posts"],
        }),
    }),
});



export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postApi
export default postApi 
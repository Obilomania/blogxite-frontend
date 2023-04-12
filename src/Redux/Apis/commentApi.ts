import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7013/api/"
    }),
    tagTypes: ["comment"],
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: (data) => ({
                url: `comment`,
                method: "POST",
                headers: {
                    "Content-type" :"application/json",
                },
                body: data,
            }),
            invalidatesTags: ["comment"],
        })
    })
})


export const { useCreateCommentMutation } = commentApi
export default commentApi
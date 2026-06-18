"use client";
import { fetchComments } from "@/lib/actions/commentActions";
import { DEFAULT_POSTS_PER_PAGE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { skip } from "node:test";
import { PropsWithChildren, useState } from "react";
import CommentSkeleton from "./commentSkeleton";

type Props = {
  postId: number;
};
const Comments = ({ postId }: Props) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId],
    queryFn: async () => {
      return await fetchComments({
        page: page,
        perPage: page * DEFAULT_POSTS_PER_PAGE,
        postId,
      });
    },
  });

  console.log("data from frontend", data);
if (isLoading) {
    return <CommentSkeleton />;
  }
  return <div className="relative space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-lg font-semibold">
          Comments ({data?.getPostCommentCount ?? 0})
        </h2>
      </div>

      {/* Comment list */}
      <div className="space-y-4">
        {data?.getPostComments?.length > 0 ? (
          data.getPostComments.map((comment: any) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={comment.author.avatar || "/default-avatar.png"}
                  alt={comment.author.name}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-medium text-gray-900">
                    {comment.author.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
            No comments yet. Be the first to comment.
          </div>
        )}
      </div>
    </div>
};

export default Comments;

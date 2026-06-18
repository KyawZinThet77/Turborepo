"use client";
import { fetchComments } from "@/lib/actions/commentActions";
import { DEFAULT_POSTS_PER_PAGE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { skip } from "node:test";
import { PropsWithChildren, useState } from "react";

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

  return <div className="relative"> {data ? data.getPostCommentCount : "No comments"} <div>
    {data?.getPostComments?.map((comment: any) => (
      <div>{comment.content}</div>
    ))}
    </div></div>;
};

export default Comments;

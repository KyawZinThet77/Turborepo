"use client"
import { fetchComments } from "@/lib/actions/commentActions";
import { DEFAULT_POSTS_PER_PAGE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { skip } from "node:test";
import { PropsWithChildren, useState } from "react";

type Props = {
  postId : number
};
const Comments = ({postId}: Props) => {
  const [page,setPage] = useState(1)
  const {} = useQuery({
    queryKey : ["GET_POST_COMMENTS",postId],
    queryFn: async () => await fetchComments({
      postId,
      page: page * DEFAULT_POSTS_PER_PAGE,
      perPage : DEFAULT_POSTS_PER_PAGE
    }) 
  })
  return (
    <div className="relative">
      
    </div>
  );
};

export default Comments;
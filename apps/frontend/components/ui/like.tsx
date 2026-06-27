"use client";

import { GetPostLikeData, likePost, unlikePost } from "@/lib/actions/likeActions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

interface LikeProps {
  userId?: number;
  postId: number;
}

export default function Like({ userId, postId }: LikeProps) {
  const { data, refetch:refetchPostLikes } = useQuery({
    queryKey: ["like", postId],
    queryFn: async () => await GetPostLikeData(postId),
  });

  const likeMutation = useMutation({
    mutationFn: async () => await likePost(postId),
    onSuccess:  () => {
      refetchPostLikes()
    }
  });
  const unlikeMutation = useMutation({
    mutationFn: async () => await unlikePost(postId),
    onSuccess:  () => {
      refetchPostLikes()
    }
  });

  

  return (
    <div className="">
      {data?.isLiked ? (
        <button onClick={()=> unlikeMutation.mutate()}  className="flex items-center space-x-3" style={{ color: "red", cursor: "pointer" }}>
          <HeartIcon fill="currentColor" /> <span className="ml-2 font-semibold text-sm text-gray-600">{data?.likecount}</span>
        </button>
      ) : (
        <button onClick={()=> likeMutation.mutate()}  className="flex items-center space-x-3" style={{ color: "black", cursor: "pointer" }}> 
          <HeartIcon /> <span className="ml-2 font-semibold text-sm text-gray-600">{data?.likecount}</span>
        </button>
      )}
    </div>
  );
}

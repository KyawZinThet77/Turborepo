"use client";

import { GetPostLikeData } from "@/lib/actions/likeActions";
import { useQuery } from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

interface LikeProps {
  userId?: number;
  postId: number;
}

export default function Like({ userId, postId }: LikeProps) {
  const { data } = useQuery({
    queryKey: ["like", postId],
    queryFn: async () => await GetPostLikeData(postId),
  });

  

  return (
    <div className="">
      {data?.isLiked ? (
        <button  className="flex items-center space-x-3" style={{ color: "red", cursor: "pointer" }}>
          <HeartIcon fill="currentColor" /> <span className="ml-2 font-semibold text-sm text-gray-600">{data?.likecount}</span>
        </button>
      ) : (
        <button  className="flex items-center space-x-3" style={{ color: "black", cursor: "pointer" }}> 
          <HeartIcon /> <span className="ml-2 font-semibold text-sm text-gray-600">{data?.likecount}</span>
        </button>
      )}
    </div>
  );
}

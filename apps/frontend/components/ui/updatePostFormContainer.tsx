"use client";
import { PostCreateAction, PostUpdateAction } from "@/lib/actions/postActions";
import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import UpsertPostForm from "./upsertPostForm";

type Props = {
  post: Post;
};
const UpdatePostFormContainer = ({ post }: Props) => {
  const [state, action] = useActionState(PostUpdateAction, {
    data: {
      title: post.title,
      content: post.content,
      tags: post?.tags?.map((tag) => tag.name).join(","),
      published: post.published ? "on" : undefined,
      id: post.id,
      previousThumbnail: post.thumbnail?? undefined,
    }
  });
  return (
    <div>
      <UpsertPostForm state={state} formAction={action} />
    </div>
  );
};

export default UpdatePostFormContainer;

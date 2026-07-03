"use client";
import { PostCreateAction } from "@/lib/actions/postActions";
import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import UpsertPostForm from "./upsertPostForm";

type Props = Partial<Post>;
const PostFormContainer = ({}: Props) => {
  const [state, action] = useActionState(PostCreateAction, undefined);
  return (
    <div>
      <UpsertPostForm state={state} formAction={action} />
    </div>
  );
};

export default PostFormContainer;

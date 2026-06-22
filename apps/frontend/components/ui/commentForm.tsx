"use client";

import { createComments } from "@/lib/actions/commentActions";
import { useActionState } from "react";

type Props = {
  postId: number;
};

const CommentForm = ({ postId }: Props) => {
  const [state, action] = useActionState(createComments, undefined);
  return (
    <form action={action} className="p-8">
        <input name="postId" type="hidden" value={postId ?? ""} readOnly />
      <textarea
        name="content"
        placeholder="Write a comment..."
        className="w-full border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-black"
        rows={4}
      />

      {!!state?.errors?.content && (
        <div className="text-red-500 mt-3 animate-shake">
          {state.errors.content.join(", ")}
        </div>
      )}

      <button
        type="submit"
        className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;

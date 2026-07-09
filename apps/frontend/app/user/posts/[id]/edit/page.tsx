"use client";

import PostFormContainer from "@/components/ui/postFormContainer";
import UpdatePostFormContainer from "@/components/ui/updatePostFormContainer";
import { fetchPostById } from "@/lib/actions/postActions";

interface UpdatePostFormProps {
  params: {
    id: string;
  }
  className?: string;
}



export default async function UpdatePostForm({ className = "", params }: UpdatePostFormProps) {

    const paramsId = params.id
    const post = await fetchPostById(parseInt(paramsId));

  return (
    <div className={`w-full max-w-3xl mx-auto px-4 py-8 ${className}`}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        
        {/* Title Header */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
          Update Post
        </h2>

       <UpdatePostFormContainer post={post}/>

      </div>
    </div>
  );
}
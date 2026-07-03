"use client";
import { PropsWithChildren, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PostCreateFormState } from "@/lib/types/formState";

type Props = {
  state : PostCreateFormState | undefined;
  formAction : (payload: FormData) => void;
};
const UpsertPostForm = ({ state, formAction}: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <section className="relative">
      <form action={formAction} className="space-y-6">
        {/* Post Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
            Post Title
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g., My First Blog Post"
            className="w-full"
          />
           {!!state?.errors?.title && <div className="text-red-500 mt-3">{state.errors.title}</div>}
        </div>

        {/* Published Checkbox */}
        <div className="space-y-2 flex items-start gap-2">
          <input type="checkbox" id="published" name="published" />
          <Label
            htmlFor="published"
            className="text-gray-700 dark:text-gray-300"
          >
            Published
          </Label>
        </div>

        {/* Tags Input */}
        <div className="space-y-2">
          <Label htmlFor="tags" className="text-gray-700 dark:text-gray-300">
            Tags (separate with commas)
          </Label>
          <Input
            type="text"
            name="tags"
            id="tags"
            placeholder="e.g., technology, programming, web development"
            className="w-full"
          />
          {!!state?.errors?.tags && <div className="text-red-500 mt-3">{state.errors.tags}</div>}
        </div>

        {/* Thumbnail Image Input */}
        <div className="space-y-2">
          <Label
            htmlFor="thumbnail"
            className="text-gray-700 dark:text-gray-300"
          >
            Cover Image Thumbnail
          </Label>
          <Input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }
            }}
            className="w-full cursor-pointer file:text-blue-600 dark:file:text-blue-400 file:mr-2 file:rounded-md file:border-0 "
          />
          {!!imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Thumbnail Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* Article Content Textarea */}
        <div className="space-y-2">
          <Label htmlFor="content" className="text-gray-700 dark:text-gray-300">
            Content Body
          </Label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            placeholder="Write your story here..."
            className="flex w-full max-h-60 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y text-gray-900 dark:text-white border-gray-200 dark:border-gray-800 focus:border-blue-500 transition-colors"
          />
          {!!state?.errors?.content && <div className="text-red-500 mt-3">{state.errors.content}</div>}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            type="submit"
            
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-colors rounded-lg shadow-sm w-full sm:w-auto"
          >
            {true ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpsertPostForm;

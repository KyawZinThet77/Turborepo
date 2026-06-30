import { PropsWithChildren } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {

};
const UpsertPostForm = (props: Props) => {
  return (
    <section className="relative">
        <form className="space-y-6">
          {/* Post Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
              Post Title
            </Label>
            <Input
              type="text"
              id="title"
              required
              placeholder="e.g., My First Blog Post"
              className="w-full"
            />
          </div>

          {/* Thumbnail Image Input */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail" className="text-gray-700 dark:text-gray-300">
              Cover Image Thumbnail
            </Label>
            <Input
              type="file"
              id="thumbnail"
              accept="image/*"
              className="w-full cursor-pointer file:text-blue-600 dark:file:text-blue-400"
            />
          </div>

          {/* Article Content Textarea */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-700 dark:text-gray-300">
              Content Body
            </Label>
            <textarea
              id="content"
              required
              rows={8}
              placeholder="Write your story here..."
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y text-gray-900 dark:text-white border-gray-200 dark:border-gray-800 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
            <button
              type="submit"
              disabled={true}
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

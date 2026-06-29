import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";

// Define the TypeScript interfaces based on your data structure
interface PostCount {
  comments: number;
  likes: number;
}

interface UserPostsGridProps {
  posts: Post[];
  totalPosts: number;
  className?: string;
  onDelete?: (postId: string | number) => void; // Optional callback handler for deletion logic
}

export default function UserPostsGrid({
  posts,
  totalPosts,
  className = "",
  onDelete,
}: UserPostsGridProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-6 ${className}`}>
      {/* Header & Total Post Counter */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Publications
        </h2>
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full">
          {totalPosts} {totalPosts === 1 ? "Post" : "Posts"}
        </span>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const formattedDate = new Date(post.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          );

          return (
            <article
              key={post.id}
              className="flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow duration-300"
            >
              {/* Thumbnail Image Container */}
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={post.thumbnail || "/no-image.png"} // Fallback image if thumbnail is null
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />

                {/* Status Badge */}
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm ${
                    post.published
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>

              {/* Content Card Body */}
              <div className="flex flex-col flex-1 p-5">
                <span className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">
                  {formattedDate}
                </span>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                  {post.content}
                </p>

                {/* Engagement Meta Metrics (_count) */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800 mb-4">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    <span>{post._count?.likes ?? 0} Likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>{post._count?.comments ?? 0} Comments</span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center gap-2 mt-auto">
                  {/* View Full Post Button */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-950/80 transition-colors rounded-lg text-center border border-transparent"
                  >
                    View Post
                  </Link>

                  {/* Edit Button */}
                  <Link
                    href={`/blog/${post.slug}/edit`}
                    title="Edit publication"
                    className="inline-flex items-center justify-center p-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete && onDelete(post.id)}
                    type="button"
                    title="Delete publication"
                    className="inline-flex items-center justify-center p-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/60 transition-colors rounded-lg border border-transparent hover:border-red-200 dark:hover:border-red-900"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
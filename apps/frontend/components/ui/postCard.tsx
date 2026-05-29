import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";

type Props = Partial<Post>;
const PostCard = ({
  id,
  title,
  slug,
  thumbnail,
  content,
  createdAt,
}: Props) => {
  return (
   <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
  <div className="relative w-full h-60">
    <img
    src={thumbnail || "/no-image.png"}
    alt={title || "No image"}
    className="w-full h-full object-cover"
  />
  </div>

  <div className="p-6 flex flex-col flex-grow">
    <h3 className="text-lg font-bold text-center text-gray-700 break-words">
      {title}
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      {createdAt
        ? new Date(createdAt).toLocaleDateString()
        : "No date"}
    </p>

    <p className="mt-4 text-gray-700 break-words flex-grow">
      {content?.slice(0, 100)}...
    </p>

    <Link
      href={`/blog/${slug}/${id}`}
      className="mt-4 text-right text-indigo-600 hover:underline"
    >
      Read more
    </Link>
  </div>
</div>
  );
};

export default PostCard;
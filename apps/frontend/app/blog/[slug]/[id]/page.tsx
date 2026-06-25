
import CommentForm from "@/components/ui/commentForm";
import Comments from "@/components/ui/comments";
import { createComments } from "@/lib/actions/commentActions";
import { fetchPostById } from "@/lib/actions/postActions";
import { getSession } from "@/lib/session";

type Props = {
  params: {
    id: string;
  };
};
const PostPage = async ({params }: Props) => {
    const session = await getSession()
    const postId = (await params).id;
    const post = await fetchPostById(+postId);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Thumbnail */}
        <div className="relative w-full h-[400px]">
            
          <img
            src={post?.thumbnail || "/no-image.png"}
            alt={post.title}
            
            className="object-cover"
          />
          
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>By {post?.author?.name}</span>
            <span>•</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p>{post.content}</p>
          </div>
        </div>

            {/* Comment Form */}
          {!!session?.user && (
            <CommentForm postId={post.id}/>
          )}

        {/* Comment Section */}
        <div className="border-t p-8">
          <h2 className="text-2xl font-semibold mb-6">
            <Comments postId={post.id} />
          </h2> </div>

      

          
      </div>
    </div>
  );
};

export default PostPage;
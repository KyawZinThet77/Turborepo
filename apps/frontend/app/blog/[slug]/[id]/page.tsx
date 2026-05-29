import { fetchPostById } from "@/lib/actions/postActions";
import { PropsWithChildren } from "react";


type Props = {
  params: {
    id: string;
  };
};
const PostPage = async ({params }: Props) => {

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

        {/* Comment Section */}
        {/* <div className="border-t p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Comments ({post.comments.length})
          </h2> */}

          {/* Comment Form */}
          {/* <form className="mb-8">
            <textarea
              placeholder="Write a comment..."
              className="w-full border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
            />

            <button
              type="submit"
              className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Post Comment
            </button>
          </form> */}

          {/* Comments List */}
          {/* <div className="space-y-6">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="border rounded-lg p-5 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {comment.user.name}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PostPage;
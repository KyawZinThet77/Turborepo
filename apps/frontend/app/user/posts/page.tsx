import PostsLayout from "./layout";
import { fetchPostsByUser } from "@/lib/actions/postActions";
import { DEFAULT_POSTS_PER_PAGE } from "@/lib/constants";
import EmptyState from "@/components/ui/emptyStage";
import UserPostsGrid from "@/components/ui/postList";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};
const PostsListing = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const page = typeof params.page === "string" ? Number(params.page) : 1;
  const { posts, totalPosts } = await fetchPostsByUser({
    page,
    perPage: DEFAULT_POSTS_PER_PAGE,
  });

  return (
    <div>
      <div>
        {!posts || !posts.length ? (
          <EmptyState text="No Post found" />
        ) : (
          <UserPostsGrid posts={posts} totalPosts={totalPosts} />
        )}
      </div>
    </div>
  );
};
export default PostsListing;

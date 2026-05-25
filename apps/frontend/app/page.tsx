import Hero from "@/components/ui/hero";
import { fetchPosts } from "@/lib/actions/postActions";
import Posts from "@/components/ui/posts";
import { DEFAULT_POSTS_PER_PAGE } from "@/lib/constants";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const page =
    typeof params.page === "string"
      ? Number(params.page)
      : undefined;

  const { posts, totalPosts } = await fetchPosts({
    page,
  });

  console.log("Total Posts:", totalPosts);

  return (
    <main>
      <Hero />
      
      <Posts posts={posts} totalPosts={totalPosts} currentPage={page ? +page : 1} totalPages={Math.ceil(totalPosts / +DEFAULT_POSTS_PER_PAGE)} />
   {totalPosts && <p className="text-center mt-4 text-gray-500">
        Total Posts: {totalPosts}
      </p>}
    </main>
  );
}

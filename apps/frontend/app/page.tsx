import Hero from "@/components/ui/hero";
import { fetchPosts } from "@/lib/actions/postActions";
import Posts from "@/components/ui/posts";
import { DEFAULT_POSTS_PER_PAGE } from "@/lib/constants";
import { getSession } from "@/lib/session";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const session = await getSession();

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const page =
    typeof params.page === "string"
      ? Number(params.page)
      : 1;

  const { posts, totalPosts } = await fetchPosts({
    page,
  });
  


  return (
    <main>
      <Hero />
      
      <Posts posts={posts} totalPosts={totalPosts} currentPage={page ? +page : 1} totalPages={Math.ceil(totalPosts / +DEFAULT_POSTS_PER_PAGE)} />
   
    </main>
  );
}

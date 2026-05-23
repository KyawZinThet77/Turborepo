import Hero from "@/components/ui/hero";
import { fetchPosts } from "@/lib/actions/postActions";
import Posts from "@/components/ui/posts";

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

  return (
    <main>
      <Hero />
      <Posts posts={posts} totalPosts={totalPosts} />
    </main>
  );
}

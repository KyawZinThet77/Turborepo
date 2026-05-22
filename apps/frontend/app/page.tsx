import Hero from "@/components/ui/hero";
import { fetchPosts } from "@/lib/actions/postActions";
import Image from "next/image";
import Posts from "@/components/ui/posts";

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <main>

      <Hero/>
      <Posts posts={posts}/>  
    </main>
  );
}

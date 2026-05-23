import { PropsWithChildren } from "react";
import PostCard from "./postCard";
import { Post } from "@/lib/types/modelTypes";

type Props = {
  posts: Post[];
};
const NavbarContainer = (props: Props) => {
  return (
    <section className="relative">
      <h2 className="text-5xl font-bold text-center text-gray-600  leading-tight">
        Latest Posts
      </h2>
      <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5"></div>
      <div className="relative container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {props.posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div></div>
    </section>
  );
};

export default NavbarContainer;

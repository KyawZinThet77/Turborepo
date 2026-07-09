import { PropsWithChildren } from "react";
import PostCard from "./postCard";
import { Post } from "@/lib/types/modelTypes";
import Pagination from "./desktop/pagination";

type Props = {
  posts: Post[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
};
const Posts = (props: Props) => {
  return (
    <section className="relative">
      <h2 className="text-5xl font-bold text-center text-gray-600  leading-tight">
        Latest Posts
      </h2>
      <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5"></div>
      <div className="relative container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {props?.posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <div>
        <Pagination  className="mt-4"
        currentPage={props.currentPage}
        totalPages={props.totalPages}/>   
      </div>
      </div>
    </section>
  );
};

export default Posts;

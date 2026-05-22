import { PropsWithChildren } from "react";
import PostCard from "./postCard";


type Props = {
    posts: any;
};
const NavbarContainer = (props: Props) => {
  return (
    <section className="relative">
         <h2 className="text-5xl font-bold text-center text-gray-600  leading-tight">
        Latest Posts
      </h2>
      <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5"></div>

      <div>
        <PostCard  
  post={{
    id: 1,
    title: "10 Puzzle Games That Improve Your Brain",
    slug: "10   -puzzle-games",
    thumbnail:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    content:
      "Puzzle games are not only fun but also improve memory, focus, and problem-solving skills...",
    createdAt: "2026-05-22",
  }}
/>
      </div>
    </section>
  );
};

export default NavbarContainer;
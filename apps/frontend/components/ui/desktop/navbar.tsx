import { getSession } from "@/lib/session";
import Link from "next/link";
import { SignInPanel } from "../signinPanel";

type Props = {};
const Navbar = async (props: Props) => {
  const session = await getSession();
  return (
    <>
      <h1 className="p-3 text-2xl font-bold tracking-tight text-white">
        Puzzle Blog
      </h1>

      <div className=" p-3 flex flex-col lg:flex-row items-start md:items-center gap-6 ml-auto text-sm font-medium">
        <Link
          href="/"
          className="text-white hover:text-black transition-colors duration-200"
        >
          Blogs
        </Link>

        <Link
          href="#about"
          className="text-white hover:text-black transition-colors duration-200"
        >
          About
        </Link>

        <Link
          href="#contact"
          className="text-white hover:text-black transition-colors duration-200"
        >
          Contact
        </Link>
      </div>

      {session && session?.user ? (
       <div className="flex items-center gap-3">
          <span className="text-white">Welcome, {session?.user.name}!</span>
          <Link
            href="/profile"
            className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
          >
            Profile
          </Link>
          <Link
            href="/create-post"
            className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
          >
            Create Post
          </Link>
        </div>
      ) : (
         <div className="flex items-center gap-3">
          <SignInPanel />
        </div>
        
      )}
    </>
  );
};
export default Navbar;

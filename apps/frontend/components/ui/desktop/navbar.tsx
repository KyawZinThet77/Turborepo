import { getSession } from "@/lib/session";
import Link from "next/link";
import { SignInPanel } from "../signinPanel";
import Profile from "../profile";

type Props = {};
const Navbar = async (props: Props) => {
  const session = await getSession();

  console.log('session.user',session?.user);
  
  
  return (
    <>
      <h1 className="p-3 text-2xl font-bold tracking-tight ff text-white">
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
          <Profile user={session.user} />
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

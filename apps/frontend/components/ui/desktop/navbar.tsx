import Link from "next/link";

type Props = {};
const Navbar = (props: Props) => {
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
    </>
  );
};
export default Navbar;

import Link from "next/link";

type Props = {};
const Navbar = (props: Props) => {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
  Puzzle Blog
</h1>

<div className="flex items-center gap-6 ml-auto text-sm font-medium">
  <Link
    href="/"
    className="text-gray-700 hover:text-black transition-colors duration-200"
  >
    Blogs
  </Link>

  <Link
    href="#about"
    className="text-gray-700 hover:text-black transition-colors duration-200"
  >
    About
  </Link>

  <Link
    href="#contact"
    className="text-gray-700 hover:text-black transition-colors duration-200"
  >
    Contact
  </Link>
</div>
    </>
  );
};
export default Navbar;

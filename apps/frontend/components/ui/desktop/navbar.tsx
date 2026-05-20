import Link from "next/link";

type Props = {};
const Navbar = (props: Props) => {
  return (
    <>
      <h1>Puzzle Blog</h1>
      <div className="flex gap-3 ml-auto">
        <Link href="/" className="">
          
          Blogs
        </Link>
        <Link href="#about" className="">
          
          About
        </Link>
        <Link href="#contact" className="">
          
          Contact
        </Link>
      </div>
    </>
  );
};
export default Navbar;

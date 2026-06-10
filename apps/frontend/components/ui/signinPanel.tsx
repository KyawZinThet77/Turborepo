import Link from "next/link";

export const SignInPanel = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <Link
          href="/auth/signin"
          className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          Sign In
        </Link>

        <Link
          href="/auth/signup"
          className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

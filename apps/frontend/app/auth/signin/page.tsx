// components/auth/sign-in-form.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/SubmitButton";
import { signUpAction } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignInForm = () => {
  const [state,action] = useActionState(signUpAction, undefined)
  return (
    <form action={action} className="space-y-5">
       {!!state?.errors && <div className="text-red-500 my-3"> "Something went wrong" </div>}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={state?.data?.email}
        />
        {!!state?.errors?.email && <div className="text-red-500 mt-3">{state.errors.email}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          defaultValue={state?.data?.password}
        />
        {!!state?.errors?.password && <div className="text-red-500 mt-3">{state.errors.password}</div>}
      </div>

      {/* <Button className="w-full">
        Sign In
      </Button> */}
      <SubmitButton className="w-full"> Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
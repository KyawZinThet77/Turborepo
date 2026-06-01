// components/auth/sign-up-form.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/SubmitButton";
import { signUpAction } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignUpForm = () => {
  const [state,action] = useActionState(signUpAction, undefined)
  return (
    <form action={action} className="space-y-5">
      {!!state?.errors && <div className="text-red-500 my-3">{JSON.stringify(state.errors)}</div>}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          defaultValue={state?.data?.name}
        />
        {!!state?.errors?.name && <div className="text-red-500 mt-3">{state.errors.name}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
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
          type="password"
          placeholder="Create password"
          defaultValue={state?.data?.password}
        />
        {!!state?.errors?.password && <div className="text-red-500 mt-3">{state.errors.password}</div>}
      </div>

      <SubmitButton className="w-full"> Sign Up</SubmitButton>
    </form>
  );
};

export default SignUpForm;
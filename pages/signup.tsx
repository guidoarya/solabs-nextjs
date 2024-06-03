import React, { useState } from "react";
import { useGetAuth } from "../utils/auth-hook";
import Input from "@/components/general/input";
import Link from "next/link";

export default function SignUp() {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const auth = useGetAuth();
  return (
    <>
      <div className="bg-gray- 800 font-bold flex flex-col space-y-4 justify-center items-center h-screen w-full">
        <div className="flex flex-col space-y-2 max-w-sm w-full">
          {/* convert above input to Input */}
          <div className="text-center text-3xl font-semibold mb-10">
            SignUp Form
          </div>
          <Input placeholder="Username" Ref={usernameRef} />
          <Input placeholder="Password" type="password" Ref={passwordRef} />
        </div>

        <div className="flex gap-x-4 pt-2">
          <button
            className="bg-blue-100 px-6 py-2 rounded-xl active:bg-red-200"
            onClick={() => {
              const data = {
                username: usernameRef.current?.value,
                password: passwordRef.current?.value,
              };
              auth.signup(data);
            }}
          >
            Submit
          </button>
        </div>
        <p className="text-sm">
          <Link href="/signin"> go to Sign in</Link>
        </p>
      </div>
    </>
  );
}

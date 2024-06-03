import React from "react";
import { useGetAuth } from "../utils/auth-hook";
import Link from "next/link";
import Input from "@/components/general/input";

export default function SignIn() {
  const userNameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const auth = useGetAuth();
  return (
    <>
      <div className=" font-bold flex flex-col space-y-4 justify-center items-center h-screen w-full">
        <div className="flex flex-col space-y-2">
          <div className="text-center text-3xl font-semibold mb-10">
            Login Form
          </div>
          <Input placeholder="username" Ref={userNameRef} />
          <Input placeholder="password" Ref={passwordRef} />
        </div>

        <div className="flex gap-x-4 pt-2">
          <button
            className="bg-blue-100 px-6 py-2 rounded-xl active:bg-red-200"
            onClick={() => {
              // setLoader(true);
              const data = {
                username: userNameRef.current?.value,
                password: passwordRef.current?.value,
              };
              auth.login(data);
            }}
          >
            Submit
          </button>
        </div>
        <p className="text-sm">
          <Link href="/signup">go to Sign up</Link>
        </p>
      </div>
    </>
  );
}

import React from "react";
import Input from "@/components/general/input";
import { useUser } from "@/utils/user-hook";
import { UserModel } from "@/utils/types/user-model";

export default function EditUser(props: {
  editId?: number;
  setEditId: React.Dispatch<React.SetStateAction<number | undefined>>;
  userList?: UserModel[];
}) {
  const userControl = useUser();
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const mobileRef = React.useRef<HTMLInputElement>(null);
  const professionRef = React.useRef<HTMLInputElement>(null);
  const addressRef = React.useRef<HTMLInputElement>(null);
  const roleRef = React.useRef<HTMLInputElement>(null);

  const user = props.userList?.find((user) => user.id === props.editId);
  return (
    <>
      {props.editId && (
        <div className="fixed top-0 left-0 bg-black/50 font-bold flex flex-col space-y-4 justify-center items-center h-screen w-full">
          <div className="max-w-sm w-full bg-white flex flex-col p-4 rounded-xl">
            <div className="flex flex-col space-y-2  w-full ">
              {/* convert above input to Input */}
              <div className="text-center text-3xl font-semibold mb-10">
                Edit User
              </div>
              <Input
                placeholder="Username"
                value={user?.username ?? ""}
                Ref={usernameRef}
              />
            </div>

            <div className="flex gap-x-4 pt-2">
              <button
                className="bg-blue-100 px-6 py-2 rounded-xl active:bg-red-200"
                onClick={() => {
                  const data = {
                    username: usernameRef.current?.value,
                    email: emailRef.current?.value,
                  };
                  props.editId &&
                    userControl.editUser(props.editId.toString(), data);
                }}
              >
                Submit
              </button>
              <button
                className="bg-red-100 px-6 py-2 rounded-xl active:bg-red-200 "
                onClick={() => {
                  props.setEditId(undefined);
                }}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { UserModel } from "@/utils/types/user-model";
import React from "react";
import Button from "../general/button";
import { useUser } from "@/utils/user-hook";
import { useGetAuth } from "@/utils/auth-hook";

export default function UserCard({
  user,
  setEditId,
}: {
  user: UserModel;
  setEditId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const userControl = useUser();
  const auth = useGetAuth();
  const backendUrl = process.env.NEXT_PUBLIC_API;

  return (
    <div className="w-full max-w-sm p-4 space-y-4 border border-gray-200 rounded-lg shadow-md bg-white">
      <div className="flex items-center space-x-4">
        <img
          src={
            user?.imageUrl
              ? `${backendUrl}${user.imageUrl}`
              : "https://via.placeholder.com/100"
          }
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <div className="text-xl font-bold">{user?.username}</div>
          <div className="text-sm text-gray-500">UserId: {user?.id}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => setEditId(user.id)}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this user?"))
              userControl.deleteUser(user.id.toString());
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

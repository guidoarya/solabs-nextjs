import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserModel } from "@/utils/types/user-model";
import { useUser } from "@/utils/user-hook";
import LabeledInput from "../general/labeled-input";
import Button from "../general/button";

const schema = z.object({
  username: z.string(),
  password: z.string(),
  file: z.any(),
});

export default function AddUser(props: {
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userControl = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log({ data });
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    console.log(fileInput.files);
    if (fileInput.files?.length) {
      formData.append("file", fileInput.files[0]);
    }
    props.show && userControl.addUser(formData);
  };

  return (
    <>
      {props.show && (
        <div className="fixed top-0 left-0 bg-black/50 font-bold flex flex-col space-y-4 h-screen w-full p-10 overflow-auto">
          <div className="max-w-sm w-full bg-white flex flex-col p-4 rounded-xl m-auto">
            <div className="flex flex-col space-y-2   w-full ">
              {/* convert above input to Input */}
              <div className="text-center text-3xl font-semibold mb-5">
                Create New User
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <LabeledInput
                  label="Username"
                  register={{
                    ...register("username"),
                  }}
                  error={errors.username?.message}
                />
                <LabeledInput
                  type="password"
                  label="Password"
                  register={{
                    ...register("password"),
                  }}
                  error={errors.password?.message}
                />
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  className="border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  {...register}
                />
                <div className="mt-4 flex justify-evenly">
                  <Button type="submit">Submit</Button>
                  <Button onClick={() => props.setShow(false)}>Close</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

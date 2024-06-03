import axios from "axios";
import { loaderOpenState } from "./loader-open-state";
import { useGetAuth } from "./auth-hook";
import { useSetAtom } from "jotai";

export function useUser() {
  const auth = useGetAuth();
  const setLoader = useSetAtom(loaderOpenState);

  async function deleteUser(userId: string) {
    setLoader(true);
    try {
      const data = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setLoader(false);
      return { data };
    } catch (error) {
      setLoader(false);
      return { error };
    }
  }

  async function editUser(userId: string, userData: any) {
    setLoader(true);
    try {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_API}users/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setLoader(false);
      return { data };
    } catch (error) {
      setLoader(false);
      return { error };
    }
  }

  async function addUser(userData: FormData) {
    setLoader(true);
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API}users`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setLoader(false);
      return { data };
    } catch (error) {
      setLoader(false);
      return { error };
    }
  }

  return { editUser, deleteUser, addUser };
}

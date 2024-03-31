import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/apiProducts";
import { toast } from "react-toastify";

function useCreateUser() {
  const { isLoading, mutate: signUp } = useMutation(createUser, {
    onSuccess: () => {
      toast.success("Registered successfully");
    },
  });
  return { isLoading, signUp };
}

export default useCreateUser;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, Id }) => createEditCabin(newCabinData, Id),
    onSuccess: () => {
      toast.success("Cabin has been edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editCabin, isEditing };
}

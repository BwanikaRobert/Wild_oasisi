import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettngs() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success(`Settings successfully updated`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, update };
}

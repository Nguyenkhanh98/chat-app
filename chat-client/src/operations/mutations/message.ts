import { messageAPIService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

function useAddMessageMutation(options?: any) {
  return useMutation(messageAPIService.addMessage, options);
}

export { useAddMessageMutation };

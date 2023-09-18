import { useQueryClient } from "@tanstack/react-query";
import { VAR_CACHE_SOCKET_SETTING } from "../vars";
import { TSocket } from "../types";

export const useWriteCacheSocket = () => {
  const queryClient = useQueryClient();
  return (data: Partial<TSocket>) => {
    queryClient.setQueryData([VAR_CACHE_SOCKET_SETTING], (preState: any) => {
      return {
        ...preState,
        ...data,
      };
    });
  };
};

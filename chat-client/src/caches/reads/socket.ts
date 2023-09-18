import { useQuery } from "@tanstack/react-query";
import { VAR_CACHE_SOCKET_SETTING, appContextInitCache } from "../vars";
import { TSocket } from "../types";

export const useReadCacheSocket = (): TSocket => {
  const queryClient: any = useQuery({
    queryKey: [VAR_CACHE_SOCKET_SETTING],
  });
  return queryClient.data || appContextInitCache;
};

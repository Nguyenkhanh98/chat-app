import { useQuery } from "@tanstack/react-query";
import { VAR_CACHE_APP_CONTEXT_SETTING, appContextInitCache } from "../vars";
import { TAppContext } from "../types";

export const useReadCachAppContext = (): TAppContext => {
  const queryClient: any = useQuery({
    queryKey: [VAR_CACHE_APP_CONTEXT_SETTING],
  });
  return queryClient.data || appContextInitCache;
};

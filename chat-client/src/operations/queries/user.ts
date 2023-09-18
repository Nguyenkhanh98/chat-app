import { useQuery } from "@tanstack/react-query";
import { VAR_USER_API } from "../vars";
import { userAPIService } from "@/services/api";

export function useGetAllContactsQuery(params?: any, options = {}) {
  return useQuery([VAR_USER_API], userAPIService.getContacts, options);
}

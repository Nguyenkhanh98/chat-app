import { useQuery } from "@tanstack/react-query";
import { VAR_MESSAGE_API, VAR_MESSAGE_FROM_USER } from "../vars";
import { messageAPIService } from "@/services/api";
import { TContactQuery, TMessageQuery } from "@/services/api/message";

export function useGetMessageQuery(params: TMessageQuery, options: any = {}) {
  return useQuery(
    [VAR_MESSAGE_API],
    messageAPIService.getMessages(params),
    options
  );
}

export function useQueryGetMessageFromUser(query: TContactQuery, options = {}) {
  return useQuery(
    [VAR_MESSAGE_FROM_USER],
    messageAPIService.getContacts(query),
    options
  );
}

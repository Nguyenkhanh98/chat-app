import { RequestAPI } from "@/helpers/makeRequest";
import Config from "@/configs/config";

export type TMessageQuery = {
  from: string;
  to: string;
};

export const getMessages = (params: TMessageQuery) => {
  return async () => {
    const result = await RequestAPI({
      method: "GET",
      url: `${Config.API.ENDPOINT.MESSAGE.GET_MESSAGES_ROUTE}/${params.from}/${params.to}`,
    });
    return result.data.data;
  };
};

export type TAddMessage = {
  message: string;
  from: string;
  to: string;
};
export const addMessage = async (payload: TAddMessage) => {
  const result = await RequestAPI({
    method: "POST",
    url: `${Config.API.ENDPOINT.MESSAGE.ADD_MESSAGE}`,
    data: payload,
  });
  return result.data.data;
};
export type TContactQuery = {
  from: string;
};

export const getContacts = (params: TContactQuery) => {
  return async () => {
    const result = await RequestAPI({
      method: "GET",
      url: `${Config.API.ENDPOINT.MESSAGE.GET_INITIAL_CONTACTS_ROUTE}/${params.from}`,
    });
    return result.data.data;
  };
};

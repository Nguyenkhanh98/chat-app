import { RequestAPI } from "@/helpers/makeRequest";
import Config from "@/configs/config";

export const checkUser = async (payload: any) => {
  const result = await RequestAPI({
    method: "POST",
    url: Config.API.ENDPOINT.USER.CHECK_USER,
    data: payload,
  });
  return result.data;
};

export const onBoardingUser = async (payload: any) => {
  const result = await RequestAPI({
    method: "POST",
    url: Config.API.ENDPOINT.USER.onBoardUserRoute,
    data: payload,
  });
  return { data: result.data, status: result.status };
};

export const getContacts = async () => {
  const result = await RequestAPI({
    method: "GET",
    url: Config.API.ENDPOINT.USER.GET_ALL_CONTACTS,
  });
  return result.data.users;
};

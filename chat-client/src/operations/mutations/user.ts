import { userAPIService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

function useCheckUserMutation(options?: any) {
  return useMutation(userAPIService.checkUser, options);
}
async function onBoardingUser(user: any): Promise<any> {
  const result = await userAPIService.onBoardingUser(user);
  return result.data;
}

export { useCheckUserMutation, onBoardingUser };

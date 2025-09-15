import { QueryClient } from "@tanstack/react-query";
// import { handleErrorMessage } from "@deolho/common/utils/api/handleErrorMessage";
import { isAxiosError } from "axios";

// se o erro for um erro de cliente (4xx), não tentar novamente
const retry = (failureCount: number, error: Error) => {
  const isClientError =
    isAxiosError(error) &&
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  return isClientError ? false : failureCount < 3;
};

// function handleError(error: Error, query: Query) {
//   setTimeout(() => {
//     handleErrorMessage({
//       error,
//       path: ("query/" + query?.queryKey?.[0]) as string,
//     });
//   });

//   return false;
// }

export const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // throwOnError: handleError,
      retry,
      refetchOnMount: true,
      staleTime: 1000 * 60 * 1,
    },
  },
});

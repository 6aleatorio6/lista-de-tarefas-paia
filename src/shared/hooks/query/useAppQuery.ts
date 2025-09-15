import { normalizeParams } from "@deolho/common/utils";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";

interface IUseAppQuery {
  <GParams = any, GData = unknown>(
    serviceQuery: (params: GParams) => Promise<GData>,
    params?: GParams,
    config?: Omit<
      UseQueryOptions<GData, unknown, GData, QueryKey>,
      "queryKey" | "queryFn"
    >,
  ): UseQueryResult<GData, unknown>;
}

export const useAppQuery: IUseAppQuery = (serviceQuery, params?, config?) => {
  return useQuery({
    queryKey: [serviceQuery.name, ...normalizeParams(params || {})],
    queryFn: () => serviceQuery(params as any),
    ...config,
  });
};

import { IPaginationParams } from "@deolho/common/types/paginationParams";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import { IPaginatedResponse } from "@deolho/common/types";
import { normalizeParams } from "@deolho/common/utils";
import { useMemo } from "react";

/**
 * Interface para o hook useAppInfiniteQuery que gerencia consultas paginadas

 */
interface IUseAppInfiniteQuery {
  <
    GData extends Record<string, any>,
    GParams extends Record<string, any> & IPaginationParams<string>,
    GError = Error,
  >(
    serviceQuery: (params: GParams) => Promise<IPaginatedResponse<GData>>,
    params?: Omit<GParams, "page">,
    config?: Omit<
      UseInfiniteQueryOptions<
        IPaginatedResponse<GData>,
        GError,
        GData[],
        QueryKey,
        number
      >,
      "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
    >,
  ): Omit<UseInfiniteQueryResult<GData[], GError>, "data"> & {
    lastPagination: Omit<GParams, "page">;
    dataList: GData[];
  };
}

export const useAppInfiniteQuery: IUseAppInfiniteQuery = (
  serviceQuery,
  params,
  config,
) => {
  const query = useInfiniteQuery({
    queryKey: [serviceQuery.name, ...normalizeParams(params || {})] as const,
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = {
        ...(params || {}),
        page: pageParam,
      } as any;

      return serviceQuery(queryParams);
    },

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.hasNextPage ? lastPageParam + 1 : undefined;
    },

    initialPageParam: 1,

    ...config,
  }) as any;

  query.lastPagination = useMemo(
    () => ({ ...query.data?.pages.at(-1), items: undefined }),
    [query.data],
  );

  query.dataList = useMemo(
    () => query.data?.pages.flatMap(({ items }: any) => items) ?? [],
    [query.data],
  );

  return query;
};

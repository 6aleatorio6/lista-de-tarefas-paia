import { normalizeParams } from "./normalizeParams";
import { appQueryClient } from "./appQueryClient";

interface IInvalidateQuery {
  <GParams extends Record<string, unknown>>(
    serviceQuery: (params: GParams) => Promise<unknown>,
    params?: Partial<GParams>
  ): Promise<void>;
}

/**
 * Invalida queries no React Query.
 *
 * Invalida a query específica do service que possuem os parâmetros correspondentes
 * (se não for fornecido params, invalida todas as queries do service)
 *
 * ⚠️ Limitação: não suporta arrays ou objetos aninhados nos parâmetros
 *
 */
export const invalidateQuery: IInvalidateQuery = (serviceQuery, params) => {
  const normalizedParams = params ? normalizeParams(params) : [];

  return appQueryClient.invalidateQueries({
    exact: false,
    type: "all",
    refetchType: "active",
    predicate: (query) => {
      const isServiceQuery = query.queryKey[0] == serviceQuery.name;

      const hasValidParams = normalizedParams.every((param) =>
        query.queryKey.includes(param)
      );

      return isServiceQuery && hasValidParams;
    },
  });
};

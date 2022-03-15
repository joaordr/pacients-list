import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";



type GetPacientsResponse = {
    pacients: any[],
    responseSeed: string,
}

const resultsPerRequest = 50;

export async function getPacients(seed: string): Promise<GetPacientsResponse> {
    let response = await api.get(`?results=${resultsPerRequest}${seed == '' ? '' : `&seed=${seed}`}`);

    const responseSeed = response.data.info.seed;
    const pacients = response.data.results;

    return {
        pacients,
        responseSeed
    };

}

export function usePacients(page: number, seed: string, options?: UseQueryOptions) {
    return useQuery(['pacients', `${page}`], () => getPacients(seed), {
        staleTime: 1000 * 60 * 30,
        ...options
    })
}
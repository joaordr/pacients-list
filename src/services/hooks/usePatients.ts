import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type GetPatientsResponse = {
    patients: any[],
    responseSeed: string,
}

const resultsPerRequest = 50;

export async function getPatients(seed: string): Promise<GetPatientsResponse> {
    let response = await api.get(`?results=${resultsPerRequest}${seed == '' ? '' : `&seed=${seed}`}`);

    const responseSeed = response.data.info.seed;
    const patients = response.data.results;

    return {
        patients,
        responseSeed
    };

}

export function usePatients(page: number, seed: string, options?: UseQueryOptions) {
    return useQuery(['pacients', `${page}`], () => getPatients(seed), {
        staleTime: 1000 * 60 * 30,
        ...options
    })
}
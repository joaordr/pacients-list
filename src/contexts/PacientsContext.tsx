/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useState } from "react";
import { useRouter } from "next/router";

import { useEffect } from "react";
import { usePacients } from "../services/hooks/usePacients";

type PacientContextData = {
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    ordenateByName: () => void;
    ordenateByGender: () => void;
    handleFilterByName: (value: string) => void;
    activePage: number;
    activeSeed: string;
    activePacient: any;
    setActiveSeed: (seed: string) => void;
    handleSelectPacient: (pacient: any) => void;
    handleSetActivePacientById: (uuid: string) => void;
    setActivePacient: (pacient: any) => void;
    pacients: any[];
    pages: any[];
    isLoading: boolean;
    isFetching: boolean;
}

type PacientsProviderProps = {
    children: ReactNode;
}

export const PacientsContext = createContext({} as PacientContextData);

export function PacientsProvider({ children }: PacientsProviderProps) {
    const router = useRouter();

    const [pacients, setPacients] = useState([]);
    const [pacientsControl, setPacientsControl] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [activeSeed, setActiveSeed] = useState('');
    const [pages, setPages] = useState([]);
    const [activePacient, setActivePacient] = useState(null);
    const [urlPacient, setUrlPacient] = useState('');

    const { data, isLoading, isSuccess, isFetching, error, remove }: any = usePacients(activePage, (activePage > (pages.length - 1)) ? '' : pages[activePage]);

    const [isOrderByNameCrescent, setIsOrderByNameCrescent] = useState(true);
    const [isOrderByGender, setIsOrderByGender] = useState(true);

    useEffect(() => {
        if (isSuccess) {
            if ((activeSeed != data.responseSeed) && pages.length == 0 && activeSeed != '') {
                remove();
                setPages([activeSeed]);
            } else {
                if (activeSeed != data.responseSeed) {
                    router.replace(`/${data.responseSeed}`, undefined, { shallow: true });
                    setActiveSeed(data.responseSeed);
                    if (activePage > pages.length - 1) {
                        setPages([...pages, data.responseSeed]);
                    }
                }
                setPacients(data.pacients);
                setPacientsControl(data.pacients);

                if (urlPacient != '') {
                    const pacient = data.pacients.find(element => element.login.uuid === urlPacient);
                    if (pacient != undefined) {
                        setActivePacient(pacient);
                        setUrlPacient('');
                    } else {
                        router.replace(`/${data.responseSeed}`, undefined, { shallow: true });
                    }
                }
            }

        }
    }, [data]);

    function handleNextPage() {
        let page = activePage + 1;
        setActivePage(page);
    }

    function handlePreviousPage() {
        let page = activePage <= 0 ? 0 : activePage - 1;
        setActivePage(page);
    }

    function handleFilterByName(value: string) {
        setPacients(pacientsControl.filter((pacient) => {
            if (pacient.name.first.toLowerCase().startsWith(value.toLowerCase()) || pacient.name.last.toLowerCase().startsWith(value.toLowerCase())) {
                return pacient;
            }
        }))
    }

    function ordenateByName() {
        let array = [...pacients];
        if (isOrderByNameCrescent) {
            array.sort((a, b) => a.name.first.localeCompare(b.name.first)); // crescente
        } else {
            array.sort((a, b) => b.name.first.localeCompare(a.name.first)); // decrecente
        }
        setIsOrderByNameCrescent(!isOrderByNameCrescent);
        setPacients(array);
    }

    function ordenateByGender() {
        let array = [...pacients];
        if (isOrderByGender) {
            array.sort((a, b) => b.gender.localeCompare(a.gender)); // male
        } else {
            array.sort((a, b) => a.gender.localeCompare(b.gender)); // female
        }
        setIsOrderByGender(!isOrderByGender);
        setPacients(array);
    }

    function handleSelectPacient(pacient: any) {
        setActivePacient(pacient);
        router.replace(`/${data.responseSeed}/${pacient.login.uuid}`, undefined, { shallow: true });
    }

    async function handleSetActivePacientById(uuid: string) {
        setUrlPacient(uuid);
    }

    return (
        <PacientsContext.Provider value={{ pacients, activePage, activePacient, setActivePacient, activeSeed, setActiveSeed, handleSelectPacient, handleFilterByName, handleSetActivePacientById, pages, isLoading, isFetching, handleNextPage, handlePreviousPage, ordenateByName, ordenateByGender }}>
            {children}
        </PacientsContext.Provider>
    )

}
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useState } from "react";
import { useRouter } from "next/router";

import { useEffect } from "react";
import { usePatients } from "../services/hooks/usePatients";

type PatientContextData = {
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    ordenateByName: () => void;
    ordenateByGender: () => void;
    handleFilterByName: (value: string) => void;
    activePage: number;
    activeSeed: string;
    activePatient: any;
    setActiveSeed: (seed: string) => void;
    handleSelectPatient: (pacient: any) => void;
    handleSetActivePatientById: (uuid: string) => void;
    setActivePatient: (pacient: any) => void;
    patients: any[];
    pages: any[];
    isLoading: boolean;
    isFetching: boolean;
}

type PatientsProviderProps = {
    children: ReactNode;
}

export const PatientsContext = createContext({} as PatientContextData);

export function PatientsProvider({ children }: PatientsProviderProps) {
    const router = useRouter();

    const [patients, setPatients] = useState([]);
    const [patientsControl, setPatientsControl] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [activeSeed, setActiveSeed] = useState('');
    const [pages, setPages] = useState([]);
    const [activePatient, setActivePatient] = useState(null);
    const [urlPatient, setUrlPatient] = useState('');

    const { data, isLoading, isSuccess, isFetching, error, remove }: any = usePatients(activePage, (activePage > (pages.length - 1)) ? '' : pages[activePage]);

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
                setPatients(data.patients);
                setPatientsControl(data.patients);

                if (urlPatient != '') {
                    const patient = data.patients.find(element => element.login.uuid === urlPatient);
                    if (patient != undefined) {
                        setActivePatient(patient);
                        setUrlPatient('');
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
        setPatients(patientsControl.filter((patient) => {
            if (patient.name.first.toLowerCase().startsWith(value.toLowerCase()) || patient.name.last.toLowerCase().startsWith(value.toLowerCase())) {
                return patient;
            }
        }))
    }

    function ordenateByName() {
        let array = [...patients];
        if (isOrderByNameCrescent) {
            array.sort((a, b) => a.name.first.localeCompare(b.name.first)); // crescente
        } else {
            array.sort((a, b) => b.name.first.localeCompare(a.name.first)); // decrecente
        }
        setIsOrderByNameCrescent(!isOrderByNameCrescent);
        setPatients(array);
    }

    function ordenateByGender() {
        let array = [...patients];
        if (isOrderByGender) {
            array.sort((a, b) => b.gender.localeCompare(a.gender)); // male
        } else {
            array.sort((a, b) => a.gender.localeCompare(b.gender)); // female
        }
        setIsOrderByGender(!isOrderByGender);
        setPatients(array);
    }

    function handleSelectPatient(patient: any) {
        setActivePatient(patient);
        router.replace(`/${data.responseSeed}/${patient.login.uuid}`, undefined, { shallow: true });
    }

    async function handleSetActivePatientById(uuid: string) {
        setUrlPatient(uuid);
    }

    return (
        <PatientsContext.Provider value={{ patients, activePage, activePatient, setActivePatient, activeSeed, setActiveSeed, handleSelectPatient, handleFilterByName, handleSetActivePatientById, pages, isLoading, isFetching, handleNextPage, handlePreviousPage, ordenateByName, ordenateByGender }}>
            {children}
        </PatientsContext.Provider>
    )

}
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { PatientsContext } from '../contexts/PatientsContext';

export default function Pacients() {
    const router = useRouter();
    const { activeSeed, setActiveSeed, activePatient, handleSetActivePatientById } = useContext(PatientsContext);

    useEffect(() => {
        if (router.query.params != undefined) {
            if (activeSeed != router.query.params[0]) {
                setActiveSeed(router.query.params[0]);
            }
            if (router.query.params[1] != undefined && activePatient == null) {
                handleSetActivePatientById(router.query.params[1]);
            }
        }
    }, [router.query]);

    return (
        <>
            <Head>
                <title>Pacientes</title>
            </Head>
        </>

    )
}
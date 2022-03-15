/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { PacientsContext } from '../contexts/PacientsContext';

export default function Pacients() {
    const router = useRouter();
    const { activeSeed, setActiveSeed, activePacient, handleSetActivePacientById } = useContext(PacientsContext);

    useEffect(() => {
        if (router.query.params != undefined) {
            if (activeSeed != router.query.params[0]) {
                setActiveSeed(router.query.params[0]);
            }
            if (router.query.params[1] != undefined && activePacient == null) {
                handleSetActivePacientById(router.query.params[1]);
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
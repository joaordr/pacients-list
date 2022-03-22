import Head from 'next/head';
import Router from 'next/router';
import { useContext } from 'react';
import { PatientsContext } from '../contexts/PatientsContext';

export default function Home() {
  const { activeSeed, isLoading } = useContext(PatientsContext);
  if (!isLoading && activeSeed != '') {
    Router.push(`/${activeSeed}`, undefined, { shallow: true });
  }

  return (
    <Head>
      <title>Pacientes</title>
    </Head>
  )
}
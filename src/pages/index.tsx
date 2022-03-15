import Head from 'next/head';
import Router from 'next/router';
import { useContext } from 'react';
import { PacientsContext } from '../contexts/PacientsContext';

export default function Home() {
  const { activeSeed, isLoading } = useContext(PacientsContext);
  if (!isLoading && activeSeed != '') {
    Router.push(`/${activeSeed}`, undefined, { shallow: true });
  }

  return (
    <Head>
      <title>Pacientes</title>
    </Head>
  )
}
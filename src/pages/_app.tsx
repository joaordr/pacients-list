import { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"

import { QueryClientProvider } from 'react-query'
import { PatientsProvider } from '../contexts/PatientsContext'

import { queryClient } from '../services/queryClient'

import '../styles/globals.scss';
import styles from '../styles/Home.module.scss';
import Header from '../components/Header';
import Search from '../components/Search';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import PatientModal from '../components/PatientModal';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <PatientsProvider>

          <Header />
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.title}>
                <p>LISTAGEM DE PACIENTES</p>
              </div>
              <Search />
              <Table />
              <Pagination />
            </div>
            <PatientModal />

            <Component {...pageProps} />

          </div>

        </PatientsProvider>
      </QueryClientProvider>
    </SessionProvider>

  )
}

export default MyApp

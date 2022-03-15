import { AppProps } from 'next/app';

import { QueryClientProvider } from 'react-query'
import { PacientsProvider } from '../contexts/PacientsContext'

import { queryClient } from '../services/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools';

import '../styles/globals.scss';
import styles from '../styles/Home.module.scss';
import Header from '../components/Header';
import Search from '../components/Search';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import PacientModal from '../components/PacientModal';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PacientsProvider>

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
          <PacientModal />

          <Component {...pageProps} />

        </div>

      </PacientsProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>

  )
}

export default MyApp

import Head from 'next/head';
import SalesRepsList from '../components/SalesReps';
import Geminiai from '../components/Geminiai';

export default function Home() {
  return (
    <>
      <Head>
        <title>List Reps Dashboard</title>
        <meta name="description" content="View sales reps, deals, and clients" />
      </Head>
      <main className={"p-6 bg-gray-100 min-h-screen"}>
        <SalesRepsList />
        <Geminiai />
      </main>
    </>
  );
}
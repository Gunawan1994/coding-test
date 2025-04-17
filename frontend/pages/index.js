import Head from 'next/head';
import SalesRepsList from '../components/SalesReps';

export default function Home() {
  return (
    <>
      <Head>
        <title>List Reps Dashboard</title>
        <meta name="description" content="list of sales representatives" />
      </Head>
      <main className={"p-6 bg-gray-100 min-h-screen"}>
        <SalesRepsList />
      </main>
    </>
  );
}
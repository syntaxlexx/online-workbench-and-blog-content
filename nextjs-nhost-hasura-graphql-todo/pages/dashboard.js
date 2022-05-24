import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";

import { authProtected } from "../auth-protected";

function Dashboard(params) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="dashboard area" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>My Dashboard</h1>
        <p className={styles.description}>
          <Link href="/">Go Back</Link>
        </p>
      </main>
    </div>
  );
}

export default authProtected(Dashboard);

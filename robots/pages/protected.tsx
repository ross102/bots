import React from "react";
import { GetServerSidePropsContext } from "next";
import styles from "../styles/Home.module.css";
import { getSession, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
const Persona = dynamic((): any => import("../components/Inquiry"), {
  ssr: false,
}) as any;

// gets a prop from getServerSideProps
function Protected({ user }: any) {
  return (
    <div className={styles.wrapper}>
      <Persona user={user} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  //   // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session },
  };
}

export default Protected;

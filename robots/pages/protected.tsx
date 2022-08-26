import React from "react";
import dynamic from "next/dynamic";
import { GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";

import PersonaClient from "../components/Inquiry";

// gets a prop from getServerSideProps
function Protected({ user }: any) {
  console.log(user);
  return <PersonaClient />;
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

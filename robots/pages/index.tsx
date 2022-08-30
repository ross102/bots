import { GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";
import Head from "next/head";

// gets a prop from getServerSideProps
function Home() {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <h4>Home page</h4>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> 
      <button onClick={() => signOut()}>Sign out</button>*/}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  //   // redirect if not authenticated
  if (session) {
    return {
      redirect: {
        destination: "/protected",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/signin",
    },
  };
}

export default Home;

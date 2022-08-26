import { GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";

// gets a prop from getServerSideProps
function Home({ user }: any) {
  console.log(user);
  return (
    <div>
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/* <button onClick={() => signOut()}>Sign out</button> */}
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

export default Home;

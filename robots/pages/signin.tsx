import type { NextPage } from "next";
import baseApi from "../components/utils/baseApi";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { InjectedConnector } from "wagmi/connectors/injected";

import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";

//login

const Signin: NextPage = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const handleAuth = async (e: any) => {
    e.preventDefault();
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });

    const userData = { address: account, chain: chain.id, network: "evm" };
    console.log(userData);

    const { data } = await baseApi.post("/api/auth/request-message", userData);

    const message = data.message;

    const signature = await signMessageAsync({ message });

    try {
      await signIn("credentials", { message, signature, redirect: false });
      // redirects to protected page
      push("/protected");
    } catch (e) {
      return;
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.wrapper}>
        <form className="p-3 mt-3">
          <h3>Are you a robot ?</h3>

          <p>Lets find out</p>
          <div className="d-flex align-items-center">
            <button onClick={(e) => handleAuth(e)} className={styles.btn}>
              Login with metamask
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;

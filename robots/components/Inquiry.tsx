import type { NextPage } from "next";
import Persona from "persona";
import baseApi from "./utils/baseApi";
import { uuid } from "uuidv4";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const HumanStatus: NextPage = (props: any) => {
  const [status, setStatus] = useState<string>("Wait ...");
  const userData = props.user;
  const TEMP_ID = process.env.NEXT_PUBLIC_TEMP_ID;
  //send inquiry to backend
  const submit = async (inquiry: string, status: string) => {
    try {
      const data = await baseApi.post("/api/verification/inquiry", {
        id: uuid(),
        referenceId: userData.user.address,
        inquiryId: inquiry,
        profileId: userData.user.profileId,
        status,
      });

      console.log(data);
    } catch (error: any) {
      console.log(error.response);
    }

    console.log(
      `Sending finished ${JSON.stringify(
        userData.user.address
      )} inquiry ${inquiry} and ${status} to backend`
    );
  };

  const client: any = new Persona.Client({
    templateId: TEMP_ID as string,
    environment: "sandbox",
    referenceId: userData?.user.address,
    onReady: () => {
      setStatus("Start Verification");
      console.log("ready to start verification");
    },
    onComplete: async ({ inquiryId, status }) => {
      setStatus("Verification Complete");
      submit(inquiryId, status);
      console.log("Verification Complete");
    },
    onCancel: ({ inquiryId, sessionToken }) => {
      setStatus("Cancelled");
      console.log("Cancelled");
    },
    onError: (error) => {
      setStatus("Error, Try Again");
      console.log(error);
    },
  });

  return (
    <div className={styles.wrapper}>
      <div>
        <button
          onClick={() => status !== "Please wait ..." && client.open()}
          className={styles.btn}
        >
          {status}
        </button>
      </div>
    </div>
  );
};

export default HumanStatus;

import type { NextPage } from "next";
import Persona from "persona";
import baseApi from "./utils/baseApi";
import { uuid } from "uuidv4";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";

const HumanStatus: NextPage = (props: any) => {
  const userData = props.user;
  //send inquiry to
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

  useEffect(() => {
    const client: any = new Persona.Client({
      templateId: "itmpl_b6SWjM42vGXGVhJSZ4ad1VWL",
      environment: "sandbox",
      referenceId: userData?.user.address,
      onReady: () => client.open(),
      onComplete: async ({ inquiryId, status }) => {
        submit(inquiryId, status);
      },
      onCancel: ({ inquiryId, sessionToken }) => console.log("onCancel"),
      onError: (error) => console.log(error),
    });
  }, []);

  return <div className={styles.wrapper}>Loading ...</div>;
};

export default HumanStatus;

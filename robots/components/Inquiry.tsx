import type { NextPage } from "next";
import Persona from "persona";
import baseApi from "./utils/baseApi";
import { uuid } from "uuidv4";

const HumanStatus: NextPage = (props: any) => {
  //send inquiry to

  const submit = async (inquiry: string, status: string) => {
    let userData = props.user;
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

  return (
    <div>
      <Persona.Inquiry
        templateId="itmpl_b6SWjM42vGXGVhJSZ4ad1VWL"
        environment="sandbox"
        onLoad={() => {
          console.log("Loaded inline");
        }}
        onComplete={async ({ inquiryId, status }: any) => {
          // Inquiry completed. Optionally tell your server about it.
          return submit(inquiryId, status);
        }}
      />
    </div>
  );
};

export default HumanStatus;

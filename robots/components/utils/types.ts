declare let process: {
  env: {
    APP_DOMAIN: string;
    NEXTAUTH_URL: string;
    MORALIS_API_KEY: string;
    BASE_API: string;
    PERSONA: string;
    TOKEN: string;
  };
};

export interface IcreateInquiry {
  id: string;
  referenceId: string;
  inquiryId: string;
  status: string;
  profileId: string;
}

export default process;

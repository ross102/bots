import Persona from "persona";

const client: any = new Persona.Client({
  // This refers to a production demo template owned by Persona
  templateId: process.env.TEMPLATE_ID,
  environment: "sandbox",
  onReady: () => client.open(),
  onComplete: ({ inquiryId, status, fields }) => console.log("onComplete"),
  onCancel: ({ inquiryId, sessionToken }) => console.log("onCancel"),
  onError: (error) => console.log(error),
});

export default client;

import Persona from "persona";

const InlineInquiry = () => {
  return (
    <Persona.Inquiry
      frameHeight="300px"
      templateId="itmpl_b6SWjM42vGXGVhJSZ4ad1VWL"
      environment="sandbox"
      onLoad={() => {
        console.log("Loaded inline");
      }}
      onComplete={({ inquiryId, status, fields }: any) => {
        // Inquiry completed. Optionally tell your server about it.
        console.log(`Sending finished inquiry ${inquiryId} to backend`);
      }}
    />
  );
};

export default InlineInquiry;

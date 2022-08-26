import dynamic from "next/dynamic";
const Persona: any = dynamic((): any => import("persona"), {
  ssr: false,
});

const InlineInquiry = () => {
  return (
    <Persona.Inquiry
      templateId={process.env.TEMPLATE_ID}
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

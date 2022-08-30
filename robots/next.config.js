/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/verification/persona",
//         destination: "https://withpersona.com/api/v1/inquiries/:inquiryId*",
//         has: [
//           {
//             type: "header",
//             key: "Authorization",
//             value: "persona_sandbox_1ece0bc3-a362-4c09-b995-40e21be0c99f",
//           },
//           {
//             type: "header",
//             key: "Persona-Version",
//             value: "2021-07-05",
//           },
//         ], // The :path parameter is used here so will not be automatically passed in the query
//       },
//     ];
//   },
// };
module.exports = nextConfig;

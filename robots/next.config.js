/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/verification/persona/:referenceId*",
        destination: "https://withpersona.com/api/v1/inquiries/:inquiryId*", // The :path parameter is used here so will not be automatically passed in the query
      },
    ];
  },
};

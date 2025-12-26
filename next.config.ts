import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cms-imgp.jw-cdn.org",
				port: "",
				pathname: "/**",
			},
		],
	} /* config options here */,
	async redirects() {
		return [
			{
				source: "/player",
				destination: "/",
				permanent: true,
			},
		];
	},
};

export default nextConfig;

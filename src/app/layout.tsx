import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Alt Reader",
	description: "Simple app to read image alt text",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="w-96 h-96 absolute bg-blue-200 rounded-full bottom-32 right-32" />
				<div className="backdrop-blur-xl bg-white/80 h-screen">{children}</div>
			</body>
		</html>
	);
}

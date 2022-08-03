import Head from "next/head";
import Footer from "../footer";
import Navbar from "../navbar";

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Scambi Festival</title>
				<meta charSet="utf-8" />
				<meta name="description" content="A website for the Scambi" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main className="mt-48">{children}</main>
			<Footer />
		</>
	);
}

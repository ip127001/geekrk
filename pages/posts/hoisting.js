import Link from "next/link";
import Head from "next/head";

export default function Hoisting() {
  return (
    <div>
      <Head>
        <title>Hoisting</title>
      </Head>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <h1>What is hoisting in JavaScript</h1>
    </div>
  );
}

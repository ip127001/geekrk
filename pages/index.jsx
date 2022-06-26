import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

const ImageComponent = () => (
  <Image
    src="/images/profile.jpg" // Route of the image file
    height={300} // Desired size with correct aspect ratio
    width={300} // Desired size with correct aspect ratio
    alt="Your Name"
  />
);

function HomePage() {
  return (
    <div>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        onLoad={() => console.log("script loaded succesfully")}
      ></Script>

      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
    `}
      </Script>
      <Head>
        <title>RK Blog</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <h1>Welcome to my blog</h1>
      <ImageComponent />
      <h2>Read my blogs</h2>
      <Link href="/posts/hoisting">
        <a>What is hoisting in javascript</a>
      </Link>
    </div>
  );
}
export default HomePage;

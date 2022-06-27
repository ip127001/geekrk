import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/images/logo.png" />
          <meta property="og:title" content="devrk" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dst3jqdwc/image/upload/v1656324684/logo_jwdqxb.png"
          />
          <meta
            property="og:description"
            content="Frontend related content by Rohit Kumawat"
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://geekrk.vercel.app/" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `,
            }}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Khula:wght@300;400;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

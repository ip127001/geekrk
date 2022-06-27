import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Link from "next/link";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className={utilStyles.postContainer}>
      <Link href="/">
        <a>&larr; Back to Home</a>
      </Link>
      <Head>
        <title>{postData.title}</title>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dst3jqdwc/image/upload/v1656324684/logo_jwdqxb.png"
        />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <div>Rohit Kumawat</div>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}

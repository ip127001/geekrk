import { useState } from "react";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Link from "next/link";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  const [likes, setLikes] = useState(postData.likes);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    if (postData?.id) {
      getLikes(postData.id);
    } else {
      setisLoading(false);
    }
  }, [postData]);

  const updateLikes = async (data) => {
    await fetch("/api/likes", {
      method: "post",
      body: JSON.stringify({ data }),
    });
    getLikes(data.title);
  };

  async function getLikes(id) {
    const res = await fetch(`/api/likes?id=${id}`);
    const json = await res.json();
    setLikes(json?.likes || 0);
    setisLoading(false);
  }

  return (
    <div className={utilStyles.postContainer}>
      <Link href="/">
        <a className={utilStyles.backToHome}>&larr; Back to Home</a>
      </Link>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <div>
            <div>Rohit Kumawat</div>
            <Date dateString={postData.date} />
          </div>
          <div className={utilStyles.thumbsSection}>
            {isLoading ? (
              <div className={utilStyles.spinner}>
                <div className={utilStyles.bounce1}></div>
                <div className={utilStyles.bounce2}></div>
                <div className={utilStyles.bounce3}></div>
              </div>
            ) : (
              <>
                <button
                  onClick={() =>
                    updateLikes({
                      title: postData.id,
                      likes: Number(likes) + 1,
                    })
                  }
                >
                  &#128077;
                </button>
                {likes}
              </>
            )}
          </div>
        </div>
        <div
          className={utilStyles.postHtml}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </div>
  );
}

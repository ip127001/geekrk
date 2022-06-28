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

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    if (postData?.id) {
      getLikes(postData.id);
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
    setLikes(json.likes);
  }

  return (
    <div className={utilStyles.postContainer}>
      <Link href="/">
        <a>&larr; Back to Home</a>
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
          </div>
        </div>
        <div
          className={utilStyles.postHtml}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
        <div className={utilStyles.footerClass}>
          <div> If you find the blog helpful, please do give a thumbs up:</div>{" "}
          <div
            className={`${utilStyles.thumbsSection} ${utilStyles.lightText}`}
          >
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
          </div>
        </div>
      </article>
    </div>
  );
}

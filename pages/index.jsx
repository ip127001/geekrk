import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import TextAnimate from "./textAnimate";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  function clickBlog(title) {
    window.gtag("event", "blog_clicked", {
      event_category: "tech",
      event_label: "link tracking",
      value: title,
    });
  }

  return (
    <div className={utilStyles.mainContainer}>
      <Head>
        <title>devrk</title>
      </Head>

      <section>
        <div className={utilStyles.series}>
          <Link href={`/frontend-interview-guide`}>
            <a>Launching: Guide to prepare for Frontend Interviews</a>
          </Link>
        </div>
      </section>

      <section className={utilStyles.headingMd}>
        <div className={utilStyles.profile}>
          <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            height={250}
            width={250}
            alt="Rohit Kumawat Profile Pic"
          />
          <div className={utilStyles.socials}>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.linkedin.com/in/rohit-kumawat-0088b7102/"
            >
              <img src="/images/linkedin.svg" />
            </a>
            <a target="_blank" rel="noopener" href="https://twitter.com/geekrk">
              <img src="/images/twitter.svg" />
            </a>
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/ip127001"
            >
              <img src="/images/github.svg" />
            </a>
          </div>
        </div>
        <div className={utilStyles.introWrap}>
          <div className={`${utilStyles.intro} ${utilStyles.name}`}>
            Hello 👋, I'm Rohit.
          </div>
          <div className={utilStyles.intro}>I am a SDE2 at Swiggy</div>
          <div className={utilStyles.tech}>
            <div className={utilStyles.someting}> Tech Stack </div>
            <TextAnimate />
          </div>
        </div>
      </section>

      <section className={`${utilStyles.blogSection}`}>
        <h1 className={utilStyles.headingLg}>Blogs:</h1>
        <ul className={utilStyles.list}>
          <div className={utilStyles.projects}>
            {allPostsData.map(({ id, date, title }) => (
              <div className={utilStyles.project} key={id}>
                <img src={`/images/${id}.png`} />
                <li className={utilStyles.listItem}>
                  <Link href={`/posts/${id}`}>
                    <a onClick={() => clickBlog(title)}>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                  <br />
                </li>
              </div>
            ))}
          </div>
        </ul>
      </section>
      <section className={utilStyles.projectSection}>
        <h1>Projects:</h1>
        <div className={utilStyles.projects}>
          <div className={utilStyles.project}>
            <img src="/images/project.png" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://chrome.google.com/webstore/detail/swiggy-spending-calculato/obaickalaaihhheaeoholimecdfeenid"
            >
              Swiggy Spending Calculator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

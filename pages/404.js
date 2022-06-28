import Link from "next/link";

export default function Custom404() {
  return (
    <div className="page404">
      <Link href="/">
        <a>&larr; Back to Home</a>
      </Link>
      <img className="placeholder404" src="/images/404.svg" />
    </div>
  );
}

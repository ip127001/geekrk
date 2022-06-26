import Link from "next/link";

export default function Hoisting() {
  return (
    <div>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <h1>What is hoisting in JavaScript</h1>
    </div>
  );
}

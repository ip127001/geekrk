import { useState } from 'react';
import Link from 'next/link';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

function HomePage() {
  return (
    <div>
      <h1>Welcome to my blog</h1>

      <h2>Read my blogs</h2>
      <Link href="/posts/hoisting"><a>What is hoisting in javascript</a></Link>
    </div>
  );
}
export default HomePage;
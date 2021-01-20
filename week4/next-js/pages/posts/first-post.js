import Link from "next/Link";
import Layout from "../../components/layout";
import Head from "next/head";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back home</a>
        </Link>
      </h2>
    </Layout>
  );
}

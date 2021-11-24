import path from "path";
import fs from "fs/promises";

import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("(Re-)Generating index...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const data = JSON.parse(await fs.readFile(filePath));

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  const { products } = data;
  if (!products.length) {
    return { notFound: true };
  }

  return {
    props: data,
    revalidate: 10,
  };
}

export default HomePage;

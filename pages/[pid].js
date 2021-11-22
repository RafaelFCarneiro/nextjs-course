import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  return JSON.parse(await fs.readFile(filePath));
};

export const getStaticProps = async ({ params }) => {
  console.log("(Re-)Generating pid...");
  const { products } = await getData();
  const loadedProduct = products.find((prod) => prod.id === params.pid);

  if (!loadedProduct) {
    return { notFound: true };
  }

  return { props: { loadedProduct } };
};

export const getStaticPaths = async () => {
  const { products } = await getData();
  const paths = products.map((p) => ({ params: { pid: p.id } }));
  return { paths, fallback: true };
};

export default ProductDetailPage;

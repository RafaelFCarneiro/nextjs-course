import path from "path";
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const data = JSON.parse(await fs.readFile(filePath));

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  const { products } = data || [];
  if (!products.length) {
    return { notFound: true };
  }

  return {
    props: data,
    revalidate: 10,
  };
}

export default HomePage;

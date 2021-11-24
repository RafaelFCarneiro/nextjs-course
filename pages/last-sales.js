import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales || []);
  const { data, error } = useSWR(salesUrl, fetcher);

  useEffect(() => {
    if (!data) return;
    setSales(getSalesFromData(data));
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (!data && !sales) return <div>Loading...</div>;

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await fetch(salesUrl).then(resp => resp.json());
  return { props: { sales: getSalesFromData(data) }, revalidate: 10 };
};

export default LastSalesPage;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getSalesFromData = (data) => {
  return Object.keys(data).map((saleId) => ({
    id: saleId,
    username: data[saleId].username,
    volume: data[saleId].volume,
  }));
};

const baseUrl = "firebase url";
const salesUrl = `${baseUrl}/sales.json`;

import { useRouter } from "next/dist/client/router";

function PortfolioProjectPage() {
  const router = useRouter();  
  return (
    <div>
      <h1> Portfolio Project Page </h1>
      {router.pathname}
      <hr></hr> 
      {Object.keys(router.query)}
    </div>
  );
}

export default PortfolioProjectPage;

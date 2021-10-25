import { useRouter } from "next/dist/client/router";

function SelectedClientProjectPage() {
  const router = useRouter();

  return (
    <div>
      <h1>The Project Page for a Specific Project for a Selected Client</h1>
      <hr></hr>
      {Object.keys(router.query)
        .map((propName) => router.query[propName])
        .join(", ")}
    </div>
  );
}

export default SelectedClientProjectPage;

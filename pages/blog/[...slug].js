import { useRouter } from "next/dist/client/router";

function BlogPostsPage() {
  const router = useRouter();
  
  return (
    <div>
      <h1>The Blog Posts</h1>
      <hr></hr>
      {router.query.slug.join(", ")}
    </div>
  );
}

export default BlogPostsPage;
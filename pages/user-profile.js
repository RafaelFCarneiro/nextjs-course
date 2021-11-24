function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

export const getServerSideProps = async (ctx) => {
  const { params, req, res } = ctx;

  console.log(req);
  console.log(res);
  
  return {
    props: {
      username: "Rafael",
    },
  };
};

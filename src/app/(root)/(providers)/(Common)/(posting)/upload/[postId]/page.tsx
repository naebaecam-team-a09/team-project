import UpdateForm from './_components/UpdateForm';

const UpdatePage = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  return (
    <>
      <UpdateForm postId={postId} />
    </>
  );
};

export default UpdatePage;

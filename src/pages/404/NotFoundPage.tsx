import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <div>Not found</div>
      <Link to='/'>Back to home page</Link>
    </>
  );
}

export default NotFoundPage;

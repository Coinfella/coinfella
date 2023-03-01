import Auth from '../auth';

const SignUp = ({ searchParams }: any) => {
  return <Auth isLogin={false} searchParams={searchParams} />;
};

export default SignUp;

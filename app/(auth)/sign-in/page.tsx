import Auth from '../auth';

const SignIn = ({ searchParams }: any) => {
  return <Auth isLogin={true} searchParams={searchParams} />;
};

export default SignIn;

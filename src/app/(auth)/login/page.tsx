import LoginForm from "@/components/LoginForm";

type Props = {};

const page = (props: Props) => {
  return <LoginForm redirectUrl="/dashboard" />;
};

export default page;

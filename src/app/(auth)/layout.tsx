import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-screen justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;

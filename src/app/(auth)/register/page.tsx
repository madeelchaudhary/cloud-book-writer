import Signup from "@/components/RegisterForm";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return <Signup redirectUrl="/login" />;
};

export default page;

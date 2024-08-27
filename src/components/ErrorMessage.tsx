import React from "react";

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => <div  className="px-10 py-5 text-xl">{message}</div>;

export default ErrorMessage;

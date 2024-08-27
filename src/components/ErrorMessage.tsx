import React from "react";

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => <div>{message}</div>;

export default ErrorMessage;

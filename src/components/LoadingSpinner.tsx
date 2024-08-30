import React from "react";

type LoadingSpinnerProps = {
  style: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ style }) => (
  <div className={style}>読み込み中...</div>
);

export default LoadingSpinner;

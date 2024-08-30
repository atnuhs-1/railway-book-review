import React from "react";

interface Props {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const Pagination: React.FC<Props> = ({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) => {
  const buttonBaseStyle =
    "px-4 py-1 rounded-lg  transition-colors duration-200";
  const activeStyle = " hover:bg-accent";
  const disabledStyle = "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <div className="flex justify-center space-x-6">
      <button
        className={`${buttonBaseStyle} ${hasPrevious ? activeStyle : disabledStyle}`}
        onClick={onPrevious}
        disabled={!hasPrevious}
      >
        前へ
      </button>
      <button
        className={`${buttonBaseStyle} ${hasNext ? activeStyle : disabledStyle}`}
        onClick={onNext}
        disabled={!hasNext}
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;

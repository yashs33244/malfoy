import React from "react";

type CardContainerProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

/**
 * A container component for cards with active/inactive states
 */
const CardContainer = ({ active, onClick, children }: CardContainerProps) => {
  const baseStyle =
    "p-4 rounded-2xl cursor-pointer transition-all border group";
  const activeStyle = "bg-black text-white border-black";
  const inactiveStyle =
    "border-slate-200 dark:border-slate-700 bg-background/20 backdrop-blur-sm hover:bg-black hover:text-white hover:border-black";

  return (
    <div
      className={`${baseStyle} ${active ? activeStyle : inactiveStyle}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardContainer;

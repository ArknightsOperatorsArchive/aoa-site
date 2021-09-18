import React from "react";

interface UnderlineButtonProps {
  onClick?: () => void;
  className?: string;
}

const UnderlineButton: React.FC<UnderlineButtonProps> = ({
  children,
  onClick = () => {},
  ...props
}) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div className="my-1">
      <button onClick={onClick}>
        <span
          {...props}
          style={{ overflow: "hidden" }}
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          {children}
        </span>
      </button>
      <div
        className="w-full bg-current"
        style={{
          width: hover ? "100%" : 0,
          height: "0.3em",
          opacity: hover ? 1 : 0,
          transform: `translate3d(${hover ? 0 : "-50%"}, 0,0)`,
          transition: "opacity 150ms, transform 300ms",
        }}
      />
    </div>
  );
};

export default UnderlineButton;

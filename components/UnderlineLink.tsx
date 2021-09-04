import React from "react";

import Link from "next/link";
import { motion } from "framer-motion";

interface LinkProps {
  href: string;
  className?: string;
}

const UnderlineLink: React.FC<LinkProps> = ({ children, href, ...props }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div className="my-1">
      <Link href={href}>
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
      </Link>
      <div
        className="w-full bg-black"
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

export default UnderlineLink;

import React from "react";

export default () => {
  const [scroll, set] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      set(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
  return scroll / 10;
};

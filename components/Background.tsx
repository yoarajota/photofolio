"use client";

const Background = ({ children }) => {
  return (
    <body className="antialiased w-screen h-screen relative">{children}</body>
  );
};
export default Background;

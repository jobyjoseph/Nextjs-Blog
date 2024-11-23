import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default Layout;

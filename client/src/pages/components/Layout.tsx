import { ReactNode } from 'react';
import Navbar from './navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;

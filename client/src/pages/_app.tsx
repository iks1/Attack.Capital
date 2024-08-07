import type { AppProps } from "next/app";
import Navbar from "./components/navbar";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }: AppProps) {
  
  const router = useRouter();
  const noNavbarRoutes=['/login', '/signup'];
  const displayNavBar = !noNavbarRoutes.includes(router.pathname);
  return (
  <>
    {displayNavBar && <Navbar/>}
    <Component {...pageProps} />;
  </>
)
}

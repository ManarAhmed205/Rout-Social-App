import Home from "../../pages/Home/Home";
import type { ReactNode } from "react";

export default function ProtectedRoutsLogin({
  children,
}: {
  children: ReactNode;
}) {
  if (localStorage.getItem("userToken")) {
    return <><Home /></> ;
  } else {
    return <>{ children }</>;
  }
}

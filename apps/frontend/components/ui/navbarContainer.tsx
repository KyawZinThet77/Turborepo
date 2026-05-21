import { PropsWithChildren } from "react";
import DesktopHeader from "./layout/Desktopheader";
import MobileHeader from "./layout/Mobileheader";

type Props = PropsWithChildren;
const NavbarContainer = (props: Props) => {
  return (
    <div className="relative">
      <DesktopHeader>{props.children}</DesktopHeader>
      <MobileHeader>{props.children}</MobileHeader>
    </div>
  );
};

export default NavbarContainer;
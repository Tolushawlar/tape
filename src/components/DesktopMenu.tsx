import Link from "next/link";

import { Logo } from "./Logo";
import { LeftNavMenu } from "./LeftNavMenu";
import { RightNavMenu } from "./RightNavMenu";

const DesktopMenu = () => {
  return (
    <div className="hidden md:flex md:justify-between">
      <LeftNavMenu />
      
      <Link href="/">
        <Logo />
      </Link>

      <RightNavMenu />
    </div>
  );
};

export default DesktopMenu;

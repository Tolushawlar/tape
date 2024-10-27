import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-w-[1440px] mx-auto">
      <div className="px-8 py-2">
        <DesktopMenu />

        <MobileMenu />
      </div>
    </header>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex item-center gap-2.5 cursor-pointer">
          <img src="/images/logo.svg" alt="log" width={46} height={44} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <p>Sign In</p>
      </div>
    </nav>
  );
};

export default Navbar;

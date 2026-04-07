import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Upload Resume", href: "/upload-resume" },
];

export default function NavBar() {
  return (
    <header>
      <nav className="p-5 flex items-center justify-between">
        <Link to="/" className="logo flex justify-center items-center gap-2">
          <img src="/logo.png" alt="Logo" className="size-12" />
          <h1 className="text-3xl text-[#5755d0] font-medium">
            Skill<span className="text-[#C843CD]">Sync</span>
          </h1>
        </Link>

        <ToggleMenu />
      </nav>
    </header>
  );
}

const NavLink = ({ title, href }: { title: string; href: string }) => {
  const location = useLocation();
  const isActive = href === location.pathname;
  return (
    <Link className="relative group" to={href}>
      <p className={`${isActive ? "text-white" : ""} group-hover:text-white`}>
        {title}
      </p>
      <span
        className={`${
          isActive
            ? "w-full left-0"
            : "w-0 left-1/2 group-hover:w-full group-hover:left-0"
        } absolute h-0.5 rounded-full -bottom-1 bg-white transition-all duration-300 ease-in-out`}
      ></span>
    </Link>
  );
};

const ToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (() => setIsOpen(false))();
  }, [location.pathname]);
  return (
    <div className="relative">
      <Menu
        aria-label="Toggle menu"
        className="md:hidden block"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div
        className={`md:flex-1 md:text-gray-400 md:static md:justify-end md:items-center gap-4 md:flex-row flex flex-col md:bg-transparent font-medium text-sm md:opacity-100 bg-white absolute top-[150%] right-4 p-3 whitespace-nowrap rounded-md text-gray-700 ${
          isOpen ? "opacity-100 -translate-x-1.5 translate-y-1.5" : "opacity-0"
        } transition-all duration-300 ease-in-out`}
      >
        {NAV_LINKS.map(({ href, title }, idx) => (
          <NavLink key={idx} title={title} href={href} />
        ))}
        <p className="md:text-white text-black">Hi, Mani Shankar</p>
        <button className="bg-linear-to-r from-[#A3A6FF] to-[#6063EE] text-[#0F00A4] px-4 py-2 rounded-lg uppercase cursor-pointer hover:scale-110 active:scale-105 font-bold">
          Log in
        </button>
      </div>
    </div>
  );
};

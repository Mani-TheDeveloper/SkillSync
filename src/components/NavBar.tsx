import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePuter } from "../context/usePuter";
import {
  CircleUserRound,
  FileUp,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

const NAV_LINKS = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Upload Resume", href: "/upload-resume", icon: FileUp },
];

export default function NavBar() {
  const {
    auth: { isAuthenticated, signIn, signOut },
  } = usePuter();
  const navigate = useNavigate();
  return (
    <>
      <header>
        <nav className="px-5 py-2 flex items-center justify-between fixed w-full top-0 backdrop-blur-sm bg-[#0F1930]/50 z-50">
          <Link to="/" className="logo flex justify-center items-center gap-2">
            <img src="/logo.png" alt="Logo" className="size-12" />
            <h1 className="md:text-3xl text-2xl text-[#5755d0] font-medium">
              Skill<span className="text-[#C843CD]">Sync</span>
            </h1>
          </Link>

          <div className="flex items-center mr-3 gap-6">
            <ToggleMenu isMobile={false} />
            <button
              className="bg-linear-to-r from-[#A3A6FF] to-[#6063EE] text-[#0F00A4] md:px-3 px-2 md:py-1 py-0.5 rounded-lg uppercase cursor-pointer hover:scale-110 active:scale-105 font-bold text-sm md:text-base"
              onClick={async () => {
                if (isAuthenticated) {
                  await signOut();
                  navigate("/");
                  return;
                }
                await signIn();
              }}
            >
              {isAuthenticated ? "Log Out" : "Log in"}
            </button>
          </div>
        </nav>
      </header>
      <ToggleMenu isMobile={true} />
    </>
  );
}

const ToggleMenu = ({ isMobile }: { isMobile: boolean }) => {
  const {
    auth: { user, isAuthenticated },
  } = usePuter();

  return (
    <div
      className={`items-center text-gray-400 font-semibold text-sm
              ${
                isMobile
                  ? "fixed bottom-0 left-0 w-full text-xs bg-[#0F1930]/80 backdrop-blur-sm z-50 py-3 justify-around flex md:hidden"
                  : "gap-6 hidden md:flex"
              }
              `}
    >
      {NAV_LINKS.map(({ href, title, icon }, idx) => (
        <NavLink key={idx} title={title} href={href} icon={icon} />
      ))}
      {isAuthenticated && (
        <div className="flex flex-col items-center gap-1 text-white">
          <CircleUserRound className="size-5 block md:hidden"/>
          <p>{user?.username ?? "Unknown"}</p>
        </div>
      )}
    </div>
  );
};

const NavLink = ({
  title,
  href,
  icon: Icon,
}: {
  title: string;
  href: string;
  icon: LucideIcon;
}) => {
  const location = useLocation();
  const isActive = href === location.pathname;
  return (
    <Link
      className={`relative group flex flex-col items-center hover:text-white gap-1 ${isActive ? "text-white" : ""}`}
      to={href}
    >
      <Icon className="size-5 block md:hidden" />
      <p>{title}</p>
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

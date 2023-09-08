"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Settings, LogOut, Home } from "react-feather";
import { useSelector } from "react-redux";
import { logoutUser } from "@/backend/auth.api";
import { setCookie } from "nookies";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await logoutUser();
    localStorage.clear();
    setCookie(null, "userId", "");

    router.push("/");
  };

  const userAuth = useSelector((state: any) => state.auth);

  return (
    <nav className="w-full sticky top-0 shadow-md py-2 dark:shadow-gray-600">
      <div className="max-w-screen-lg mx-auto flex items-center content-center justify-between  h-12">
        <Link href={userAuth.creds?.userId ? "/feed" : "/"}>
          <Image
            className="navbar-brand fw-bold w-10 h-10 cursor pointer mx-4"
            src={"/assets/logo.png"}
            alt="settings"
            width={100}
            height={100}
          />
        </Link>

        <div className="flex gap-8">
          {pathname !== "/feed" && (
            <Link href="/feed">
              <Home
                size={20}
                className="transition-all duration-300 text-black dark:text-white  hover:text-primary"
              />
            </Link>
          )}

          <Link href={`/user/${userAuth.creds?.userId}`}>
            <Settings
              size={20}
              className="transition-all duration-300 text-black dark:text-white  hover:text-primary"
            />
          </Link>

          <LogOut
            size={20}
            className="transition-all duration-300 text-black dark:text-white  hover:text-primary cursor-pointer"
            onClick={logout}
          />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

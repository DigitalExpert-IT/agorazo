import Link from "next/link";
import { User, LogOut, LogIn, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "components/ui";

interface ProfileNavbarProps {
  user: {
    email?: string;
    name?: string;
    image?: string;
  } | null;
  token?: string;
  expires?: string;
  onOpen: boolean;
  logOut: () => void;
}

export const ProfileNavbar: React.FC<ProfileNavbarProps> = ({
  user,
  onOpen,
  logOut,
}) => {
  const isAuthenticated = !!(user && user.email);

  return (
    <div
      className={`dropdown-menu absolute end-0 m-0 mt-4 z-10 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 ${
        onOpen ? "block" : "hidden"
      }`}
    >
      <div className="relative">
        <div className="py-8 bg-gradient-to-tr from-violet-600 to-red-600"></div>

        <div className="absolute px-4 -bottom-7 start-0">
          <div className="flex items-end">
            {isAuthenticated && (
              <Avatar className="hover:cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>

      <ul className="py-4 text-start">
        {isAuthenticated ? (
          <>
            <li className="mt-5">
              <Link
                href=""
                className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600 dark:text-white"
                passHref
              >
                <Mail className="text-[16px] align-middle me-1" />
                <span className="max-w-[120px] mt-1 truncate ">
                  {user?.email}
                </span>
              </Link>
            </li>
            <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
            <li>
              <div
                className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600 hover:cursor-pointer dark:text-white"
                onClick={() => logOut()}
              >
                <LogOut className="text-[16px] align-middle me-1" />
                <span>Logout</span>
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="mt-2">
              <Link
                href="/login"
                className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"
                passHref
              >
                <LogIn className="text-[16px] align-middle me-1" /> Login
              </Link>
            </li>
            <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
            <li>
              <Link
                href="/signup"
                className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"
                passHref
              >
                <User className="text-[16px] align-middle me-1" /> Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

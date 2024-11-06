import Link from "next/link";
import { useState } from "react";
import SimpleBarReact from "simplebar-react";
import { FileImage, Airplay, Layers, LogIn, Users, File } from "lucide-react";

export const Navbar = () => {
  const [manu] = useState("");
  const [subManu, setSubManu] = useState("");

  return (
    <nav id="sidebar" className="sidebar-wrapper">
      <div className="sidebar-content">
        <div className="sidebar-brand">
          <Link href="/index">
            <img
              src="/assets/images/logo-dark.png"
              height="24"
              className="block dark:hidden"
              alt=""
            />
            <img
              src="/assets/images/logo-light.png"
              height="24"
              className="hidden dark:block"
              alt=""
            />
          </Link>
        </div>
        <SimpleBarReact style={{ height: "calc(100% - 70px)" }}>
          <ul
            className="sidebar-menu border-t dark:border-white/10 border-gray-100"
            data-simplebar
            style={{ height: "calc(100% - 70px)" }}
          >
            <li className={["", "index"].includes(manu) ? "active" : ""}>
              <Link href="/index">
                <Airplay className="size-4 me-3" />
                Dashboard
              </Link>
            </li>

            <li
              className={`sidebar-dropdown ${
                ["explore", "item-detail", "upload-work"].includes(manu)
                  ? "active"
                  : ""
              }`}
            >
              <Link
                href="#"
                onClick={() => {
                  setSubManu(subManu === "explore-item" ? "" : "explore-item");
                }}
              >
                <FileImage className="size-4 me-3" />
                Explore Items
              </Link>
              <div
                className={`sidebar-submenu ${
                  [
                    "explore",
                    "item-detail",
                    "upload-work",
                    "explore-item",
                  ].includes(subManu)
                    ? "block"
                    : ""
                }`}
              >
                <ul>
                  <li className={manu === "explore" ? "active" : ""}>
                    <Link href="/explore">Explore</Link>
                  </li>
                  <li className={manu === "item-detail" ? "active" : ""}>
                    <Link href="/item-detail">Item Detail</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li
              className={`sidebar-dropdown ${
                [
                  "creators",
                  "creator-profile",
                  "creator-profile-setting",
                  "become-creator",
                ].includes(manu)
                  ? "active"
                  : ""
              }`}
            >
              <Link
                href="#"
                onClick={() => {
                  setSubManu(subManu === "creator-item" ? "" : "creator-item");
                }}
              >
                <Users className="size-4 me-3" />
                Creators
              </Link>
              <div
                className={`sidebar-submenu ${
                  [
                    "creators",
                    "creator-profile",
                    "creator-profile-setting",
                    "become-creator",
                    "creator-item",
                  ].includes(subManu)
                    ? "block"
                    : ""
                }`}
              >
                <ul>
                  <li className={manu === "creators" ? "active" : ""}>
                    <Link href="/creators">Creators</Link>
                  </li>
                  <li className={manu === "creator-profile" ? "active" : ""}>
                    <Link href="/creator-profile">Profile</Link>
                  </li>
                  <li
                    className={
                      manu === "creator-profile-setting" ? "active" : ""
                    }
                  >
                    <Link href="/creator-profile-setting">Profile Setting</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li
              className={`sidebar-dropdown ${
                ["starter", "faqs", "privacy", "terms"].includes(manu)
                  ? "active"
                  : ""
              }`}
            >
              <Link
                href="#"
                onClick={() => {
                  setSubManu(subManu === "page-item" ? "" : "page-item");
                }}
              >
                <File className="size-4 me-3" />
                Pages
              </Link>
              <div
                className={`sidebar-submenu ${
                  ["starter", "faqs", "privacy", "terms", "page-item"].includes(
                    subManu
                  )
                    ? "block"
                    : ""
                }`}
              >
                <ul>
                  <li className={manu === "faqs" ? "active" : ""}>
                    <Link href="/faqs">FAQs</Link>
                  </li>
                  <li className={manu === "privacy" ? "active" : ""}>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                  <li className={manu === "terms" ? "active" : ""}>
                    <Link href="/terms">Term & Condition</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li
              className={`sidebar-dropdown ${
                [
                  "login",
                  "signup",
                  "signup-success",
                  "reset-password",
                  "lock-screen",
                ].includes(manu)
                  ? "active"
                  : ""
              }`}
            >
              <Link
                href="#"
                onClick={() => {
                  setSubManu(subManu === "auth-item" ? "" : "auth-item");
                }}
              >
                <LogIn className="size-4 me-3" />
                Authentication
              </Link>
              <div
                className={`sidebar-submenu ${
                  [
                    "login",
                    "signup",
                    "signup-success",
                    "reset-password",
                    "lock-screen",
                    "auth-item",
                  ].includes(subManu)
                    ? "block"
                    : ""
                }`}
              >
                <ul>
                  <li className={manu === "login" ? "active" : ""}>
                    <Link href="/login">Login</Link>
                  </li>
                  <li className={manu === "signup" ? "active" : ""}>
                    <Link href="/signup">Signup</Link>
                  </li>
                  <li className={manu === "signup-success" ? "active" : ""}>
                    <Link href="/signup-success">Signup Success</Link>
                  </li>
                  <li className={manu === "reset-password" ? "active" : ""}>
                    <Link href="/reset-password">Reset Password</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li
              className={`sidebar-dropdown ${
                ["comingsoon", "maintenance", "error", "thankyou"].includes(
                  manu
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link
                href="#"
                onClick={() => {
                  setSubManu(subManu === "error-item" ? "" : "error-item");
                }}
              >
                <Layers className="size-4 me-3" />
                Miscellaneous
              </Link>
              <div
                className={`sidebar-submenu ${
                  [
                    "comingsoon",
                    "maintenance",
                    "error",
                    "thankyou",
                    "error-item",
                  ].includes(subManu)
                    ? "block"
                    : ""
                }`}
              >
                <ul>
                  <li className={manu === "comingsoon" ? "active" : ""}>
                    <Link href="/comingsoon">Comingsoon</Link>
                  </li>
                  <li className={manu === "maintenance" ? "active" : ""}>
                    <Link href="/maintenance">Maintenance</Link>
                  </li>
                  <li className={manu === "error" ? "active" : ""}>
                    <Link href="/error">Error</Link>
                  </li>
                  <li className={manu === "thankyou" ? "active" : ""}>
                    <Link href="/thankyou">Thank You</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </SimpleBarReact>
      </div>
    </nav>
  );
};

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export const Switcher = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function changeMode(mode: string, _event: unknown) {
    switch (mode) {
      case "mode":
        if (document.documentElement.className.includes("dark")) {
          document.documentElement.className = "light";
        } else {
          document.documentElement.className = "dark";
        }
        break;

      default:
        break;
    }
  }
  return (
    <div className="fixed top-[30%] -end-3 z-50">
      <span className="relative inline-block rotate-90">
        <input
          type="checkbox"
          className="checkbox opacity-0 absolute"
          id="chk"
          onClick={event => changeMode("mode", event)}
        />
        <label
          className="label bg-slate-900 dark:bg-white shadow dark:shadow-gray-800 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8"
          htmlFor="chk"
        >
          <Moon className="text-[20px] text-yellow-500" />
          <Sun className="text-[20px] text-yellow-500" />
          <span className="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] size-7"></span>
        </label>
      </span>
    </div>
  );
};

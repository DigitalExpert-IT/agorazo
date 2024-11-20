import Link from "next/link";

export const Footer = () => {
  return (
    <footer>
      <div className="shadow dark:shadow-gray-700 bg-white dark:bg-slate-900 px-6 py-4">
        <div className="container-fluid">
          <div className="grid grid-cols-1">
            <div className="sm:text-start text-center mx-md-2">
              <p className="mb-0 text-slate-400">
                © {new Date().getFullYear()} Zenq. Design & Develop With{" "}
                <i className="mdi mdi-heart text-red-600"></i> by{" "}
                <Link
                  href="https://shreethemes.in/"
                  target="_blank"
                  className="text-reset"
                >
                  Shreethemes
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

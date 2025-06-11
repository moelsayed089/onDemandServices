import { Link } from "react-router-dom";

const ErrorHandler = () => {
  return (
    <>
      <section>
        <main className="grid place-items-center bg-white  px-6 py-24 sm:py-32 lg:px-8  min-h-screen">
          <div className="text-center ">
            <p className="text-heading-4 font-semibold text-main-color">404</p>
            <h1 className="mt-4 text-body-xl font-semibold tracking-tight text-gray-color sm:text-heading-1">
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-main-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-main-color/90 focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Go back home
                <span className="ml-3" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default ErrorHandler;

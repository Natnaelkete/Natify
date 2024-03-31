import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <>
        <div className="h-screen w-screen  flex items-center">
          <div className="container flex flex-col md:flex-row items-center justify-between px-5 ">
            <div className="w-full lg:w-1/2 mx-8">
              <div className="text-7xl text-green-500 font-dark font-extrabold mb-8">
                {" "}
                404
              </div>
              <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
                Sorry we couldn&apos;t find the page you&apos;re looking for
              </p>

              <Link
                to="/"
                className="px-5 btn btn-success inline py-3 text-sm font-semibold  leading-5 shadow-2xl  transition-all duration-400 border border-transparent rounded-lg focus:outline-none "
              >
                back to homepage
              </Link>
            </div>
            <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
              <img
                src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
                className=""
                alt="Page not found"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <main className="flex flex-col h-screen items-center gap-4 mt-[100px]">
      <h2 className="text-4xl font-semibold">Error Occurred</h2>

      <Link to="/">
        <button className="btn btn-primary">back to Home</button>
      </Link>
    </main>
  );
}

export default Error;

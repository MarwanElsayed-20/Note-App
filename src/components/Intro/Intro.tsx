import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import { useEffect } from "react";

const Intro: React.FunctionComponent<{}> = () => {
  const { token } = useSelector((state: RootState) => state.User);
  console.log(token);

  useEffect(() => {}, [token]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Intro</title>
      </Helmet>
      <section className="relative">
        <div className="container max-w-screen-xl px-4 c">
          <div className="bg-white flex justify-center items-center flex-col rounded-lg px-12 py-12 md:py-5 min-h-[calc(100vh-2.5rem)]">
            <h1 className="w-full text-center">Welcome to your notes.</h1>
            <div className="flex">
              {token === "null" ? (
                <>
                  <p className="me-5">
                    <Link to="/register">Do not have an account ? Sign Up</Link>
                  </p>
                  <p>
                    <Link to="/login">You already have account ? Sign in</Link>
                  </p>
                </>
              ) : (
                <>
                  <p className="me-5">
                    <Link to="/home">
                      You already login. <span>Go home</span>
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;

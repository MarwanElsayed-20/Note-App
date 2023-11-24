import { Helmet } from "react-helmet";
import notFoundImg from "../assets/page-not-found.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NotFound: React.FunctionComponent<{}> = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
      </Helmet>
      <section className="relative">
        <div className="container max-w-screen-xl px-4 c">
          <div className="bg-white flex justify-center items-center rounded-lg px-12 py-12 md:py-5 min-h-[calc(100vh-2.5rem)]">
            <h1>Page not found</h1>
            <LazyLoadImage
              src={notFoundImg}
              alt="registerImg"
              width={576}
              height={576}
              placeholderSrc={notFoundImg}
              effect="blur"
              className="w-100"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;

import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/LoginSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { isLogin } from "../../Redux/UserSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import "react-lazy-load-image-component/src/effects/blur.css";

import loginImg from "../../assets/login.jpg";

const Login: React.FunctionComponent<{}> = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.Login);

  interface LoginFormValues {
    email: string;
    password: string;
  }

  const onSubmit = async (values: LoginFormValues) => {
    await dispatch(login(values))
      .then(unwrapResult)
      .then((result) => {
        toast.success("Logged in successfully!");
        localStorage.setItem("userToken", `3b8ny__${result.data.token}`);
        dispatch(isLogin(`3b8ny__${result.data.token}`));
        console.log(result.data.token);
        navigate("/home");
        window.location.reload();
      })
      .catch((result) => {
        toast.error(result);
      });
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid")
      .matches(
        /([a-z0-9][-a-z0-9_+.]*[a-z0-9])@([a-z0-9][-a-z0-9.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))/,
        "your email must be a valid and real email"
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        "Your password must contain a special character, a number,and a capital character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <section>
        <div className="container max-w-screen-xl px-4">
          <div className="columns-2 md:columns-1 bg-white flex justify-center items-center rounded-lg px-12 py-12 md:py-5">
            <div className="w-6/12 hidden md:block">
              <LazyLoadImage
                src={loginImg}
                alt=""
                width={576}
                height={576}
                placeholderSrc={loginImg}
                effect="blur"
                className="w-100"
              />
            </div>
            <div className="w-full md:w-6/12 flex items-center justify-center flex-col">
              <h1>Login</h1>
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="w-full mb-5 flex ">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.email && formik.touched.email ? (
                  <p className="mb-5 pointer-events-none bg-red-300 text-white mt-0 rounded-full p-4 w-full block center">
                    {formik.errors.email}
                  </p>
                ) : (
                  ""
                )}
                <div className="w-full mb-5 flex">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <p className="mb-5 pointer-events-none bg-red-300 text-white mt-0 rounded-full p-4 w-full block center">
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}
                <button
                  type="submit"
                  className="bg-background-color flex justify-center items-center"
                >
                  {loading ? (
                    <Oval
                      height={20}
                      width={20}
                      color="rgb(230 230 230)"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="rgb(70 200 249)"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <p>
                <Link to="/register">Do not have an account ? Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;

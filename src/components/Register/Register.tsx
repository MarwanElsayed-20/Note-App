import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { register } from "../../Redux/RegisterSlice";
import { useDispatch } from "react-redux";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import * as yup from "yup";
import "react-lazy-load-image-component/src/effects/blur.css";

import registerImg from "../../assets/signup.jpg";
import { unwrapResult } from "@reduxjs/toolkit";

const Register: React.FunctionComponent<{}> = () => {
  let navigate = useNavigate();

  let { loading } = useSelector((state: RootState) => state.Register);

  useSelector((state: RootState) => state.Register);

  const dispatch = useDispatch<AppDispatch>();

  interface RegisterFormValue {
    name: string;
    email: string;
    password: string;
    age: string;
    phone: string;
  }

  const onSubmit = async (values: RegisterFormValue) => {
    await dispatch(register(values))
      .then(unwrapResult)
      .then(() => {
        toast.success("Your account created successfully!");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((result) => {
        toast.error(result);
      });
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Minimum length is 5 characters")
      .max(10, "Max length is 10 characters")
      .matches(/^[a-zA-Z]+$/, "Your name should only contain characters"),
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
    age: yup.number().required().positive().integer(),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^01[0-2,5]\d{8}$/,
        "Your phone must start with 010 / 011 / 012 / 015 and must be 11 numbers"
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <section>
        <div className="container max-w-screen-xl px-4">
          <div className="columns-2 md:columns-1 bg-white flex justify-center items-center rounded-lg px-12 py-8 md:py-8">
            <div className="w-6/12 hidden md:block">
              <LazyLoadImage
                src={registerImg}
                alt="registerImg"
                width={576}
                height={576}
                placeholderSrc={registerImg}
                effect="blur"
                className="w-100"
              />
            </div>
            <div className="w-full md:w-6/12 flex items-center justify-center flex-col">
              <h1>Sign Up</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="w-full mb-5 flex ">
                  <i className="fa-solid fa-signature"></i>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.name && formik.touched.name ? (
                  <p className="mb-5 pointer-events-none bg-red-300 text-white mt-0 rounded-full p-4 w-full block center">
                    {formik.errors.name}
                  </p>
                ) : (
                  ""
                )}
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
                <div className="w-full mb-5 flex">
                  <i className="fa-solid fa-arrow-up-9-1"></i>
                  <input
                    type="text"
                    name="age"
                    id="age"
                    placeholder="Age"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.age && formik.touched.age ? (
                  <p className="mb-5 pointer-events-none bg-red-300 text-white mt-0 rounded-full p-4 w-full block center">
                    {formik.errors.age}
                  </p>
                ) : (
                  ""
                )}
                <div className="w-full mb-5 flex">
                  <i className="fa-solid fa-phone"></i>
                  <input
                    type="tele"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.phone && formik.touched.phone ? (
                  <p className="mb-5 pointer-events-none bg-red-300 text-white mt-0 rounded-full p-4 w-full block center">
                    {formik.errors.phone}
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
                    "Sign up"
                  )}
                </button>
              </form>
              <p>
                <Link to="/login">You already have account ? Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Register;

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { hidden, updateNote } from "../../Redux/UpdateNoteSlice";
import * as yup from "yup";
import { useFormik } from "formik";
import { Oval } from "react-loader-spinner";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getNotes } from "../../Redux/NoteSlice";

const UpdateNote: React.FunctionComponent<{}> = () => {
  const { display, loading, id } = useSelector(
    (state: RootState) => state.UpdateNote
  );
  const dispatch = useDispatch<AppDispatch>();

  interface UpdateNoteValues {
    title: string;
    content: string;
  }

  const onSubmit = async (values: UpdateNoteValues) => {
    await dispatch(updateNote({ values, id }))
      .then(unwrapResult)
      .then(() => {
        toast.success("Note updated successfully!");
        dispatch(hidden());
        formik.resetForm({ values: { title: "", content: "" } });
        dispatch(getNotes());
      })
      .catch((result) => {
        toast.error(result);
      });
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div
        className={`bg-black/30 top-0 left-0 right-0 bottom-0 absolute ${display} z-[999]`}
        onClick={() => {
          dispatch(hidden());
        }}
      ></div>
      <div
        className={`flex flex-col justify-center items-center bg-white rounded-lg md:w-2/4 w-9/12 p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${display} z-[999]`}
      >
        <h2 className="mb-4">Update Note</h2>
        <form action="" className="w-full m-0" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className=" rounded-lg mb-4 "
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && formik.touched.title ? (
            <p className="mb-5 pointer-events-none bg-red-300 text-white mt-0 rounded-lg p-4 w-full block center">
              {formik.errors.title}
            </p>
          ) : (
            ""
          )}
          <textarea
            name="content"
            id="content"
            placeholder="Your Note Description"
            className=" rounded-lg mb-4 h-40"
            onChange={formik.handleChange}
            value={formik.values.content}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.errors.content && formik.touched.content ? (
            <p className="mb-5 pointer-events-none bg-red-300 text-white mt-0 rounded-lg p-4 w-full block center">
              {formik.errors.content}
            </p>
          ) : (
            ""
          )}
          <div className="flex w-full">
            <button
              className="rounded-lg me-4 bg-main-color text-white hover:bg-main-color/75 flex-grow flex justify-center items-center"
              type="submit"
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
                "Update"
              )}
            </button>
            <button
              className="rounded-lg hover:bg-background-color/75 hover:text-text-color"
              onClick={() => {
                dispatch(hidden());
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateNote;

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { getNotes, hidden } from "../../Redux/NoteSlice";
import { useFormik } from "formik";
import { Oval } from "react-loader-spinner";
import { addNote } from "../../Redux/AddNoteSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import * as yup from "yup";

const AddNote: React.FunctionComponent<{}> = () => {
  const { display } = useSelector((state: RootState) => state.note);
  const { loading } = useSelector((state: RootState) => state.AddNote);
  const dispatch = useDispatch<AppDispatch>();

  interface AddNoteValues {
    title: string;
    content: string;
  }

  const onSubmit = async (values: AddNoteValues) => {
    await dispatch(addNote(values))
      .then(unwrapResult)
      .then(() => {
        toast.success("Note added successfully!");
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
        className={`flex flex-col justify-center items-center bg-white rounded-lg w-2/4 p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${display} z-[999]`}
      >
        <h2 className="mb-4">Add note</h2>
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
            placeholder="Your Note content"
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
                "Add"
              )}
            </button>
            <button
              className="rounded-lg hover:bg-background-color/75 hover:text-text-color"
              type="submit"
              onClick={() => {
                dispatch(hidden());
                formik.resetForm({
                  values: { title: "", content: "" },
                });
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

export default AddNote;

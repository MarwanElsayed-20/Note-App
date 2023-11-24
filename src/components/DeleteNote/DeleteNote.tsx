import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { deleteNote, hidden } from "../../Redux/DeleteNoteSlice";
import { Oval } from "react-loader-spinner";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getNotes } from "../../Redux/NoteSlice";

const DeleteNote: React.FunctionComponent<{}> = () => {
  const { display, loading } = useSelector(
    (state: RootState) => state.DeleteNote
  );
  const { id } = useSelector((state: RootState) => state.note);
  const dispatch = useDispatch<AppDispatch>();

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
        <h2 className="mb-4">Are you sure ?</h2>
        <p className=" pointer-events-none mb-4">
          You won't be able to revert this.
        </p>
        <div className="flex w-full">
          <button
            className="rounded-lg me-4 bg-red-700 text-white hover:bg-red-700/75 flex-grow flex justify-center items-center"
            onClick={() => {
              dispatch(deleteNote(id))
                .then(unwrapResult)
                .then(() => {
                  toast.success("Note deleted successfully!");
                  dispatch(hidden());
                  dispatch(getNotes());
                })
                .catch((result) => {
                  toast.error(result);
                });
            }}
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
              "Delete"
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
      </div>
    </>
  );
};

export default DeleteNote;

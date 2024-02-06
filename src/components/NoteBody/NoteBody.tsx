import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUpdateId, visible } from "../../Redux/UpdateNoteSlice";
import { visible as DeleteVisible } from "../../Redux/DeleteNoteSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { getNotes, setId, setNotesCount } from "../../Redux/NoteSlice";
import Loading from "../Loading/Loading";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";

import NoNotesFoundImg from "../../assets/no-notes.jpg";

const NoteBody: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, notesCount } = useSelector(
    (state: RootState) => state.note
  );

  interface note {
    _id: string;
    title: string;
    content: string;
  }

  useEffect(() => {
    if (data) {
      dispatch(getNotes())
        .then(unwrapResult)
        .then((result) => {
          dispatch(setNotesCount(result.notes.length));
        })
        .catch(() => {
          toast.error("No notes found!");
        });
    }
  }, []);

  return (
    <>
      <h2 className="m-4 pb-4 border-b-2 relative z-50">My notes</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          {notesCount ? (
            <div className="lg:grid lg:max-xl:lg:grid-cols-2 lg:grid-cols-3 lg:gap-4 p-4 h-[calc(100vh-11rem)] overflow-y-scroll">
              {data?.map((note: note) => (
                <div
                  className="shadow-md py-8 px-4 relative break-words lg:mb-0 mb-4"
                  key={note._id}
                >
                  <i className="fa-solid fa-thumbtack absolute bg-transparent p-0 rounded-none left-2/4 top-0"></i>
                  <h2>{note.title}</h2>
                  <p className="pointer-events-none">{note.content}</p>
                  <div className="mt-2">
                    <i
                      className="fa-regular fa-pen-to-square bg-transparent p-0 rounded-none me-2 cursor-pointer hover:text-main-color transition ease-in-out duration-300"
                      onClick={() => {
                        dispatch(visible());
                        dispatch(setUpdateId(note._id));
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-trash-can bg-transparent p-0 rounded-none cursor-pointer hover:text-main-color transition ease-in-out duration-300"
                      onClick={() => {
                        dispatch(DeleteVisible());
                        dispatch(setId(note._id));
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <LazyLoadImage
                src={NoNotesFoundImg}
                alt="registerImg"
                width={400}
                height={400}
                placeholderSrc={NoNotesFoundImg}
                effect="blur"
                className="w-100"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NoteBody;

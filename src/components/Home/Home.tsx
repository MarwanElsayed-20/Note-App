import { Helmet } from "react-helmet";
import SideBar from "../SideBar/SideBar";
import AddNote from "../AddNote/AddNote";
import NoteBody from "../NoteBody/NoteBody";
import UpdateNote from "../UpdateNote/UpdateNote";
import DeleteNote from "../DeleteNote/DeleteNote";

const Home: React.FunctionComponent<{}> = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <section className="relative">
        <div className="container max-w-screen-xl px-4 c">
          <div className="columns-2 bg-white flex justify-start items-center rounded-lg px-12 py-12 md:py-5 min-h-[calc(100vh-2.5rem)]">
            <div className="w-1/4 border-e-2 pe-12 h-[calc(100vh-5rem)]">
              <SideBar />
            </div>
            <div className="relative w-full min-h-[calc(100vh-5rem)]">
              <NoteBody />
            </div>
          </div>
        </div>
        <AddNote />
        <UpdateNote />
        <DeleteNote />
      </section>
    </>
  );
};

export default Home;

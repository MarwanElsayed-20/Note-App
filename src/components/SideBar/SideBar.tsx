import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { visible } from "../../Redux/NoteSlice";
import { AppDispatch } from "../../Redux/Store";
import { isLogin } from "../../Redux/UserSlice";

const SideBar: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logOut = (): void => {
    localStorage.removeItem("userToken");
    dispatch(isLogin(""));
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <h1 className="my-4">
        Welcome <span className="text-[4rem]">Marwan</span>
      </h1>
      <button
        className="py-4 text-white-color bg-main-color"
        onClick={() => dispatch(visible())}
      >
        <i className="fa-solid fa-plus p-0 bg-transparent rounded-none me-2.5 text-white-color"></i>
        Add Note
      </button>
      <ul>
        <li>
          <NavLink to="/home" className="no-underline p-4 active rounded-full">
            <i className="fa-solid fa-house p-0 bg-transparent rounded-none me-2.5"></i>{" "}
            Home
          </NavLink>
        </li>
        <li>
          <div
            className="no-underline p-4 rounded-full cursor-pointer"
            onClick={() => {
              logOut();
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket p-0 bg-transparent rounded-none me-2.5"></i>{" "}
            Logout
          </div>
        </li>
      </ul>
    </>
  );
};

export default SideBar;

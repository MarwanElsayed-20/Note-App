import { Outlet } from "react-router-dom";

const Layout: React.FunctionComponent<{}> = () => {
  return (
    <>
      <main className="relative overflow-hidden">
        <Outlet />
      </main>
    </>
  );
};
export default Layout;

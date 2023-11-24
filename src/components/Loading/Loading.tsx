const Loading: React.FunctionComponent<{}> = () => {
  return (
    <>
      <div className=" absolute top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center">
        <svg
          className="animate-spin bg-main-color h-5 w-5 ..."
          viewBox="0 0 24 24"
        ></svg>
      </div>
    </>
  );
};

export default Loading;

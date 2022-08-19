const FooterSmall = (props) => {
  return (
    <>
      <footer
        className={"absolute w-full bottom-0 mt-10 pb-6"}
      >
        <div className="container mx-auto px-4">
          <hr className="mt-10 mb-6 border-b-1" />
          <div className="flex flex-wrap content-center items-center justify-center">
            <div className="w-full px-4">
              <div className="text-sm text-blueGray-600 font-semibold py-1 text-center">
                <a
                  href="#/"
                  className="hover:text-blueGray-500 text-sm font-semibold py-1"
                >
                  Copyright © {new Date().getFullYear()} GA Group Inc. All
                  Rights Reserved.
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSmall;

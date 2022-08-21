const FooterSmall = (props) => {
  return (
    <>
      <footer
        className={"absolute w-full bottom-0"}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap content-center items-center justify-center">
            <div className="w-full px-4">
              <div className="text-sm text-slate-600 font-semibold py-1 text-center">
                <a
                  href="#/"
                  className="hover:text-slate-500 text-sm font-semibold py-1"
                >
                  Copyright © {new Date().getFullYear()}. All
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

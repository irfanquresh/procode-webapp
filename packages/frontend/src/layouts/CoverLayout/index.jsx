// components
import PageLayout from "layouts/PageLayout";
import SimpleNavbar from "components/Navbars/SimpleNavbar";
import SimpleFooter from "components/Footers/SimpleFooter";

function CoverLayout({ children }) {
  return (
    <PageLayout>
      <SimpleNavbar />
      <main>
        <section className="relative w-full h-full py-30 bg-white-50 min-h-screen">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-8/12 px-1">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg border-0">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <SimpleFooter />
        </section>
      </main>
    </PageLayout>
  );
}

export default CoverLayout;

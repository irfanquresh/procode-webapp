import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// layout and components
import CoverLayout from "layouts/CoverLayout";
import ScrollWrapper from "components/ScrollWrapper";
import Alert from "components/Alert";
import FormInput from "components/Form/FormInput";
import AssessmentView from "./AssessmentView";
import { DisplayLabel } from "views/promo/PromoView";

// Store
import { useGetTestQuery } from "store/test-library/testApiSlice";
import { selectTest, setTest, setTests } from "store/test-library/testSlice";
import { exportToAdvCSV } from "utils/file.util";

const Test = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stage, setStage] = useState("");

  const { id } = useParams();
  const { data: testData } = useGetTestQuery(id);

  useEffect(() => {
    dispatch(setTest(testData));
  }, [testData]);

  if (testData) {
    return (
      <CoverLayout>
        <div className="mx-auto w-full">
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                {!stage ? (
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <h1 className="text-slate-500 text-5xl font-bold">
                      {testData?.title ?? ""}
                    </h1>
                    <p className="max-w-xl justify-content text-justify">
                      The Front End Developer Online Test is preferred by recruiters
                      to assess on-the-job skills of candidates before an interview.
                      It reduces technical screening time by 80% by enabling
                      employers to identify qualified candidates.
                    </p>
                    <div className="mt-2 w-full">
                      <h3 className="text-slate-500 mt-2">Covered Skills:</h3>
                      <ul className="list-disc ml-5">
                        <li className="is-size-6">HTML5</li>
                        <li className="is-size-6">AngularJS Application</li>
                        <li className="is-size-6">JQuery - Application</li>
                        <li className="is-size-6">CSS</li>
                        <li className="is-size-6">Bootstrap - Application</li>
                      </ul>
                    </div>

                    <div className="w-full mt-5">
                      <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                          className="text-white text-sm font-bold bg-sky-500 active:bg-sky-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setStage("start")}
                        >
                          Start Assessment
                        </button>
                      </div>
                    </div>
                  </div>
                ) : stage === "start" ? (
                  <AssessmentView
                    formData={{ test: testData }}
                    onClick={() => {
                      setStage("finish");
                      console.log("FINISHED !!!");
                    }}
                  />
                ) : stage === "finish" ? (
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <h1 className="text-slate-500 text-5xl font-bold">
                      Assessment {testData?.title ?? ""} Completed !!!
                    </h1>

                    <div className="w-full mt-5">
                      <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                          className="text-white text-sm font-bold bg-sky-500 active:bg-sky-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => navigate("/test")}
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </CoverLayout>
    );
  } else {
    return <DisplayLabel message="Records not found !!!" />;
  }
};

export default Test;

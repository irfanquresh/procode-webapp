import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

// layout and components
import CoverLayout from "layouts/CoverLayout";
import ScrollWrapper from "components/ScrollWrapper";
import Alert from "components/Alert";
import TestView, { DisplayLabel } from "./TestView";
import FormInput from "components/Form/FormInput";

// Store
import {
  useGetAllTestsQuery,
  useGetTestsQuery,
} from "store/test-library/testApiSlice";
import { selectTest, setTest, setTests } from "store/test-library/testSlice";
import { exportToAdvCSV } from "utils/file.util";

const Test = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState();
  const [keyword, setKeyword] = useState();
  const [isExport, setIsExport] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [testObj, setTestObj] = useState();

  const testList = useSelector(selectTest);

  const { data: testData, isLoading: isLoadingTest } = useGetTestsQuery({
    pageNumber: page ?? 1,
    keyword: keyword ?? "",
  });

  const {
    data: exportedData,
    refetch: refetchTest,
    isFetching: isFetchingExp,
    isLoading: isLoadingExp,
  } = useGetAllTestsQuery({}, { skip: !isExport });

  useEffect(() => {
    if (testData) {
      dispatch(setTests(testData));
    }
    if (testData?.count) {
      setCount(testData?.count);
    }
    if (testData?.total) {
      setTotal(testData?.total);
    }
  }, [dispatch, testData]);

  useEffect(() => {
    if (exportedData && exportedData?.data?.length) {
      const { heading, header, data } = exportedData;

      const wscols = [
        { wch: Math.max(...data.map((t) => t.title.length)) },
        { wch: Math.max(...data.map((t) => t.slug.length)) },
        {
          wch: Math.max(...data.map((t) => JSON.stringify(t.questions)?.length)),
        },
      ];

      exportToAdvCSV(heading, header, data, "test_library_xlsx", wscols);
    }
  }, [exportedData, isLoadingExp, isFetchingExp]);

  const handleNext = () => {
    try {
      const thePageNum = page;
      if (thePageNum < total) {
        setPage(thePageNum + 1);
      }
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return (
    <CoverLayout>
      <div className="mx-auto w-full">
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex">
                  <div className="grow-0 lg:pr-5">
                    <h1 className="text-slate-400 text-lg lg:text-3xl font-bold">
                      Test Library
                    </h1>
                  </div>
                  <div className="grow pr-1">
                    <FormInput
                      type="text"
                      name="keyword"
                      placeholder="Search"
                      onChange={(e) => {
                        setPage(1);
                        setKeyword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex-none grow-0">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <button
                        className="text-white text-sm font-bold bg-sky-500 active:bg-sky-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => {
                          if (isExport === true) {
                            refetchTest();
                          } else {
                            setIsExport(true);
                          }
                        }}
                      >
                        <i className="fas fa-file-export pr-2"></i>Export
                      </button>
                    </div>
                  </div>
                </div>
                {alertMessage ? (
                  <Alert
                    message={alertMessage}
                    colour="red"
                    onClose={() => setAlertMessage("")}
                  />
                ) : null}
              </div>

              <div className="block w-full overflow-x-auto">
                <ScrollWrapper onScroll={handleNext}>
                  <TestView
                    data={testList}
                    loading={isLoadingTest}
                    onClick={(data) => {
                      dispatch(setTest(data));
                      setTestObj(data);
                      navigate("/assessment/" + data?.id);
                    }}
                  />
                </ScrollWrapper>
                <DisplayLabel message={`Total Record Count: ${count ?? 0}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoverLayout>
  );
};

export default Test;

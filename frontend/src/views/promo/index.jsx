import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

// layout and components
import CoverLayout from "layouts/CoverLayout";
import ScrollWrapper from "components/Form/ScrollWrapper";
import Alert from "components/Alert";
import PromoForm from "./PromoForm";
import PromoView, { DisplayLabel } from "./PromoView";

// Store
import { useGetBrandQuery } from "store/brand/brandApiSlice";
import { useGetProductQuery } from "store/products/productApiSlice";
import {
  useGetAllPromosQuery,
  useGetPromosQuery,
  useCreatePromoMutation,
  useUpdatePromoMutation,
  useDeletePromoMutation,
} from "store/promo/promoApiSlice";
import {
  selectPromo,
  setPromo,
  setPromos,
  setCreatePromo,
  setUpdatePromo,
  setRemovePromo,
} from "store/promo/promoSlice";
import DrawerPanel from "components/DrawerPanel";
import FormInput from "components/Form/FormInput";
import { exportToAdvCSV } from "utils/file.util";

const Promo = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState();
  const [keyword, setKeyword] = useState();
  const [showForm, setShowForm] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [promoObj, setPromoObj] = useState();

  const promoList = useSelector(selectPromo);

  const { data: brandData } = useGetBrandQuery();
  const { data: productData } = useGetProductQuery();
  const { data: promoData, isLoading: isLoadingPromo } = useGetPromosQuery({
    pageNumber: page ?? 1,
    keyword: keyword ?? "",
  });

  const {
    data: exportedData,
    refetch: refetchPromo,
    isFetching: isFetchingExp,
    isLoading: isLoadingExp,
  } = useGetAllPromosQuery({}, { skip: !isExport });

  const [createPromo] = useCreatePromoMutation();
  const [updatePromo] = useUpdatePromoMutation();
  const [deletePromo] = useDeletePromoMutation();

  useEffect(() => {
    if (promoData) {
      dispatch(setPromos(promoData));
    }
    if (promoData?.count) {
      setCount(promoData?.count);
    }
    if (promoData?.total) {
      setTotal(promoData?.total);
    }
  }, [dispatch, promoData]);

  useEffect(() => {
    if (exportedData && exportedData?.data?.length) {
      const { heading, header, data } = exportedData;

      const wscols = [
        { wch: Math.max(...data.map((t) => t.title.length)) },
        { wch: Math.max(...data.map((t) => t.startDate.length)) },
        { wch: Math.max(...data.map((t) => t.endDate.length)) },
        { wch: Math.max(...data.map((t) => t.appliedOn.length)) },
        { wch: Math.max(...data.map((t) => t.buyBrandOrProduct.length)) },
        { wch: Math.max(...data.map((t) => t.offerProduct.length)) },
      ];

      exportToAdvCSV(heading, header, data, "buy_x_get_y_xlsx", wscols);
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

  const onSubmit = async (data) => {
    if (data?.id) {
      onUpdateSubmit(data);
    } else {
      onCreateSubmit(data);
    }
  };
  const onCreateSubmit = async (data) => {
    const res = await createPromo(data).unwrap();
    if (res && res?.id) {
      dispatch(setPromo(res));
      dispatch(setCreatePromo(res));
      setShowForm(false);
      setPromoObj(null);
      setCount((t) => t + 1);
    }
  };

  const onUpdateSubmit = async (data) => {
    const res = await updatePromo(data).unwrap();
    if (res && res?.id) {
      dispatch(setPromo(res));
      dispatch(setUpdatePromo(res));
      setShowForm(false);
      setPromoObj(null);
    }
  };

  const onDelete = async (data) => {
    if (data?.id) {
      const res = await deletePromo(data).unwrap();
      if (res?.status === "SUCCESS") {
        dispatch(setRemovePromo(data));
        setAlertMessage(res?.message);
        setCount((t) => t - 1);
      }
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
                      Buy X Get Y
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
                        className="text-white mr-1 text-sm font-bold bg-sky-500 active:bg-sky-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => {
                          setShowForm(true);
                          setPromoObj({});
                        }}
                      >
                        <i className="fas fa-plus pr-2"></i>Add New
                      </button>
                      <button
                        className="text-white text-sm font-bold bg-sky-500 active:bg-sky-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => {
                          if (isExport === true) {
                            refetchPromo();
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
                  <PromoView
                    data={promoList}
                    loading={isLoadingPromo}
                    onClick={(data) => {
                      setPromoObj(data);
                      setShowForm(true);
                    }}
                    onDelete={onDelete}
                  />
                </ScrollWrapper>
                <DisplayLabel message={`Total Record Count: ${count ?? 0}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-auto px-4 rounded-t">
        <DrawerPanel
          show={showForm}
          title={promoObj?.title ? promoObj?.title : "Create New"}
          onClose={() => {
            setShowForm(false);
            setPromoObj(null);
          }}
        >
          {showForm && promoObj ? (
            <PromoForm
              show={showForm}
              formData={{
                promo: promoObj,
                brand: brandData,
                product: productData,
              }}
              onSubmit={onSubmit}
            />
          ) : null}
        </DrawerPanel>
      </div>
    </CoverLayout>
  );
};

export default Promo;

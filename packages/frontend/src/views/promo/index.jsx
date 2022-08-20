import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

// layout and components
import CoverLayout from "layouts/CoverLayout";
import ScrollWrapper from "components/Form/ScrollWrapper";
import Alert from "components/Alert";
import PromoForm from "./PromoForm";
import PromoView from "./PromoView";

// Store
import { useGetBrandQuery } from "store/brand/brandApiSlice";
import { useGetProductQuery } from "store/products/productApiSlice";
import {
  useGetPromoQuery,
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

const Promo = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState();
  const [showForm, setShowForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumberTotal, setPageNumberTotal] = useState(0);
  const [promoObj, setPromoObj] = useState();

  const promoList = useSelector(selectPromo);
  // const promoCode = useSelector(selectPromoCode);
  // const strapiData = useSelector(selectStrapiContents);

  const { data: brandData, isLoading: isLoadingBrand } = useGetBrandQuery();
  const { data: productData, isLoading: isLoadingProd } = useGetProductQuery();
  const { data: promoData, isLoading: isLoadingPromo } = useGetPromosQuery({
    pageNumber,
  });
  const [createPromo, { isLoading: isLoadingCreate }] = useCreatePromoMutation();
  const [updatePromo, { isLoading: isLoadingUpdate }] = useUpdatePromoMutation();
  const [deletePromo, { isLoading: isLoadingDelete }] = useDeletePromoMutation();

  useEffect(() => {
    if (promoData) {
      console.log("🚀 ~ useEffect ~ promoData", promoData);
      dispatch(setPromos(promoData));
    }
    if (promoData?.total) {
      setPageNumberTotal(promoData?.total);
    }
  }, [dispatch, promoData]);

  const handleNext = () => {
    try {
      const thePageNum = pageNumber;
      console.log("🚀 ~ handleNext ~ pageNumberTotal", pageNumberTotal);
      console.log("🚀 ~ handleNext ~ thePageNum", thePageNum);
      if (thePageNum < pageNumberTotal) {
        setPageNumber(thePageNum + 1);
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
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h1 className="font-semibold text-base text-slate-700">
                      Buy X Get Y
                    </h1>
                  </div>
                  <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-sky-500 text-white active:bg-sky-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                        setShowForm(true);
                        setPromoObj({});
                      }}
                    >
                      <i className="fas fa-plus"></i> New Promo
                    </button>
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

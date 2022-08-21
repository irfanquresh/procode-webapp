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
import FormInput from "components/Form/FormInput";

const Promo = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState();
  const [keyword, setKeyword] = useState();
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [promoObj, setPromoObj] = useState();

  const promoList = useSelector(selectPromo);
  // const promoCode = useSelector(selectPromoCode);
  // const strapiData = useSelector(selectStrapiContents);

  const { data: brandData, isLoading: isLoadingBrand } = useGetBrandQuery();
  const { data: productData, isLoading: isLoadingProd } = useGetProductQuery();
  const { data: promoData, isLoading: isLoadingPromo } = useGetPromosQuery({
    pageNumber: page ?? 1,
    keyword: keyword ?? "",
  });
  const [createPromo, { isLoading: isLoadingCreate }] = useCreatePromoMutation();
  const [updatePromo, { isLoading: isLoadingUpdate }] = useUpdatePromoMutation();
  const [deletePromo, { isLoading: isLoadingDelete }] = useDeletePromoMutation();

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
                <div className="flex flex-wrap items-center">
                  <div className="relative px-4 md:flex-none">
                    <h1 className="font-semibold text-base text-slate-700">
                      Buy X Get Y
                    </h1>
                  </div>

                  <div className="relative px-4 flex-none md:flex-grow">
                    <div className="mb-2">
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
                  </div>
                  <div className="relative text-left flex-none">
                    <button
                      className="bg-sky-500 text-white active:bg-sky-600 text-sm font-bold uppercase px-3 py-2.5 rounded outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                        setShowForm(true);
                        setPromoObj({});
                      }}
                    >
                      <i className="fas fa-plus"></i>Add New Promo
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

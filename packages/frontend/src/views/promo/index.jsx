import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

// layout and components
import CoverLayout from "layouts/CoverLayout";
import Alert from "components/Alert";
import PromoForm from "./PromoForm";

// Store
import { useGetBrandQuery } from "store/brand/brandApiSlice";
import { useGetProductQuery } from "store/products/productApiSlice";
import {
  useGetPromosQuery,
  useGetPromoQuery,
  usePostPromoMutation,
} from "store/promo/promoApiSlice";

const Promo = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPromo, setSelectedPromo] = useState();
  const [createOrUpdate, setCreateOrUpdate] = useState(false);

  // const profileData = useSelector(selectUserProfile);
  // const promoCode = useSelector(selectPromoCode);
  // const strapiData = useSelector(selectStrapiContents);

  const { data: brandData } = useGetBrandQuery();
  const { data: productData } = useGetProductQuery();
  const { data: promoData } = useGetPromosQuery();
  const [postPromo, { isLoading }] = usePostPromoMutation();

  const [alertMessage, setAlertMessage] = useState();

  useEffect(() => {}, [dispatch]);

  const onSubmit = async (data) => {
    const res = await postPromo(data).unwrap();
    console.log("🚀 ~ file: index.jsx ~ line 35 ~ onSubmit ~ res", res);
  };

  const FormModal = ({ title, onClose, children }) => {
    return (
      <>
        <div className="justify-center items-center shadow flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl h-[95vh] overflow-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">{title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="text-slate-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">{children}</div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  return (
    <CoverLayout>
      <div className="flex-auto px-4 lg:px-10 rounded-t">
        <div className="max-w-lg text-left pt-5">
          <h1 className="text-slate-500 text-xl lg:text-3xl font-bold">
            Buy X get Y
          </h1>
        </div>
        {alertMessage ? (
          <Alert
            message={alertMessage}
            colour="red"
            onClose={() => setAlertMessage(null)}
          />
        ) : null}

        <FormModal title="Buy X Get Y" onClose={() => console.log("from model")}>
          <PromoForm
            formData={{
              promo: selectedPromo,
              brand: brandData,
              product: productData,
            }}
            onSubmit={onSubmit}
          />
        </FormModal>
      </div>
    </CoverLayout>
  );
};

export default Promo;

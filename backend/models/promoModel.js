import mongoose from "mongoose";

const offers = mongoose.Schema({
  id: { type: String, required: false },
  qty: { type: Number, required: false },
});

const promoSchema = mongoose.Schema(
  {
    title: { type: String, required: true, default: "" },
    startDate: { type: String, required: true, default: "" },
    endDate: { type: String, required: true, default: "" },
    appliedOn: { type: String, required: true, default: "" },
    buyBrandOrProduct: [offers],
    offerProduct: [offers],
  },
  {
    timestamps: true,
  }
);

promoSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Promo = mongoose.model("Promo", promoSchema);

export default Promo;

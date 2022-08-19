import mongoose from "mongoose";

const ratings = mongoose.Schema({
  oneRatings: { type: Number, required: false },
  twoRatings: { type: Number, required: false },
  threeRatings: { type: Number, required: false },
  fourRatings: { type: Number, required: false },
  fiveRatings: { type: Number, required: false },
  averageRating: { type: Number, required: false },
});

const unit = mongoose.Schema({
  label: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const offerAppliedUsers = mongoose.Schema({
  users: [String],
  allUsers: { type: Boolean, required: false },
});

const productSchema = mongoose.Schema(
  {
    id: { type: String, required: false },
    name: { type: String, required: false },
    slug: { type: String, required: false },
    SKU: { type: String, required: false },
    price: { type: Number, required: false },
    description: { type: String, required: false },
    quantity: { type: Number, required: false },
    seller: { type: String, required: false },
    unit: unit,
    ratings: ratings,
    ratings: ratings,
    offerAppliedUsers: offerAppliedUsers,
    images: [String],
    business_model: { type: String, required: false },
    category: [String],
    isHidden: { type: Boolean, required: false },
    tags: [String],
    rating: { type: Number, required: false },
    isDeleted: { type: Boolean, required: false },
    isFeatured: { type: String, required: false },
    discount_type: { type: Number, required: false },
    sale_price: { type: Number, required: false },
    discount_value: { type: Number, required: false },
    tax: [String],
    brand_names: [String],
    category_names: [String],
    qty_per_case: { type: Number, required: false },
    returnable: { type: Boolean, required: false },
    notify_quantity: { type: Number, required: false },
    stock_clearance: { type: Boolean, required: false },
    old_price: { type: Number, required: false },
    groceryType: { type: String, required: false },
    minimum_order: { type: Number, required: false },
    maximum_order: { type: Number, required: false },
    ecvId: { type: Number, required: false },
    erpId: { type: Number, required: false },
    discount_percent: { type: Number, required: false },
    bundleItems: [String],
  },
  {
    timestamps: true,
  }
);

productSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

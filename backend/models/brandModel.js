import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    sequence: {
      type: Number,
      required: true,
    },
    ecvId: {
      type: String,
      required: true,
    },
    erpId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

brandSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;

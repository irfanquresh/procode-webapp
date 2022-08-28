import mongoose from "mongoose";

const options = mongoose.Schema({
  option: { type: String, required: false },
  isCorrect: { type: Boolean, required: false },
});

const questions = mongoose.Schema({
  title: { type: String, required: false },
  complexity: { type: String, required: false },
  options: [options],
});

const testLibrarySchema = mongoose.Schema(
  {
    title: { type: String, required: true, default: "" },
    slug: { type: String, required: true, default: "" },
    questions: [questions],
  },
  {
    timestamps: true,
  }
);

testLibrarySchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const TestLibrary = mongoose.model("TestLibrary", testLibrarySchema);

export default TestLibrary;

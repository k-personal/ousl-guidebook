const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
    },
    description: {
      type: String,
    },
    creditsReqL3: {
      type: Number,
      default: 0,
    },
    creditsReqL4: {
      type: Number,
      default: 0,
    },
    creditsReqL5: {
      type: Number,
      default: 0,
    },
    creditsReqL6: {
      type: Number,
      default: 0,
    },
    totCreditsReq: {
      type: Number,
      default: 0,
    },
    passed: [
      {
        code: { type: String },
      },
    ],
    eligible: [
      {
        code: { type: String },
      },
    ],
    registered: [
      {
        code: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subject", subjectSchema);

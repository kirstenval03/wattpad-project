const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, maxlength: 300 }
  });

module.exports = model("Review", reviewSchema);
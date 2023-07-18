const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
    {
        imageUrl: String,
        link: String, 
        title: String,
        author: String, 
        genre: String,
        parts: Number, 
        concluded: String,
        description: String,
        owner: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = model('Book', bookSchema);
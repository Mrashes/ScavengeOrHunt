const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    paper_id: { type: String, required: true },
    web_url: { type: String, required: true },
    pub_date: { type: String, required: true },
    headline: { type: String, requried: true },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

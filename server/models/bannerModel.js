const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
  banner: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const Banner = mongoose.model("Banner", bannerSchema);    

module.exports = Banner;
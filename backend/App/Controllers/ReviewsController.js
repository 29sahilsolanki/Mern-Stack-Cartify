const { ProductsModel } = require("../Models/ProductModel");
const { ReviewsModel } = require("../Models/ReviewsModel");

const giveReviews = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId, rating, comment } = req.body;
    const reviewRes = new ReviewsModel({
      user: id,
      product: productId,
      rating,
      comment,
    });

    const savedReview = await reviewRes.save();

    if (!savedReview) {
      return res.status(403).json({
        status: false,
        message: "Can't give review on this product..!!",
      });
    }

    await ProductsModel.findByIdAndUpdate(productId, {
      $push: { reviews: savedReview._id },
    });

    return res.status(201).json({
      status: true,
      message: "Your review posted successfully..!!",
      savedReview,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to give review, try again..!!",
      error: error.message,
    });
  }
};

//delete review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.query;
    const deletedRes = await ReviewsModel.findByIdAndDelete(reviewId);
    if (!deletedRes) {
      return res
        .status(404)
        .json({ status: false, message: "No review found to delete..!!" });
    }
    await ProductsModel.findByIdAndUpdate(deletedRes.product, {
      $pull: { reviews: reviewId },
    });

    return res.status(200).json({
      status: true,
      message: "Review has been deleted..!!",
      deletedRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to delete review..!!",
      error: error.message,
    });
  }
};

module.exports = { giveReviews, deleteReview };

const express = require("express");
const {
  registerUser,
  userLogin,
  fetchCustomers,
  customerDetail,
  updateProfile,
  updateCustomerDetails,
  updateUserAddress,
  deleteUserAddress,
  deleteUserAndDetails,
} = require("../Controllers/UserController");
const {
  signupValidation,
  loginValidation,
  productValidation,
} = require("../Middlewares/Validations");
const { authUser } = require("../Middlewares/AuthUser");
const {
  uploadProducts,
  fetchProducts,
  updateProductDetails,
  deleteProduct,
} = require("../Controllers/ProductController");
const userRouter = express.Router();
const { upload } = require("../Middlewares/Multer");
const { verifyAdmin } = require("../Middlewares/VerifyAdmin");
const {
  giveReviews,
  deleteReview,
} = require("../Controllers/ReviewsController");
const {
  addToWishlist,
  fetchWishlist,
  deleteFromWishlist,
} = require("../Controllers/WishlistController");
const {
  addToCart,
  fetchCartItems,
  removeFromCart,
  manageCartQuantity,
} = require("../Controllers/CartController");
const { updateValidation } = require("../Middlewares/UpdateValidation");
const { AppRefresh } = require("../Controllers/AppRefresh");
const {
  placeOrder,
  fetchCustomerOrder,
  fetchAllOrders,
  updateOrderStatus,
  fetchOrderByDate,
  cancelCustomerOrder,
} = require("../Controllers/OrderController");
const {
  fetchAdminDetails,
  updateProfilePic,
  updateAdminDetails,
} = require("../Controllers/AdminController");
const {
  raiseSupportTicket,
  fetchSupportTicket,
  fetchTicketDate,
  adminTicketReply,
  updateSupportTicketCus,
} = require("../Controllers/SupportController");

//----------------token verification----------------//
userRouter.get("/token-verify", AppRefresh);

//---------------Register User---------------//
userRouter.post(
  "/register",
  upload.single("image"),
  signupValidation,
  registerUser,
);
//-----------------Login User----------------//
userRouter.post("/login", loginValidation, userLogin);
//-------------------Add Products------------------//
userRouter.post(
  "/add-products",
  upload.single("image"),
  productValidation,
  uploadProducts,
);
//-------------fetch products--------------//
userRouter.get("/all-products", fetchProducts);
//--------------fetch customers--------------//
userRouter.get("/all-customers", authUser, verifyAdmin, fetchCustomers);

userRouter.get("/customer-details", authUser, customerDetail);

//--------------give review--------------//
userRouter.post("/give-reviews", authUser, giveReviews);
//-------------delete review-------------//
userRouter.delete("/delete-review", authUser, deleteReview);

//----------------wishlist-----------------//
userRouter.post("/add-wishlist", authUser, addToWishlist);

userRouter.get("/wishlist", authUser, fetchWishlist);

userRouter.put("/update-wishlist", authUser, deleteFromWishlist);

//-------------------Cart--------------------//
userRouter.post("/add-to-cart", authUser, addToCart);

userRouter.get("/cart-items", authUser, fetchCartItems);

userRouter.put("/remove-from-cart", authUser, removeFromCart);

userRouter.put("/update-quantity", authUser, manageCartQuantity);

//-----------------------update------------------------//
userRouter.put(
  "/update-image",
  upload.single("profile"),
  authUser,
  updateProfile,
);

userRouter.put(
  "/update-customer",
  authUser,
  updateValidation,
  updateCustomerDetails,
);

userRouter.put("/update-address", authUser, updateUserAddress);

//----------------delete user address------------------//
userRouter.put("/delete-address", authUser, deleteUserAddress);

//--------------------place order---------------------//
userRouter.post("/place-order", authUser, placeOrder);

userRouter.put("/cancel-order", authUser, cancelCustomerOrder);

//------------------fetch order-------------------//
userRouter.get("/fetch-order", authUser, fetchCustomerOrder);

userRouter.get("/fetch-order-date", authUser, verifyAdmin, fetchOrderByDate);

//----------------------------------admin section------------------------------------//
userRouter.get("/admin", authUser, verifyAdmin, fetchAdminDetails);

userRouter.put(
  "/update-admin-profile",
  authUser,
  verifyAdmin,
  upload.single("profile"),
  updateProfilePic,
);

userRouter.put(
  "/update-admin-details",
  authUser,
  updateValidation,
  verifyAdmin,
  updateAdminDetails,
);

userRouter.get("/all-orders", authUser, verifyAdmin, fetchAllOrders);

userRouter.put("/update-status", authUser, verifyAdmin, updateOrderStatus);

userRouter.put(
  "/update-product-details",
  authUser,
  upload.single("image"),
  verifyAdmin,
  updateProductDetails,
);

//-----------------------Support Ticket-------------------------//
userRouter.post("/raise-ticket", authUser, raiseSupportTicket);

userRouter.get("/support-ticket", authUser, fetchSupportTicket);

userRouter.put("/admin-ticket-reply", authUser, verifyAdmin, adminTicketReply);

userRouter.put("/update-support-ticket", authUser, updateSupportTicketCus);

//---------------------support admin-----------------------//
userRouter.get(
  "/support-admin/:ticketDate",
  authUser,
  verifyAdmin,
  fetchTicketDate,
);

//------------------------delete user and details------------------------//
userRouter.delete(
  "/delete-user/:id",
  authUser,
  verifyAdmin,
  deleteUserAndDetails,
);

//--------------------delete product-----------------//
userRouter.delete(
  "/delete-product/:productId",
  authUser,
  verifyAdmin,
  deleteProduct,
);

module.exports = { userRouter };

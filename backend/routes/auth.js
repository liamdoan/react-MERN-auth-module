const express = require('express');
const router = express.Router();
const {signUp} = require("../controllers/auth-controllers/authControllerSignUp");
const {logIn} = require("../controllers/auth-controllers/authControllerLogin");
const {logOut} = require("../controllers/auth-controllers/authControllerLogout");
const { verifyEmail } = require('../controllers/auth-controllers/authControllerVerifyEmail');
const { forgotPassword } = require('../controllers/auth-controllers/authControllerForgotPassword');
const { resetPassword } = require('../controllers/auth-controllers/authControllerResetPassword');

const { verifyToken } = require('../middleware/verifyToken');
const { verifyAdminRole } = require('../middleware/verifyAdminRole');
const { verifyAdminOrUserRole } = require('../middleware/verifyAdminOrUserRole');
const { verifyAdminOrManagerRole } = require('../middleware/verifyAdminOrManagerRole');

const { checkAuth } = require('../controllers/auth-controllers/authControllerCheckAuth');
const { getAllUsersData } = require('../controllers/auth-controllers/role-specific-controllers/getAllUsersDataController');
const { updateUserInfo } = require('../controllers/auth-controllers/role-specific-controllers/updateUserInfoController');
const { updateUserRole } = require('../controllers/auth-controllers/role-specific-controllers/updateUserRoleController');
const { deleteUser } = require('../controllers/auth-controllers/role-specific-controllers/deleteUserController');

const { authenticateGoogle, authenticateGoogleCallback } = require('../middleware/googlePassportMiddleware');
const { googleOAuthCallback } = require('../controllers/auth-controllers/authControllerLoginOAuth');

router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", logIn);
router.post("/logout", logOut);

router.get('/google', authenticateGoogle);
router.get('/google/callback', authenticateGoogleCallback, googleOAuthCallback);

router.get("/check-auth", verifyToken, checkAuth);

router.get("/get-all-users-data", verifyToken, verifyAdminOrManagerRole, getAllUsersData);
router.patch("/update-role/:userId", verifyToken, verifyAdminRole, updateUserRole);
router.patch("/modify-info/:userId", verifyToken, verifyAdminOrUserRole, updateUserInfo);
router.delete("/delete-user/:userId", verifyToken, verifyAdminOrUserRole, deleteUser);

module.exports = router;

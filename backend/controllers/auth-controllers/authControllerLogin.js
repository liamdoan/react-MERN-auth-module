const userModel = require("../../models/userModel");
const bcryptjs = require('bcryptjs');
const { generateTokenAndSetCookies } = require("../../utils/generateTokenAndSetCookies");

module.exports.logIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email});

        if(!user) {
            return res.status(400).json({
                message: "No email found!"
            })
        };

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Password doesn't match!"
            })
        };

        generateTokenAndSetCookies(res, user._id);

        user.lastLogin = Date.now();

        await user.save();

        res.status(200).json({
            message: "Login ok!",
            user:{... user._doc}
        });
    } catch (error) {
        console.log("Login error: ", error);
        res.status(400).json({
            message: error.message
        });
    }
}

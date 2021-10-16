// Creating User Token and Saving Cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJWT_token();

    // options for cookie
    const options = {
        expire: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({ success: true, token });
}

module.exports = sendToken
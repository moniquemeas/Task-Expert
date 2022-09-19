let loginDash = async (req, res) => {
    return res.render("dashboard.handlebars",{
        user: req.user
    });
};

module.exports = {
    loginDash: loginDash,
};

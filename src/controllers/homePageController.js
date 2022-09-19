let handleHelloWorld = async (req, res) => {
    return res.render("homepage.handlebars",{
        user: req.user
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};

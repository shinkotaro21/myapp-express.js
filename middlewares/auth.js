const verify = (req, res, next) => {
    const token = req.header['token'];
    next();
}

module.exports = {
    verify
}

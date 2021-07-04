exports.getApi = async (req, res, next) => {
    try {
        res.status(200).send({
            message: "all ok"
        })
    } catch (err) {
        next(err)
    }
}
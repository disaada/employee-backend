const getMessage = (req, res) => {
    const data = {message : req.params.msg}
    res.render('message', data)
}

module.exports = getMessage
const getMessage = (req, res) => {
    res.render('index', {varMessage: req.params.msg})
}

//ekspor hasil pengambilan objek
module.exports = {getMessage}
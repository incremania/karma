const notFound = (req, res) => { res.status(404).json({ msg: 'no route found'})}

module.exports = notFound
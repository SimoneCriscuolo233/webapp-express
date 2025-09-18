const setImagePath = (req, res, next) => {
  req.imagePath = `${req.protocol}://${req.get('host')}/public/img/movies_cover/`;
  next();
}

module.exports = setImagePath;
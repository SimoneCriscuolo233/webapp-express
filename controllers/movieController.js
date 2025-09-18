const connection = require('../data/db.js')
const index = (req, res) => {
  const sql = "SELECT * FROM movies"

  connection.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Errore durante l'esecuzione della query:" + err });
    res.json(result)
  })
}

const show = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM movies WHERE id = ?"
  const reviewsSql = `SELECT reviews.* FROM reviews
JOIN movies ON movies.id = reviews.movie_id
WHERE movies.id= ?`

  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Errore durante l'esecuzione della query:" + err });
    if (result.length === 0) return res.status(404).json({ error: "Post non trovato" });
    connection.query(reviewsSql, [id], (err, reviewsResult) => {
      if (err) {
        return res.status(500).json({ error: "Errore durante il recupero dei tag:" + err });
      }
      const movieWithReviews = {
        ...result[0],
        tags: reviewsResult
      }
      res.json(movieWithReviews)
    })
  })
}
const store = (req, res) => {
  res.status(201).json(newPost)
}
const update = (req, res) => {
  if (!post) {
    return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
  }
}
const modify = (req, res) => {
  if (!post) {
    return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
  }
}
const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM movies WHERE id = ?"

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: "Errore durante l'esecuzione della query:" + err });
    res.sendStatus(204)
  })
}
module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy
}
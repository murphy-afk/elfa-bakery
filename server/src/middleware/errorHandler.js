export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not found' })
}

// Express detects an error handler by its 4-argument signature,
// so the unused next parameter must stay in place.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err)

  const status = err.status || 500
  const message = status === 500 ? 'Internal server error' : err.message

  res.status(status).json({ error: message })
}

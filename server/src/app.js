import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import menuRouter from './routes/menu.js'
import settingsRouter from './routes/settings.js'
import hoursRouter from './routes/hours.js'
import galleryRouter from './routes/gallery.js'
import contactRouter from './routes/contact.js'

import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
})

app.use('/api', apiLimiter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/menu', menuRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/hours', hoursRouter)
app.use('/api/gallery', galleryRouter)
app.use('/api/contact', contactRouter)

app.use(notFoundHandler)
app.use(errorHandler)

export default app

import { Router } from 'express'
import pool from '../config/db.js'

const router = Router()

// GET /api/gallery returns the gallery images in order.
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, image_url, alt_it, alt_en, position FROM gallery ORDER BY position ASC'
    )

    res.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router

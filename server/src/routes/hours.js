import { Router } from 'express'
import pool from '../config/db.js'

const router = Router()

// GET /api/hours returns the opening hours, Sunday first.
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT day_index, day_name_it, day_name_en, opens, closes,
              is_open_all_day, is_closed, note
         FROM opening_hours
        ORDER BY day_index ASC`
    )

    res.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router

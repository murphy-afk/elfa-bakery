import { Router } from 'express'
import pool from '../config/db.js'

const router = Router()

// GET /api/allergens returns the 14 EU allergens in code order.
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, code, name_it, name_en FROM allergens ORDER BY code ASC'
    )

    res.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router

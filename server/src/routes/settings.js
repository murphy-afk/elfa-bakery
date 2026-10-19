import { Router } from 'express'
import pool from '../config/db.js'

const router = Router()

// GET /api/settings returns all site settings as a key value object.
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM settings')

    const settings = {}
    for (const row of rows) {
      settings[row.setting_key] = row.setting_value
    }

    res.json(settings)
  } catch (err) {
    next(err)
  }
})

export default router

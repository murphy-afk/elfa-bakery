import { Router } from 'express'
import pool from '../config/db.js'

const router = Router()

// GET /api/menu returns every category with its items.
router.get('/', async (req, res, next) => {
  try {
    const [categories] = await pool.query(
      'SELECT id, name_it, name_en, slug, position FROM categories ORDER BY position ASC'
    )

    const [items] = await pool.query(
      `SELECT id, category_id, name_it, name_en, description_it, description_en,
              price, image_url, is_featured, position
         FROM items
        ORDER BY position ASC`
    )

    const result = categories.map((category) => ({
      ...category,
      items: items.filter((item) => item.category_id === category.id)
    }))

    res.json(result)
  } catch (err) {
    next(err)
  }
})

// GET /api/menu/:slug returns one category with its items.
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params

    const [rows] = await pool.query(
      'SELECT id, name_it, name_en, slug, position FROM categories WHERE slug = :slug',
      { slug }
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const category = rows[0]

    const [items] = await pool.query(
      `SELECT id, name_it, name_en, description_it, description_en,
              price, image_url, is_featured, position
         FROM items
        WHERE category_id = :id
        ORDER BY position ASC`,
      { id: category.id }
    )

    res.json({ ...category, items })
  } catch (err) {
    next(err)
  }
})

export default router

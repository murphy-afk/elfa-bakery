import { Router } from 'express'

const router = Router()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// POST /api/contact validates a message. Delivery is added later.
router.post('/', (req, res) => {
  const { name, email, message } = req.body || {}

  const errors = []

  if (!name || String(name).trim().length === 0) {
    errors.push({ field: 'name', message: 'Il nome e obbligatorio' })
  }

  if (!email || !EMAIL_PATTERN.test(String(email))) {
    errors.push({ field: 'email', message: 'Inserisci un indirizzo email valido' })
  }

  if (!message || String(message).trim().length < 10) {
    errors.push({ field: 'message', message: 'Il messaggio deve avere almeno 10 caratteri' })
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  // TODO Session 3: store the message or send it by email.
  res.status(201).json({ ok: true })
})

export default router

import { Router } from 'express'

import * as db from '../db/db.ts'

const router = Router()

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    // const dataCheck = await req.body
    console.log('route test', id)
    await db.deleteItem(Number(id))

    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router

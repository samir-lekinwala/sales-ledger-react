import { Router } from 'express'

import * as db from '../db/db.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const fruits = await db.getAllItems()

    res.json(fruits)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const dataCheck = await req.body
    console.log(dataCheck)
    await db.addItem(dataCheck)

    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
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

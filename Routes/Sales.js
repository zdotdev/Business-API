import express from 'express'
import {
  getAllSales,
  getById,
  addSale,
  updateSale,
  deleteSale,
  getByDate
} from '../Controllers/Sales.js'

const router = express.Router()

router.get('/', getAllSales)
router.get('/date', getByDate)
router.get('/:id', getById)
router.post('/', addSale)
router.put('/:id', updateSale)
router.delete('/:id', deleteSale)

export default router

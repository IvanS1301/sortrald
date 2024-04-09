const express = require('express')
const {
    createLead,
    getLeads,
    getSingleLead,
    deleteLead,
    updateLead
} = require('../controllers/leadController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all leads
router.get('/', getLeads)

// GET a single lead
router.get('/:id', getSingleLead)

// POST a new lead
router.post('/', createLead)

// DELETE a lead
router.delete('/:id', deleteLead)

// UPDATE a lead
router.patch('/:id', updateLead)


module.exports = router
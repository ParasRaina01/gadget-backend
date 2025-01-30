import { Router } from 'express';
import { GadgetController } from '../controllers/gadget.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const gadgetController = new GadgetController();

// Apply authentication middleware to all gadget routes
router.use(authenticateToken);

// GET /gadgets - List all gadgets with optional status filter
router.get('/', gadgetController.getAllGadgets);

// POST /gadgets - Create a new gadget
router.post('/', gadgetController.createGadget);

// PATCH /gadgets/:id - Update a gadget
router.patch('/:id', gadgetController.updateGadget);

// DELETE /gadgets/:id - Decommission a gadget
router.delete('/:id', gadgetController.decommissionGadget);

// POST /gadgets/:id/self-destruct - Initiate self-destruct sequence
router.post('/:id/self-destruct', gadgetController.selfDestruct);

export default router; 
import { Request, Response } from 'express';
import { GadgetService } from '../services/gadget.service';
import { GadgetStatus } from '@prisma/client';
import { generateSelfDestructCode } from '../utils/random';
import { ApiResponse } from '../types/common';
import { GadgetResponse } from '../types/gadget';

const gadgetService = new GadgetService();

export class GadgetController {
  async getAllGadgets(req: Request, res: Response) {
    try {
      const status = req.query.status as GadgetStatus | undefined;
      const gadgets = await gadgetService.findAll({ status });
      
      const gadgetsWithProbability = gadgets.map(gadget => 
        gadgetService.addMissionSuccessProbability(gadget)
      );

      return res.json({
        success: true,
        data: gadgetsWithProbability
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch gadgets'
      });
    }
  }

  async createGadget(req: Request, res: Response) {
    try {
      const gadget = await gadgetService.create(req.body);
      const gadgetWithProbability = gadgetService.addMissionSuccessProbability(gadget);

      return res.status(201).json({
        success: true,
        data: gadgetWithProbability
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create gadget'
      });
    }
  }

  async updateGadget(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const gadget = await gadgetService.update(id, req.body);
      
      if (!gadget) {
        return res.status(404).json({
          success: false,
          error: 'Gadget not found'
        });
      }

      const gadgetWithProbability = gadgetService.addMissionSuccessProbability(gadget);

      return res.json({
        success: true,
        data: gadgetWithProbability
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update gadget'
      });
    }
  }

  async decommissionGadget(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const gadget = await gadgetService.decommission(id);
      
      if (!gadget) {
        return res.status(404).json({
          success: false,
          error: 'Gadget not found'
        });
      }

      return res.json({
        success: true,
        data: gadget
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to decommission gadget'
      });
    }
  }

  async selfDestruct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const gadget = await gadgetService.findById(id);
      
      if (!gadget) {
        return res.status(404).json({
          success: false,
          error: 'Gadget not found'
        });
      }

      const confirmationCode = generateSelfDestructCode();

      return res.json({
        success: true,
        data: {
          confirmationCode,
          message: `Self-destruct sequence initiated for ${gadget.name}. Use confirmation code to proceed.`
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to initiate self-destruct sequence'
      });
    }
  }
} 
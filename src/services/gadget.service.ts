import { Gadget, GadgetStatus } from '@prisma/client';
import prisma from '../lib/prisma';
import { CreateGadgetDto, UpdateGadgetDto, GadgetFilters } from '../types/gadget';
import { generateGadgetName, generateMissionSuccessProbability } from '../utils/random';

export class GadgetService {
  async findAll(filters: GadgetFilters = {}): Promise<Gadget[]> {
    return prisma.gadget.findMany({
      where: {
        status: filters.status
      }
    });
  }

  async create(dto: CreateGadgetDto): Promise<Gadget> {
    const name = dto.name || generateGadgetName();
    
    return prisma.gadget.create({
      data: {
        name,
        status: GadgetStatus.Available
      }
    });
  }

  async update(id: string, dto: UpdateGadgetDto): Promise<Gadget | null> {
    return prisma.gadget.update({
      where: { id },
      data: dto
    });
  }

  async decommission(id: string): Promise<Gadget | null> {
    return prisma.gadget.update({
      where: { id },
      data: {
        status: GadgetStatus.Decommissioned,
        decommissioned_at: new Date()
      }
    });
  }

  async findById(id: string): Promise<Gadget | null> {
    return prisma.gadget.findUnique({
      where: { id }
    });
  }

  addMissionSuccessProbability(gadget: Gadget) {
    return {
      ...gadget,
      missionSuccessProbability: generateMissionSuccessProbability()
    };
  }
} 
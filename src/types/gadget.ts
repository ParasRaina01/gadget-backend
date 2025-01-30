import { Gadget, GadgetStatus } from '@prisma/client';

export interface CreateGadgetDto {
  name?: string; // Optional because we'll generate if not provided
}

export interface UpdateGadgetDto {
  name?: string;
  status?: GadgetStatus;
}

export interface GadgetResponse extends Gadget {
  missionSuccessProbability: number;
}

export interface SelfDestructResponse {
  confirmationCode: string;
  message: string;
}

export interface GadgetFilters {
  status?: GadgetStatus;
} 
import { UserRole } from '@prisma/client';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthUser {
  userId: string;
  email: string;
}

export interface AuthenticatedRequest extends Express.Request {
  user?: AuthUser;
} 
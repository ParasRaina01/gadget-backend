import { User } from '@prisma/client';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export class UserService {
  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const user = await prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword
      }
    });

    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async validateUser(loginDto: LoginDto): Promise<Omit<User, 'password'> | null> {
    const user = await this.findByEmail(loginDto.email);
    
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    
    return null;
  }
} 
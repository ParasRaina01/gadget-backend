import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService, CreateUserDto, LoginDto } from '../services/user.service';

const router = Router();
const userService = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// Register new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const userDto: CreateUserDto = req.body;

    // Check if email already exists
    const existingUser = await userService.findByEmail(userDto.email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    const user = await userService.create(userDto);
    
    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const loginDto: LoginDto = req.body;
    const user = await userService.validateUser(loginDto);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email
      }, 
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      data: {
        token,
        user
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

export default router; 
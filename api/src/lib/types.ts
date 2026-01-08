export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface CreateHabitRequest {
  title: string;
  description?: string;
  frequency?: 'daily' | 'weekly' | 'monthly';
  targetCount?: number;
}

export interface UpdateHabitRequest {
  title?: string;
  description?: string;
  frequency?: 'daily' | 'weekly' | 'monthly';
  targetCount?: number;
}
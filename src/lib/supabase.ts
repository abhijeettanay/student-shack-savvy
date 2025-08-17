import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  date_of_birth?: string
  created_at: string
  updated_at: string
}

export interface Budget {
  id: string
  user_id: string
  category: string
  allocated: number
  spent: number
  color: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  description: string
  category?: string
  transaction_type: 'income' | 'expense' | 'transfer'
  payment_method?: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface DigitalWallet {
  id: string
  user_id: string
  balance: number
  monthly_limit: number
  used_limit: number
  created_at: string
  updated_at: string
}

export interface Investment {
  id: string
  user_id: string
  symbol: string
  name: string
  shares: number
  average_price: number
  current_price: number
  total_invested: number
  current_value: number
  gain_loss: number
  gain_loss_percentage: number
  created_at: string
  updated_at: string
}

export interface GroupFund {
  id: string
  user_id: string
  title: string
  description?: string
  target_amount: number
  current_amount: number
  contributors_count: number
  deadline?: string
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface GamificationStats {
  id: string
  user_id: string
  points: number
  streak: number
  level: number
  badges: string[]
  achievements: string[]
  last_activity_date: string
  created_at: string
  updated_at: string
}
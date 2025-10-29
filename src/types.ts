// src/types.ts
// Complete TypeScript type definitions

export interface X402ClientConfig {
  apiKey: string
  baseUrl?: string
  chain?: 'bsc' | 'bsc-testnet'
  timeout?: number
  retryAttempts?: number
  retryDelay?: number
  webhookSecret?: string
}

export interface PaymentRule {
  trigger: 'post_verified' | 'viral_bonus' | 'engagement_bonus' | 'community_vote'
  payAmount: number
  threshold?: number
}

export interface CampaignConfig {
  campaignId: string
  budget: number
  currency: 'USDC'
  paymentRules: PaymentRule[]
  duration: number
}

export interface CampaignStatus {
  campaignId: string
  locked: number
  spent: number
  pending: number
  postsPaid: number
  remaining: number
  status: 'active' | 'paused' | 'completed'
  createdAt: string
  endsAt: string
}

export interface PaymentConfig {
  campaignId: string
  kolWallet: string
  amount: number
  postId: string
  proof: string
}

export interface PaymentResponse {
  txHash: string
  status: 'pending' | 'confirmed' | 'failed'
  amount: number
  kolWallet: string
  timestamp: string
}

export interface BatchSettleConfig {
  campaignId: string
  payments: Array<{
    wallet: string
    amount: number
  }>
}

export interface BatchSettleResponse {
  batchId: string
  txHash: string
  count: number
  totalAmount: number
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: string
}

export interface ReputationData {
  wallet: string
  earnings: number
  reliability: number
  badges: string[]
  fraudScore: number
  totalPayments: number
  onTimePayments: number
  disputes: number
}

export interface FraudCheckResult {
  wallet: string
  score: number
  risk: 'low' | 'medium' | 'high' | 'critical'
  flags: string[]
  recommendation: 'approve' | 'review' | 'block'
}

export interface WebhookEvent {
  event: 'campaign.created' | 'payment.released' | 'batch.settled' | 'kol.reputation_updated' | 'fraud.detected'
  data: Record<string, unknown>
  timestamp: string
}

export interface WebhookConfig {
  event: string
  url: string
  active?: boolean
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

// src/index.ts
// Main SDK export

export { X402 } from './client'
export { X402Error, PaymentError, CampaignError, InsufficientEscrowError } from './utils/errors'
export type {
  CampaignConfig,
  PaymentConfig,
  BatchSettleConfig,
  ReputationData,
  CampaignStatus,
  PaymentRule,
  X402ClientConfig
} from './types'

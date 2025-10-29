// src/client.ts
// Main X402 SDK client

import axios, { AxiosInstance } from 'axios'
import { CampaignAPI } from './api/campaigns'
import { PaymentAPI } from './api/payments'
import { BatchAPI } from './api/batch'
import { KOLAPI } from './api/kol'
import { WebhookAPI } from './api/webhooks'
import type { X402ClientConfig } from './types'

export class X402 {
  private apiClient: AxiosInstance
  private config: Required<X402ClientConfig>

  public campaign: CampaignAPI
  public payment: PaymentAPI
  public batch: BatchAPI
  public kol: KOLAPI
  public webhooks: WebhookAPI

  constructor(config: X402ClientConfig) {
    this.config = {
      baseUrl: config.baseUrl || 'https://api.x402rails.io',
      chain: config.chain || 'bsc',
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3,
      retryDelay: config.retryDelay || 1000,
      webhookSecret: config.webhookSecret || '',
      apiKey: config.apiKey
    }

    this.apiClient = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': '@x402rails/kol-sdk/1.0.0'
      }
    })

    // Initialize API modules
    this.campaign = new CampaignAPI(this.apiClient)
    this.payment = new PaymentAPI(this.apiClient)
    this.batch = new BatchAPI(this.apiClient)
    this.kol = new KOLAPI(this.apiClient)
    this.webhooks = new WebhookAPI(this.apiClient)
  }

  /**
   * Get current client configuration
   */
  getConfig(): Readonly<Required<X402ClientConfig>> {
    return Object.freeze(this.config)
  }

  /**
   * Set new API key (for token rotation)
   */
  setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`
  }

  /**
   * Health check for API connectivity
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.apiClient.get('/v1/health')
      return response.status === 200
    } catch {
      return false
    }
  }

  /**
   * Get API version
   */
  async getVersion(): Promise<string> {
    const response = await this.apiClient.get('/v1/version')
    return response.data.version
  }
}

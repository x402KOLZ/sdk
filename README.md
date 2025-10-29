# 402 — Influencer Payment Rails on BSC

Payment infrastructure for influencer platforms. Escrow budgets, auto-pay per post, batch-settle creators, on-chain reputation.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Chain](https://img.shields.io/badge/chain-BSC-yellow.svg)](https://bscscan.com)
[![Currency](https://img.shields.io/badge/currency-USDC-green.svg)](https://www.centre.io/)

---

## 🚀 Quick Start

### Installation

```bash
npm install @x402rails/kol-sdk
```

### Initialize Client

```typescript
import { X402 } from '@x402rails/kol-sdk'

const client = new X402({
  apiKey: 'sk_live_YOUR_API_KEY',
  baseUrl: 'https://api.x402rails.io',
  chain: 'bsc'
})
```

### Create Campaign Escrow

```typescript
const campaign = await client.campaign.createEscrow({
  campaignId: 'camp_abc123',
  budget: 50000, // 50k USDC
  currency: 'USDC',
  paymentRules: [
    {
      trigger: 'post_verified',
      payAmount: 100
    }
  ],
  duration: 30 * 24 * 3600 // 30 days
})
```

### Release Payment Per Post

```typescript
await client.payment.release({
  campaignId: 'camp_abc123',
  kolWallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f...',
  amount: 100,
  postId: 'tweet_123',
  proof: '0xsignature...'
})
```

### Batch Settle

```typescript
await client.batch.settle({
  campaignId: 'camp_abc123',
  payments: [
    { wallet: '0xabc...', amount: 100 },
    { wallet: '0xdef...', amount: 250 }
  ]
})
```

---

## 📋 Features

### Core Capabilities

- **Escrow Management**: Lock campaign budgets securely on-chain
- **Per-Post Payments**: Automatically release payments when posts are verified
- **Batch Settlement**: Process up to 500 creators in a single transaction (~25 seconds)
- **On-Chain Reputation**: Track reliability scores, earnings history, and badges
- **Fraud Prevention**: Built-in verification, dispute resolution, and fraud detection
- **Real-Time Status**: Monitor campaign funds, payments, and pending settlements

### Payment Rules

Define custom payment rules for your campaigns:

```typescript
paymentRules: [
  { trigger: 'post_verified', payAmount: 100 },
  { trigger: 'viral_bonus', threshold: 100000, payAmount: 500 },
  { trigger: 'engagement_bonus', threshold: 50000, payAmount: 200 }
]
```

### KOL Reputation

Track creator reliability on-chain:

```typescript
const reputation = await client.kol.getReputation('0x742d...')
// Returns: { earnings, reliability, badges, fraudScore, totalPayments }
```

---

## 🔌 API Reference

### Campaign Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/kol/campaign/escrow` | Create & fund campaign escrow |
| `GET` | `/v1/kol/campaign/:id/status` | Get campaign status |
| `POST` | `/v1/kol/campaign/:id/pause` | Pause campaign |
| `POST` | `/v1/kol/campaign/:id/resume` | Resume campaign |

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/kol/payment/release` | Release payment for post |
| `GET` | `/v1/kol/payment/:id` | Get payment details |
| `POST` | `/v1/kol/payment/:id/dispute` | Dispute a payment |

### Batch Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/kol/batch/settle` | Batch settle multiple payments |
| `GET` | `/v1/kol/batch/:id/status` | Get batch settlement status |

### KOL Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/kol/:wallet/reputation` | Get KOL reputation |
| `GET` | `/v1/kol/:wallet/fraud-check` | Run fraud detection |
| `GET` | `/v1/kol/:wallet/history` | Get payment history |

---

## 📚 Documentation

- [Complete API Docs](https://docs.x402rails.io)
- [SDK Guide](https://docs.x402rails.io/sdk)
- [Code Examples](https://docs.x402rails.io/examples)
- [Error Codes](https://docs.x402rails.io/errors)

---

## 🏗️ Architecture

### System Flow

```
┌─────────────────┐    ┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ YOUR PLATFORM   │    │  402 API    │    │  BSC ESCROW     │    │  KOL WALLET     │
│   (CLIENT)      │    │  (x402)     │    │  (CONTRACT)     │    │  (RECEIVES)     │
└─────────────────┘    └─────────────┘    └─────────────────┘    └─────────────────┘
         │                    │                     │                     │
         │ POST /campaign/    │                     │                     │
         │      escrow        │                     │                     │
         ├──────────────────▶ │                     │                     │
         │ budget: 50k USDC   │                     │                     │
         │ rules: $100/post   │                     │                     │
         ├──────────────────▶ │ 50k locked          │                     │
         │                    │                     │                     │
         │ [brand pays esc.]  │                     │                     │
         │                    │     200 OK          │                     │
         │◀──────────────────┤                     │                     │
         │                    │                     │                     │
         │ POST /payment/rel  │                     │                     │
         ├──────────────────▶ │ ──────────────────▶ │ transfer 100 USDC  │
         │   200 OK           │                     │ ──────────────────▶ │
```

### Smart Contracts

- **KOLCampaignEscrow.sol**: Manages campaign escrows and fund releases
- **KOLRegistry.sol**: Tracks KOL reputation and fraud scores
- **PaymentBatch.sol**: Optimizes batch settlements

**Chain**: BSC (Binance Smart Chain)  
**Currency**: USDC  
**Network**: Mainnet

---

## 🔐 Authentication

All API requests require an API key:

```bash
export X402_API_KEY=sk_live_YOUR_KEY
```

Get your API key at [dashboard.x402rails.io](https://dashboard.x402rails.io)

### Request Headers

```
Authorization: Bearer sk_live_YOUR_API_KEY
Content-Type: application/json
```

---

## 📦 SDK Packages

### JavaScript/TypeScript

```bash
npm install @x402rails/kol-sdk
```

### Python

```bash
pip install x402-rails
```

### Go

```bash
go get github.com/x402-rails/go-sdk
```

---

## 💰 Pricing

- **Platform Fee**: 2% on all payments processed
- **Settlement Fee**: Covered in platform fee
- **API Calls**: Unlimited with API key

### Example: $100k Campaign

- Total amount locked: $100,000
- Platform fee (2%): $2,000
- Net to creators: $98,000

---

## ⚙️ Configuration

### Environment Variables

```bash
X402_API_KEY=sk_live_...
X402_BASE_URL=https://api.x402rails.io
X402_CHAIN=bsc
X402_TIMEOUT=30000
X402_RETRY_ATTEMPTS=3
X402_RETRY_DELAY=1000
```

### Advanced Options

```typescript
const client = new X402({
  apiKey: process.env.X402_API_KEY,
  baseUrl: 'https://api.x402rails.io',
  chain: 'bsc',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  webhookSecret: 'whsec_...'
})
```

---

## 🎯 Use Cases

### 1. Twitter Campaign

```typescript
await client.campaign.createEscrow({
  campaignId: 'twitter_launch_2024',
  budget: 100000,
  paymentRules: [
    { trigger: 'post_verified', payAmount: 500 }
  ],
  duration: 7 * 24 * 3600
})
```

### 2. TikTok Affiliate

```typescript
await client.campaign.createEscrow({
  campaignId: 'tiktok_affiliate_q1',
  budget: 250000,
  paymentRules: [
    { trigger: 'post_verified', payAmount: 1000 },
    { trigger: 'viral_bonus', threshold: 100000, payAmount: 5000 }
  ],
  duration: 90 * 24 * 3600
})
```

### 3. Discord Community

```typescript
await client.campaign.createEscrow({
  campaignId: 'discord_community_rewards',
  budget: 50000,
  paymentRules: [
    { trigger: 'engagement_verified', payAmount: 50 },
    { trigger: 'community_vote', threshold: 100, payAmount: 500 }
  ],
  duration: 30 * 24 * 3600
})
```

---

## 🚨 Error Handling

All errors return standard HTTP status codes:

| Code | Error | Action |
|------|-------|--------|
| 400 | Bad Request | Validate parameters |
| 401 | Unauthorized | Check API key |
| 403 | Forbidden | Check permissions |
| 429 | Rate Limited | Implement backoff |
| 500 | Server Error | Retry with backoff |

### Example

```typescript
try {
  await client.payment.release({...})
} catch (error) {
  if (error.code === 'INSUFFICIENT_ESCROW') {
    console.error('Not enough funds in escrow')
  } else if (error.code === 'INVALID_PROOF') {
    console.error('Payment verification failed')
  }
}
```

---

## 📊 Monitoring

### Campaign Status

```typescript
const status = await client.campaign.getStatus('camp_abc123')
// Returns: { locked, spent, pending, postsPaid, remaining }
```

### Payment History

```typescript
const history = await client.payment.getHistory('camp_abc123')
// Returns: [{ date, wallet, amount, status, txHash }, ...]
```

### KOL Reputation

```typescript
const rep = await client.kol.getReputation('0x742d...')
// Returns: { earnings, reliability, badges, fraudScore }
```

---

## 🔗 Webhooks

Subscribe to campaign events:

```typescript
await client.webhooks.subscribe({
  event: 'payment.released',
  url: 'https://yourapi.com/webhooks/payment'
})
```

### Events

- `campaign.created`: Campaign escrow created
- `payment.released`: Payment released to KOL
- `batch.settled`: Batch settlement completed
- `kol.reputation_updated`: KOL reputation changed
- `fraud.detected`: Potential fraud detected

---

## 🧪 Testing

### Testnet

```typescript
const client = new X402({
  apiKey: 'sk_test_...',
  baseUrl: 'https://testnet-api.x402rails.io',
  chain: 'bsc-testnet'
})
```

### Test Data

```typescript
// Use test wallets
const testWallet = '0x742d35Cc6634C0532925a3b844Bc9e7595f...'
const testCampaign = 'camp_test_123'
```

---

## 📞 Support

- **Discord**: [Join our server](https://discord.gg/x402rails)
- **Telegram**: [@x402rails](https://t.me/x402rails)
- **Email**: support@x402rails.io
- **Docs**: [docs.x402rails.io](https://docs.x402rails.io)

---

## 📜 License

MIT License — See LICENSE file for details

---

## 🙋 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md)

### Development

```bash
# Clone repo
git clone https://github.com/x402-rails/sdk.git
cd sdk

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

---

## 🗺️ Roadmap

- [x] Core escrow & payment system
- [x] Batch settlement (up to 500)
- [x] On-chain reputation
- [ ] Multi-chain support (Ethereum, Polygon, Arbitrum)
- [ ] Additional stablecoins (USDT, DAI, etc)
- [ ] Advanced analytics dashboard
- [ ] Automated dispute resolution
- [ ] Creator marketplace

---

## 🌟 Star Us!

If you find 402 useful, please star this repo! It helps other developers discover the project.

---

**Made with ⚡ for creators and platforms on BSC**

© 2024 402 Rails. All rights reserved.

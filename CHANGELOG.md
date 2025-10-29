# Changelog

All notable changes to the 402 Rails SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-15

### Added

- **Core API Client**: Complete X402 client for managing campaigns and payments
- **Campaign Management**: Create, pause, resume, and monitor campaigns
- **Payment Processing**: Release payments for verified posts
- **Batch Settlement**: Process up to 500 payments in single transaction (~25 seconds)
- **KOL Reputation**: On-chain reputation tracking with fraud scores
- **Webhook Support**: Subscribe to campaign events (payment.released, batch.settled, etc)
- **TypeScript Support**: Full TypeScript types and definitions
- **Error Handling**: Comprehensive error types and handling
- **Retry Logic**: Automatic retry with exponential backoff
- **Request Logging**: Debug logging for API calls

### API Endpoints

- `POST /v1/kol/campaign/escrow` - Create campaign escrow
- `POST /v1/kol/payment/release` - Release payment for post
- `POST /v1/kol/batch/settle` - Batch settle payments
- `GET /v1/kol/campaign/:id/status` - Get campaign status
- `GET /v1/kol/:wallet/reputation` - Get KOL reputation
- `GET /v1/kol/:wallet/fraud-check` - Run fraud detection
- `POST /v1/kol/campaign/:id/pause` - Pause campaign
- `POST /v1/webhooks/subscribe` - Subscribe to events

### Documentation

- Complete API documentation
- SDK guide with examples
- Authentication guide
- Error codes reference
- FAQ and troubleshooting

### Examples

- Twitter campaign example
- TikTok affiliate example
- Discord community rewards example
- Batch settlement example

---

## [0.5.0] - 2024-01-08

### Added

- Beta release of SDK
- Basic campaign creation
- Single payment processing
- KOL reputation tracking (basic)

### Known Issues

- Batch settlement limited to 250 payments
- No webhook support yet
- Limited error handling

---

## Planned Features

### [1.1.0] - Q1 2024

- [ ] Multi-chain support (Ethereum, Polygon, Arbitrum)
- [ ] Additional stablecoins (USDT, DAI)
- [ ] Advanced analytics dashboard
- [ ] Automated dispute resolution
- [ ] Payment refunds

### [1.2.0] - Q2 2024

- [ ] Creator marketplace
- [ ] Automated verification system
- [ ] Performance optimizations
- [ ] Python SDK
- [ ] Go SDK

### [2.0.0] - Q3 2024

- [ ] Governance token (402)
- [ ] DAO treasury management
- [ ] Community voting on disputes
- [ ] Advanced reputation algorithms
- [ ] Custom payment triggers

---

## Migration Guides

### From 0.5.0 to 1.0.0

**Breaking Changes:**

1. `X402` client initialization changed:

```typescript
// Old (0.5.0)
const client = new X402SDK({apiKey: '...'})

// New (1.0.0)
const client = new X402({
  apiKey: '...',
  baseUrl: 'https://api.x402rails.io',
  chain: 'bsc'
})
```

2. Payment release signature changed:

```typescript
// Old
await client.releasePayment(campaignId, wallet, amount)

// New
await client.payment.release({
  campaignId,
  kolWallet: wallet,
  amount,
  postId,
  proof
})
```

3. Error types changed:

```typescript
// Old
catch (e: X402Error)

// New
catch (e: PaymentError | CampaignError)
```

---

## Support

- **Discord**: [Join our server](https://discord.gg/x402rails)
- **GitHub Issues**: [Report bugs](https://github.com/x402-rails/sdk/issues)
- **Documentation**: [docs.x402rails.io](https://docs.x402rails.io)

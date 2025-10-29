# Contributing to 402 Rails

Thank you for your interest in contributing to 402! We welcome contributions of all kinds.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

---

## 🤝 Code of Conduct

We are committed to providing a welcoming and inspiring community for all.

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on what is best for the community
- Report unacceptable behavior to maintainers

---

## 🚀 How to Contribute

### Types of Contributions

1. **Bug Reports**: Found a bug? [Open an issue](https://github.com/x402-rails/sdk/issues)
2. **Feature Requests**: Have an idea? [Discuss it](https://github.com/x402-rails/sdk/discussions)
3. **Code**: Fix bugs, add features, or improve documentation
4. **Documentation**: Help improve docs, examples, or guides
5. **Testing**: Write tests or report edge cases

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/x402-rails/sdk.git
cd sdk

# Install dependencies
npm install

# Install pre-commit hooks
npm run prepare
```

### Project Structure

```
sdk/
├── src/
│   ├── client/          # Main SDK client
│   ├── types/           # TypeScript type definitions
│   ├── api/             # API endpoint wrappers
│   ├── utils/           # Utility functions
│   └── index.ts         # Main export
├── tests/               # Test files
├── docs/                # Documentation
├── examples/            # Code examples
└── package.json         # Dependencies
```

---

## 📝 Making Changes

### 1. Create a Branch

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Your Changes

```bash
# Edit files
# Make sure to follow coding standards (see below)
```

### 3. Test Your Changes

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- tests/specific.test.ts
```

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add new payment rule trigger system"
```

### Commit Message Format

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests

**Examples:**
```
feat(api): add webhook subscription endpoint
fix(payment): resolve batch settlement race condition
docs(sdk): update authentication guide
test(reputation): add fraud score calculation tests
```

---

## ✅ Submitting Changes

### 1. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 2. Create a Pull Request

- Go to [GitHub](https://github.com/x402-rails/sdk)
- Click "New Pull Request"
- Select your branch
- Fill out the PR template
- Submit

### PR Title Format

```
[type] Brief description

Example: [Feature] Add webhook event filtering
```

### PR Description

Include:
- What problem does this solve?
- How was it tested?
- Any breaking changes?
- Related issues (#123)

### 3. Code Review

- Maintainers will review your PR
- Address feedback and make changes
- Once approved, your PR will be merged!

---

## 💻 Coding Standards

### TypeScript

```typescript
// Use strict mode
"use strict"

// Type everything
interface PaymentConfig {
  campaignId: string
  amount: number
  wallet: string
}

// Use const/let, not var
const client = new X402({...})

// Use arrow functions
const handlePayment = async (config: PaymentConfig) => {
  // Implementation
}

// Document complex functions
/**
 * Release payment for a verified post
 * @param config - Payment configuration
 * @returns Payment transaction hash
 * @throws Error if escrow insufficient
 */
async release(config: PaymentConfig): Promise<string> {
  // Implementation
}
```

### Naming Conventions

```typescript
// Classes: PascalCase
class X402Client {}

// Functions/variables: camelCase
const releasePayment = () => {}

// Constants: UPPER_SNAKE_CASE
const MAX_BATCH_SIZE = 500

// Private properties: leading underscore
private _apiKey: string

// Booleans: is/has/can prefix
const isValid = true
const hasPermission = true
const canRetry = true
```

### Code Style

```typescript
// Use semicolons
const x = 5;

// Use single quotes for strings
const message = 'Hello, world!';

// Use 2-space indentation
if (condition) {
  console.log('test');
}

// Max line length: 100 characters
const veryLongVariableName =
  'This is a long value that exceeds the line limit';

// Use template literals
const message = `Hello, ${name}!`;
```

### Error Handling

```typescript
// Create custom errors
class InsufficientEscrowError extends Error {
  constructor(available: number, required: number) {
    super(`Escrow has ${available}, but ${required} required`);
    this.name = 'InsufficientEscrowError';
  }
}

// Throw meaningful errors
if (escrow < amount) {
  throw new InsufficientEscrowError(escrow, amount);
}

// Always handle errors in async code
try {
  await client.payment.release(config);
} catch (error) {
  if (error instanceof InsufficientEscrowError) {
    // Handle specific error
  } else {
    // Handle generic error
    throw error;
  }
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- tests/api/payment.test.ts

# Run with coverage report
npm run test:coverage
```

### Writing Tests

```typescript
import { describe, it, expect, beforeEach } from '@jest/globals';
import { X402 } from '../src/index';

describe('Payment API', () => {
  let client: X402;

  beforeEach(() => {
    client = new X402({
      apiKey: 'sk_test_...',
      baseUrl: 'https://testnet-api.x402rails.io'
    });
  });

  it('should release payment for verified post', async () => {
    const result = await client.payment.release({
      campaignId: 'camp_test_123',
      kolWallet: '0x...',
      amount: 100,
      postId: 'tweet_123',
      proof: '0xsignature...'
    });

    expect(result).toHaveProperty('txHash');
    expect(result.status).toBe('confirmed');
  });

  it('should throw error if escrow insufficient', async () => {
    await expect(
      client.payment.release({
        campaignId: 'camp_test_insufficient',
        kolWallet: '0x...',
        amount: 999999999,
        postId: 'tweet_123',
        proof: '0xsignature...'
      })
    ).rejects.toThrow('Insufficient escrow');
  });
});
```

### Test Coverage

- Aim for >80% coverage
- Test happy paths and error cases
- Mock external dependencies
- Use fixtures for test data

---

## 📚 Documentation

### Code Comments

```typescript
// Good: Explains WHY, not WHAT
// We use exponential backoff to avoid overwhelming the API
const retryDelay = Math.pow(2, attempt) * 1000;

// Bad: States obvious
// Multiply attempt by 1000
const retryDelay = attempt * 1000;
```

### JSDoc Comments

```typescript
/**
 * Create a new campaign with escrow
 *
 * @param config - Campaign configuration object
 * @param config.campaignId - Unique campaign identifier
 * @param config.budget - Total USDC to lock in escrow
 * @param config.duration - Campaign duration in seconds
 * @returns Promise resolving to campaign object
 * @throws InsufficientFundsError if account lacks funds
 *
 * @example
 * const campaign = await client.campaign.createEscrow({
 *   campaignId: 'camp_abc123',
 *   budget: 50000,
 *   duration: 30 * 24 * 3600
 * });
 */
async createEscrow(config: EscrowConfig): Promise<Campaign> {
  // Implementation
}
```

---

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: What is the bug?
2. **Reproduction**: Steps to reproduce
3. **Expected**: What should happen?
4. **Actual**: What actually happened?
5. **Environment**: Node version, OS, etc
6. **Code**: Minimal reproducible example

### Example Issue Template

```markdown
## Bug Report: Payment Release Fails Silently

### Description
Payment releases are not triggering payment.released webhook events.

### Reproduction
1. Create campaign with webhook
2. Release payment with client.payment.release()
3. Check webhook endpoint

### Expected
Webhook should be called within 5 seconds

### Actual
Webhook is never called

### Environment
- Node: 18.0.0
- SDK: 1.0.5
- OS: macOS 12.5

### Code
```typescript
const payment = await client.payment.release({...});
// Never received webhook event
```
```

---

## 🚀 Release Process

### Version Numbering

We use semantic versioning: MAJOR.MINOR.PATCH

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes

### Steps to Release

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release commit: `chore(release): v1.2.3`
4. Create git tag: `git tag v1.2.3`
5. Push to GitHub: `git push && git push --tags`
6. NPM will auto-publish via CI/CD

---

## 📖 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Guide](https://jestjs.io/docs/getting-started)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

## ❓ Questions?

- Ask in [Discussions](https://github.com/x402-rails/sdk/discussions)
- Join our [Discord](https://discord.gg/x402rails)
- Email: dev@x402rails.io

---

**Thank you for contributing to 402! 🙏**

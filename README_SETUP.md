# 402 Rails SDK - GitHub Repository Setup

This is a complete, ready-to-go GitHub repository for the 402 Rails SDK.

## 📁 Structure

```
x402-rails/sdk/
├── src/                          # Source code
│   ├── index.ts                  # Main export
│   ├── types.ts                  # TypeScript types
│   ├── client.ts                 # Main client class
│   ├── api/                      # API implementations
│   │   ├── campaigns.ts
│   │   ├── payments.ts
│   │   ├── batch.ts
│   │   ├── kol.ts
│   │   └── webhooks.ts
│   └── utils/                    # Utilities
│       ├── errors.ts
│       ├── retry.ts
│       └── logger.ts
├── tests/                        # Test files
│   ├── client.test.ts
│   ├── api/
│   │   ├── campaigns.test.ts
│   │   ├── payments.test.ts
│   │   └── batch.test.ts
│   └── fixtures/
├── examples/                     # Examples
│   ├── twitter-campaign.ts
│   ├── tiktok-affiliate.ts
│   ├── discord-rewards.ts
│   └── batch-settlement.ts
├── docs/                         # Documentation
│   ├── api-reference.md
│   ├── sdk-guide.md
│   └── examples.md
├── .github/                      # GitHub files
│   ├── workflows/
│   │   ├── test.yml
│   │   └── publish.yml
│   ├── CODEOWNERS
│   └── ISSUE_TEMPLATE/
├── .gitignore
├── .eslintrc.json               # (Add if needed)
├── .prettierrc                  # (Add if needed)
├── jest.config.js               # (Add if needed)
├── tsconfig.json
├── package.json
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── LICENSE
```

## 🚀 Quick Start

### 1. Create Repository
```bash
cd /path/to/repo
git init
git add .
git commit -m "chore(init): initial project setup"
git branch -M main
git remote add origin https://github.com/x402-rails/sdk.git
git push -u origin main
```

### 2. Add Secrets to GitHub
1. Go to Settings → Secrets and variables
2. Add `NPM_TOKEN` (get from npmjs.com)

### 3. Create Branches
```bash
git checkout -b develop
git push -u origin develop
```

### 4. Configure Branch Protection
1. Settings → Branches
2. Add rule for `main`
3. Require PR reviews
4. Require status checks

### 5. First Release
```bash
npm version 1.0.0
git push && git push --tags
npm publish
```

## 📦 NPM Publishing

The `publish.yml` workflow will automatically:
1. Run tests
2. Build the project
3. Publish to NPM when a tag is pushed

```bash
npm version minor    # Updates version
git push --tags      # Triggers workflow
```

## 🧪 Testing

```bash
npm install
npm test                 # Run tests
npm run test:coverage    # With coverage
npm run lint            # Run linter
npm run build           # Build project
```

## 📚 Next Steps

1. Implement the API modules in `src/api/`
2. Add test files in `tests/`
3. Add examples in `examples/`
4. Update documentation
5. Push to GitHub
6. Create releases

## 🔗 Links

- Main Website: [402-payment-rails.html](../402-payment-rails.html)
- Documentation: [docs.html](../docs.html)
- GitHub: https://github.com/x402-rails/sdk

---

**Ready to launch! 🚀**

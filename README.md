# 🏦 Fractional RWA Bonds
### *Democratizing the "Risk-Free Rate" through Blockchain Tokenization.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Network: Polygon Amoy](https://img.shields.io/badge/Network-Polygon_Amoy-blueviolet.svg)]()
[![Theme: Glassmorphism](https://img.shields.io/badge/Theme-Safety_Blue-3b82f6.svg)]()

---

## 🎯 Project Overview
**Fractional RWA Bonds** is a Web3 Proof-of-Concept (PoC) demonstrating how government bonds can be tokenized into fractional digital assets. This platform enables users to invest small amounts using stablecoins, earn automated yields, and track returns transparently via smart contracts.

### 🚩 The Problem
* **High Barriers:** Government bonds usually require $1,000+ minimums.
* **Complexity:** Onboarding involves intermediaries and slow bank APIs.
* **Lack of Access:** Students and young earners are often excluded from low-risk wealth building.

### 💡 The Solution (Prototype Scope)
This project proves that blockchain can solve these issues by:
* Dividing bonds into **fractional units** (ERC-20).
* Automating **yield distribution** (Smart Contract logic).
* Using **Stablecoins** for instant, 24/7 settlement.

> **Note:** This is a technical demo. Real government bonds, RBI/SEBI compliance, and bank APIs are simulated to focus on core technical feasibility.

---

## 🏗️ System Architecture
The system follows a 3-tier Web3 architecture:

**User (Browser)** → **Frontend (React)** → **Smart Contracts (Solidity)** → **Mock Stablecoin**

1. **Invest:** User pays Mock Stablecoins to the contract.
2. **Mint:** Contract mints `fBOND` tokens proportionally.
3. **Yield:** Interest accrues every second based on time-weighted principal.
4. **Redeem:** User burns tokens to receive original capital + interest.

---

## 🛠️ Tech Stack
| Layer          | Technology                          |
| :------------- | :---------------------------------- |
| **Blockchain** | Solidity, Hardhat, Polygon/Sepolia |
| **Tokens** | ERC-20 Standard (Fractional Units)  |
| **Frontend** | React.js, Tailwind CSS, Framer Motion|
| **Web3 Libs** | Ethers.js, Wagmi, MetaMask          |

---

## 📁 Project Structure

```text
fractional-rwa-bonds/
├── blockchain/                # Smart Contract Development
│   ├── contracts/             
│   │   ├── FractionalBond.sol # Core RWA Yield logic
│   │   └── MockStablecoin.sol # Simulated USDC for testing
│   ├── scripts/               
│   │   └── deploy.js          # Deployment script for Testnet
│   └── test/                  # Interest calculation tests
│
├── frontend/                  # React Application
│   ├── src/
│   │   ├── components/        # Glassmorphic UI (Safety Blue)
│   │   │   ├── BondCard.jsx   # Live-ticking balance card
│   │   │   └── InvestForm.jsx # Deposit/Withdrawal UI
│   │   ├── App.js             # Main Dashboard
│   │   └── constants.js       # ABIs & Contract Addresses
│   └── tailwind.config.js     # Custom Glassmorphism styles
│
└── README.md                  # Project documentation

## 🧮 Yield Logic
The contract uses a linear interest formula calculated per second:

```text
Interest = (Principal × APY × Δt) / (SecondsInYear × 10000)
```

- **Principal:** user's deposited amount (in the stablecoin unit)
- **APY:** annual percentage yield in basis points (bps) — e.g. 500 = 5.00%
- **Δt:** elapsed time in seconds
- **SecondsInYear:** 31,536,000 (365 × 24 × 3600)

This enables the frontend to render a "Live Pulse" where the user's balance increases in real-time.

## 🚀 Getting Started
1. Clone & install

```bash
git clone https://github.com/your-username/fractional-rwa-bonds.git
cd fractional-rwa-bonds
npm install
```

2. Deploy Contracts (Local Node)

```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

3. Run tests

```bash
npx hardhat test
```

4. Run frontend (if present)

```bash
cd frontend
npm run dev
```

## 🧪 Testing
- Unit tests for interest calculation and contract behavior are in `blockchain/test`.
- Tests use a `MockStablecoin` to simulate stablecoin interactions.

## Contributing
Contributions are welcome — open issues or submit a PR with a clear description and tests.

## License
This project is licensed under the MIT License. See `LICENSE` for details.

---

✍️ Author: Reverie — Computer Engineering Student

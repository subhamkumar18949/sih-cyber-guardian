# Cyber Guardian 🛡️ - SIH 2025 (PS ID: 25161)

Team: Athltech
Theme: Blockchain & Cybersecurity
Problem: Mitigating National Security Risks Posed by Large Language Models (LLMs) in AI-Driven Malign Information Operations.

# Project Description

Cyber Guardian is a multi-modal AI and blockchain platform designed to automatically detect, analyze, and neutralize AI-driven malign information operations. It addresses the challenge of rapidly detecting AI-generated disinformation at scale by integrating advanced AI models with an immutable blockchain ledger, providing a secure and verifiable system for national security.

# Key Features

* **Multi-Modal Analysis:** Analyzes **text**, **images**, and **videos** for signs of AI generation, toxicity, and malicious sentiment using a suite of specialized AI models.
* **Custom AI Detector:** Utilizes a custom-trained **DistilBERT** model for high-accuracy detection of AI-generated text.
* **Advanced Image/Video Analysis:** Employs **OpenAI's CLIP** model for semantic analysis to identify AI-generated or manipulated visual content.
* **Immutable Blockchain Ledger:** Records a unique **SHA256 hash** of detected threats onto the **Sepolia blockchain** via a Solidity smart contract, creating a tamper-proof audit trail.
* **Database Logging:** Stores all analysis results, including scores, threat status, content hash, and blockchain transaction hash, in a **MongoDB** database for historical review.
* **Interactive Dashboard:** A modern React frontend provides a user-friendly interface for submitting content, viewing detailed analysis reports, and monitoring a live history feed from the database.
* **Static File Serving:** Serves analyzed images and videos directly from the backend for review via the dashboard history.

# 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Axios, Ethers.js
* **Backend:** Python, FastAPI, Uvicorn, Web3.py, Pillow, OpenCV, NumPy
* **AI/ML:** Hugging Face Transformers, PyTorch, Custom DistilBERT, `martin-ha/toxic-comment-model`, `cardiffnlp/twitter-roberta-base-sentiment-latest`, `openai/clip-vit-large-patch14`, Pandas, Scikit-learn
* **Blockchain:** Solidity, Foundry (Forge), OpenZeppelin Contracts, Sepolia Testnet, Alchemy, MetaMask
* **Database:** MongoDB (Community Server / Atlas), PyMongo
* **Tooling:** Git, GitHub, VS Code, venv, npm

## ⚙️ Setup & Installation

**Prerequisites:**
* Python 3.9+
* Node.js & npm
* Git
* Foundry (installation instructions: [Foundry Book](https://book.getfoundry.sh/getting-started/installation))
* MongoDB Community Server (or MongoDB Atlas account)
* MetaMask browser extension

**Steps:**

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/sih-cyber-guardian.git](https://github.com/your-username/sih-cyber-guardian.git)
    cd sih-cyber-guardian
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    python -m venv ../venv # Create venv in the root project folder
    ../venv/Scripts/activate # Activate venv (use source ../venv/bin/activate on Mac/Linux)
    pip install -r requirements.txt
    cp ../sih2/out/AlertContract.sol/AlertContract.json . # Copy ABI file
    # Create and populate backend/.env file with your keys (see example above)
    cd ..
    ```

3.  **Smart Contract Setup (Optional - If you need to re-deploy):**
    ```bash
    cd sih2
    forge install OpenZeppelin/openzeppelin-contracts
    forge build
    # (Optional) Deploy: forge create --rpc-url ... --private-key ... src/AlertContract.sol:AlertContract --broadcast
    cd ..
    ```

4.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    # Create and populate frontend/.env file with your keys (see example above)
    cd ..
    ```

5.  **Train Custom AI Model (One-Time Setup):**
    * Ensure your backend `venv` is active.
    * Navigate to the `backend` folder.
    * Run the training script (this will take a while):
        ```bash
        python train.py
        ```
    * This creates the `my_custom_ai_detector` folder.

## ▶️ Running the Project

You need **three terminals** running simultaneously.

1.  **Terminal 1: Start MongoDB Server**
    ```bash
    mongod
    ```
    *(Leave this running)*

2.  **Terminal 2: Start Backend API**
    ```bash
    cd backend
    ../venv/Scripts/activate
    uvicorn main:app --reload
    ```
    *(Leave this running)*

3.  **Terminal 3: Start Frontend Dashboard**
    ```bash
    cd frontend
    npm run dev
    ```

Open your browser to `http://localhost:5173` (or the port specified by Vite) to access the Cyber Guardian dashboard.

## 🚀 Usage

1.  **Analyze Content:**
    * Paste text into the text area OR click the "Upload Media" button to select an image or video file.
    * Click "Analyze".
2.  **View Results:**
    * The "Analysis Report" panel will display the scores, threat status, and blockchain transaction hash (if applicable).
3.  **Check History:**
    * Scroll down to the "Analysis History" table to see all past analyses fetched from the database. Click on file paths to view uploaded media.
4.  **Monitor Live Threats:**
    * The "Live Threat Feed" panel shows the latest threats recorded directly from the blockchain.

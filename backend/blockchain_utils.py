# backend/blockchain_utils.py
import json
from web3 import Web3
from config import RPC_URL, PRIVATE_KEY, WALLET_ADDRESS, CONTRACT_ADDRESS, ABI_FILE_PATH

w3 = None
contract = None
contract_abi = None

try:
    with open(ABI_FILE_PATH) as f:
        contract_json = json.load(f)
        contract_abi = contract_json.get('abi')
    if contract_abi:
        print("Contract ABI loaded successfully.")
        w3 = Web3(Web3.HTTPProvider(RPC_URL))
        if w3.is_connected():
            contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)
            print("Connected to blockchain.")
        else:
            print("Failed to connect to blockchain RPC.")
            contract = None
    else:
        print("ABI not found in JSON file.")
        contract = None
except FileNotFoundError:
    print(f"Error: Could not find ABI file at {ABI_FILE_PATH}.")
    contract = None
except Exception as e:
    print(f"Error loading contract ABI or connecting to blockchain: {e}.")
    contract = None

def log_threat_to_blockchain(content_hash: str):
    """Logs a threat hash to the blockchain if connected."""
    if not contract or not w3 or not WALLET_ADDRESS or not PRIVATE_KEY:
        print("Blockchain not configured or connected. Skipping transaction.")
        return None
    try:
        print(f"Logging hash to blockchain: {content_hash}...")
        gas_estimate = contract.functions.createAlert(content_hash).estimate_gas({'from': WALLET_ADDRESS})
        nonce = w3.eth.get_transaction_count(WALLET_ADDRESS)
        tx = contract.functions.createAlert(content_hash).build_transaction({
            'chainId': 11155111, # Sepolia Chain ID
            'gas': gas_estimate,
            'gasPrice': w3.eth.gas_price,
            'from': WALLET_ADDRESS,
            'nonce': nonce
        })
        signed_tx = w3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)
        sent_tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        tx_hash = sent_tx_hash.hex()
        print(f"Transaction sent successfully! Hash: {tx_hash}")
        return tx_hash
    except Exception as e:
        print(f"Error logging to blockchain: {e}")
        return None
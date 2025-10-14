from transformers import AutoModelForSequenceClassification, AutoTokenizer
import os # <-- 1. IMPORT THE 'os' MODULE

# Define the name for your new model repository on Hugging Face
# IMPORTANT: Replace 'your-hf-username' with your actual username
repo_name = "subham18949/sih-cyber-guardian-detector"

# The path to your locally saved model
relative_model_path = "./my_custom_ai_detector"

# --- THE FIX ---
# Convert the relative path to a full, absolute path
local_model_path = os.path.abspath(relative_model_path)
# ----------------

print(f"Loading model from absolute path: {local_model_path}...")
model = AutoModelForSequenceClassification.from_pretrained(local_model_path)
tokenizer = AutoTokenizer.from_pretrained(local_model_path)

print(f"Uploading model to Hugging Face Hub at: {repo_name}")
# This command uploads all the files to your new repository
model.push_to_hub(repo_name)
tokenizer.push_to_hub(repo_name)

print("Upload complete!")
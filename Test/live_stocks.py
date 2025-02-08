import finnhub
import time
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
FINHUB_API_KEY = os.getenv("FINHUB_API_KEY")

# Initialize Firebase Admin SDK
cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

finnhub_client = finnhub.Client(api_key=FINHUB_API_KEY)

# List of stocks
stocks = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS", "KOTAKBANK.NS", 
          "HINDUNILVR.NS", "LT.NS", "SBIN.NS", "BHARTIARTL.NS", "ITC.NS", "BAJFINANCE.NS", 
          "AXISBANK.NS", "HCLTECH.NS", "MARUTI.NS", "M&M.NS", "ASIANPAINT.NS", "NESTLEIND.NS", 
          "ULTRACEMCO.NS", "SUNPHARMA.NS", "TITAN.NS", "DRREDDY.NS", "WIPRO.NS", "ADANIPORTS.NS", 
          "POWERGRID.NS", "GRASIM.NS", "NTPC.NS", "ONGC.NS", "INDUSINDBK.NS", "BAJAJFINSV.NS"]

while True:
    for stock in stocks:
        quote = finnhub_client.quote(stock)
        current_time = datetime.now().isoformat()
        doc_ref = db.collection("live stocks").document(stock).collection("entries").document(current_time)
        doc_ref.set({
            "Current price": quote['c'],
            "Change": quote['d'],
            "Percent change": quote['dp'],
            "High price of the day": quote['h'],
            "Low price of the day": quote['l'],
            "Open price of the day": quote['o'],
            "Previous close price": quote['pc'],
            "Timestamp": current_time
        })
        time.sleep(0.25)
    time.sleep(60)

print("Done")
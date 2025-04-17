import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]
DUMMY_DATA_PATH = BASE_DIR / "source" / "dummyData.json"

def load_dummy_data():
    with open(DUMMY_DATA_PATH, "r") as f:
        return json.load(f)
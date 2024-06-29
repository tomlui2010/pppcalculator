
"""
firestore_ppp.py

This module provides utilities for interacting with a Firestore database to
persist and retrieve data related to the Purchasing Power Parity (PPP) of 
different countries.

The module uses Firebase's Firestore as the backend storage and includes functions to:
- Persist PPP data to the Firestore database.
- Validate the existence of PPP data in the Firestore database.
- Retrieve PPP data for a specific country from the Firestore database.

Dependencies:
    - firebase_admin: For initializing Firebase app and interacting with Firestore.
    - json: For parsing JSON data.

Setup:
    Ensure the Firebase credentials JSON file is located at 
    'secrets/ppp-tomlui-firebase.json'. This file is required to authenticate 
    and initialize the Firebase app.

Classes and Functions:
    - persist(data): Persists provided PPP data to the Firestore database if 
        not already present.
    - validate(): Checks if the PPP data for the country with ID 'IND' exists 
        in the Firestore database.
    - get_ppp_data(country): Retrieves PPP data for a specified country from 
        the Firestore database.

Usage Example:
    >>> data = '[{"country_id": "IND", "ppp_value": 20}, {"country_id": "USA", "ppp_value": 60}]'
    >>> persist(data)
    Checking if the data store is current and live
    Data is successfully stored in the firebase db

    >>> get_ppp_data('IND')
    {'country_id': 'IND', 'ppp_value': 20}

Author:
    Thomas Louis

Version:
    1.0

Date:
    2024-06-28
"""
import json
import os, base64
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

secret = os.environ.get("SECRET_FILE")

# cred = credentials.Certificate("backend/secrets/ppp-tomlui-firebase.json")
cred = credentials.Certificate(json.loads(base64.b64decode(secret)))
firebase_admin.initialize_app(cred)

db = firestore.client()

def persist(data):
    """
    Persists Purchasing Power Parity (PPP) data to the Firestore database.

    This function checks if the PPP data is already present in the Firestore database.
    If the data is not present, it parses the input JSON data and stores each entry in the 
    Firestore collection named 'PPPCollection'. The data is keyed by 'country_id'.

    Args:
        data (str): A JSON string representing a list of PPP data entries. Each entry is 
                    expected to be a dictionary with a 'country_id' key and other related data.

    Returns:
        bool: True if the data was successfully stored in the Firestore database, False otherwise.

    Side Effects:
        - Prints status messages to the console during the process.
        - Calls the `validate` function to check if the data is already persisted.

    Raises:
        json.JSONDecodeError: If the input `data` is not a valid JSON string.
    
    Example:
        >>> data = '[{"country_id": "IND", "ppp_value": 20}, 
            {"country_id": "USA", "ppp_value": 60}]'
        >>> persist(data)
        Checking if the data store is current and live
        Data is successfully stored in the firebase db
        True
    """
    print("Checking if the data store is current and live")
    datapersistedinthestore = validate()
    if datapersistedinthestore:
        print("Data is already persisted in the Firebase store")
        return datapersistedinthestore
    else:
        parsed_data = json.loads(data)
        for entry in parsed_data:
            doc_collection = db.collection('PPPCollection')
            doc_ref = doc_collection.document(entry['country_id'])        
            doc_ref.set(entry)
        if validate():
            print("Data is successfully stored in the firebase db")
            return True
        else: 
            print("Data is not persisted in the db. Please check ")
            return False


def validate():
    """
    Validates the existence of Purchasing Power Parity (PPP) data for India 
    in the Firestore database.

    This function checks whether a document with the country ID 'IND' exists in the 'PPPCollection'
    collection in the Firestore database. It is used to determine if the PPP data for India 
    is already stored in the database.

    Returns:
        bool: True if the document with the country ID 'IND' exists in the Firestore collection, 
              False otherwise.

    Example:
        >>> validate()
        True  # if the document with 'IND' exists in 'PPPCollection'
        
        >>> validate()
        False  # if the document with 'IND' does not exist in 'PPPCollection'
    """
    doc_collection = db.collection('PPPCollection')
    doc_ref = doc_collection.document("IND")
    doc = doc_ref.get()
    return doc.exists

def get_ppp_data(country):
    """
    Retrieves Purchasing Power Parity (PPP) data for a specified country from 
    the Firestore database.

    This function queries the Firestore database for a document in the 
    'PPPCollection' collection that matches the provided country ID. 
    The country ID is converted to uppercase to ensure consistency in the query.
    If the document exists, it returns the data as a dictionary. 
    If the document does not exist, it returns None.

    Args:
        country (str): The country ID for which to retrieve the PPP data. 
        This ID should be in a format that can be converted to an uppercase string.

    Returns:
        dict: A dictionary containing the PPP data for the specified country if it exists.
              The dictionary's structure typically mirrors the stored document fields.
        None: If the document for the specified country does not exist in the database.

    Example:
        >>> get_ppp_data('USA')
        {'country_id': 'USA', 'ppp_value': 60, ...}

        >>> get_ppp_data('IND')
        {'country_id': 'IND', 'ppp_value': 20, ...}

        >>> get_ppp_data('XYZ')
        None  # if there is no document with 'XYZ' in 'PPPCollection'
    """
    doc = db.collection('PPPCollection').document(str(country).upper()).get()
    if doc.exists:
        return doc.to_dict()
    else:
        return None
    
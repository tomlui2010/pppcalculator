"""app.py - PPP Calculator API

This module implements a Flask-based web application for calculating Purchasing Power Parity (PPP).
It fetches real-time data from the World Bank API, persists the data into a Firebase Firestore,
and provides an endpoint for PPP calculations between different countries."""


from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import backend.src.worldbank_api as worldbank_api
import backend.src.firebase_store as firebase_store


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def home():
    """
    Home route of the PPP Calculator API.

    This endpoint provides a simple welcome message indicating the presence of the PPP calculator API.

    Returns:
        str: A welcome message for the API.
        
    Example:
        GET /
        Response: "Welcome to PPP calculator"
    """
    return "Welcome to PPP calculator"


@app.get('/fetchlivedata')
def fetch():
    """
    Fetch and persist PPP data from the World Bank API.

    This endpoint retrieves the latest PPP data from the World Bank API and stores it in the Firebase Firestore.
    It returns a JSON response indicating whether the data fetching and persistence were successful.

    Returns:
        flask.Response: A JSON response with the status of the data fetch and persistence process.
            - If successful:
                {
                    "message": "PPP data fetched and persisted successfully",
                    "success": "True",
                    "data": [list of PPP data],
                    "status": 200
                }
            - If unsuccessful:
                {
                    "message": "Data retrieval failed",
                    "success": "False",
                    "status": 404
                }

    Example:
        GET /fetchlivedata
        Response:
        {
            "message": "PPP data fetched and persisted successfully",
            "success": "True",
            "data": [
                {"country_id": "USA", "country": "United States", "date": "2021", "value": "1.23"},
                ...
            ],
            "status": 200
        }
    """
    ppp_data = worldbank_api.fetch_ppp_data()
    data_persisted = firebase_store.persist(ppp_data)
    if data_persisted:
        return jsonify(
                    message="PPP data fetched and persisted successfully",
                    success="True",
                    data=ppp_data,
                    status=200
                )
    else:
        return jsonify(
            message="Data retrieval failed",
            success="False",
            # data=ppp_data
            status=404
        )

@app.route("/calculate", methods=["POST"], strict_slashes=False)
@cross_origin()
def calculate():
    """
    Calculate PPP-adjusted income between countries.

    This endpoint calculates the Purchasing Power Parity (PPP)-adjusted income for a given source and target country.
    It requires the income and country codes in the request body.

    Request JSON Structure:
        {
            "income": float,          # The user's income in the source country's currency.
            "srcCountry": str,        # The ISO country code of the source country.
            "targetCountry": str      # The ISO country code of the target country.
        }

    Returns:
        flask.Response: A JSON response with the calculated PPP value or an error message if the data is not found.
            - If successful:
                {
                    "message": "PPP calculated",
                    "success": "True",
                    "data": int,     # The PPP-adjusted income.
                    "status": 200
                }
            - If data not found:
                {
                    "message": "Error in PPP calculation, PPP data not found",
                    "success": "False",
                    "status": 404
                }

    Example:
        POST /calculate
        Request JSON:
        {
            "income": 50000,
            "srcCountry": "USA",
            "targetCountry": "IND"
        }
        Response:
        {
            "message": "PPP calculated",
            "success": "True",
            "data": 3650000,
            "status": 200
        }
    """
    income = request.json['income']
    src = request.json['srcCountry']
    target = request.json['targetCountry']
    data_target = firebase_store.get_ppp_data(target)
    data_src = firebase_store.get_ppp_data(src)
    if (data_target is None) or (data_src is None):
            return jsonify(message="Error in PPP calculation, PPP data not found",
            success="False",
            status=404)
    else:
        result=int(float(income)/float(data_src['value']) * float(data_target['value']))
        print(result)
        return jsonify(message="PPP calculated",
            success="True",
            data=result,
            status=200)


if __name__ == "__main__":
    # Flask app is set to listen on all interfaces
    app.run(host="0.0.0.0", port=5000)
    # app.run(debug=True)
    
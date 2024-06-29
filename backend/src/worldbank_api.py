import json
from datetime import datetime

import requests

def fetch_ppp_data():
    """
    Fetches and processes Purchasing Power Parity (PPP) data from the World Bank API.

    This function retrieves raw PPP data, reformats it to ensure unique entries for each country and date,
    and then filters the data to include only the latest entry for each country. The resulting data is
    returned as a JSON string.

    Returns:
        str: A JSON string representing the latest PPP data entries for each country, with each entry
             containing the country ID, country name, date, and PPP value.

    Example:
        >>> data = fetch_ppp_data()
        >>> print(data)
        '[{"country_id": "USA", "country": "United States", "date": "2020", "value": 1.234}, ...]'
    """
    live_data = get_raw_ppp_data()
    req_data = get_unique_countries_with_values(live_data)
    final_data_tobe_loaded = get_latest_entries_only(req_data)
    return final_data_tobe_loaded


def get_raw_ppp_data():
    """
    Retrieves raw PPP data from the World Bank API.

    This function sends a request to the World Bank API to fetch PPP data for all countries. It then
    parses the response to extract the relevant data entries.

    Returns:
        str: A JSON string representing the raw PPP data from the World Bank API.
        Each entry contains the country ISO3 code, country name, date, and PPP value.

    Raises:
        requests.RequestException: If the request to the World Bank API fails or times out.

    Example:
        >>> raw_data = get_raw_ppp_data()
        >>> print(raw_data)
        '[{"countryiso3code": "USA", "country": {"value": "United States"}, 
        "date": "2020", "value": 1.234}, ...]'
    """
    response = requests.get('https://api.worldbank.org/v2/country/all/indicator/PA.NUS.PPP?format=json&per_page=30000', timeout=5)
    parsed_data = json.loads(response.text)
    for item in parsed_data:
        if 'page' not in item:
            response = item
    return json.dumps(response)


def get_unique_countries_with_values(data):
    """
    Filters PPP data to ensure unique entries for each country and date with non-null values.

    This function processes the given raw PPP data to retain only unique entries 
    based on the combination of country ID, country name, and date. 
    It also filters out entries with null PPP values.

    Args:
        data (str): A JSON string representing the raw PPP data.

    Returns:
        str: A JSON string representing the filtered PPP data with unique entries
        and non-null values.

    Example:
        >>> raw_data = '[{"countryiso3code": "USA", 
            "country": {"value": "United States"}, 
            "date": "2020", "value": 1.234}, ...]'
        >>> unique_data = get_unique_countries_with_values(raw_data)
        >>> print(unique_data)
        '[{"country_id": "USA", "country": "United States", 
        "date": "2020", "value": 1.234}, ...]'
    """
    parsed_data = json.loads(data)
    unique_entries = {}
    for entry in parsed_data:
        country_id = entry['countryiso3code']
        country = entry['country']['value']
        date = entry['date']
        value = entry['value']
        if value is not None:
            key = (country_id, country, date)
            if key not in unique_entries:
                unique_entries[key] = value
    unique_entries_result = [{'country_id': country_id,'country': country, 
                              'date': date, 
                              'value': value} 
                             for (country_id, country, date), value 
                             in unique_entries.items()]
    return json.dumps(unique_entries_result)

def get_latest_entries_only(data):
    """
    Filters PPP data to include only the latest entry for each country.

    This function processes the given PPP data to retain only the most recent 
    entry for each country.
    The latest entry is determined based on the date field.

    Args:
        data (str): A JSON string representing the filtered PPP data with unique entries.

    Returns:
        str: A JSON string representing the latest PPP data entry for each country.

    Example:
        >>> unique_data = '[{"country_id": "USA", 
        "country": "United States", "date": "2020", "value": 1.234}, ...]'
        >>> latest_data = get_latest_entries_only(unique_data)
        >>> print(latest_data)
        '[{"country_id": "USA", "country": "United States", "date": "2020", "value": 1.234}, ...]'
    """
    entries = json.loads(data)
    latest_entries = {}
    for entry in entries:
        country_id = entry['country_id']
        country = entry['country']
        date = entry['date']
        value = entry['value']
        if country_id not in latest_entries:
            latest_entries[country_id] = {'country_id': country_id, 
                                          'country': country, 
                                          'date': date, 'value': value}
        else:
            existing_date = latest_entries[country_id]['date']
            if datetime(int(date), 1, 1) > datetime(int(existing_date), 1, 1):
                latest_entries[country_id] = {'country_id': country_id, 
                                              'country': country, 
                                              'date': date, 
                                              'value': value}
    latest_entries_result = [{'country_id': country_id, 
                              'country': latest_entries[country_id]['country'],
                              'date': latest_entries[country_id]['date'],
                              'value': latest_entries[country_id]['value']} 
                             for country_id in latest_entries]
    return json.dumps(latest_entries_result)

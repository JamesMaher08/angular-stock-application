#!/usr/bin/env python
#https://algotrading101.com/learn/iex-api-guide/
import os
import requests
import pandas as pd

core_url = 'https://cloud.iexapis.com/v1/'
sandbox_url = 'https://sandbox.iexapis.com/stable/'

token = os.environ.get('IEX_TOKEN')
test_token = os.environ.get('IEX_SANDBOX_TOKEN')

core_params = {'token': token}
sandbox_params = {'token': test_token}

#assign to use test or core values
base_url = sandbox_url
params = sandbox_params
# base_url = core_url
# params = core_params

def all_symbols():
    print("Getting all symbols")
    url = "https://api.iextrading.com/1.0/ref-data/symbols"
    resp = requests.get(url)
    resp.raise_for_status()
    return resp.json()

def key_stats(_symbol, _stat=None):
    print("Key Stats for: "+_symbol)
    endpoint = f'stock/{_symbol}/stats'
    if (_stat):
        endpoint += f'/_stat'

    print("Calling:"+base_url+endpoint)
    resp = requests.get(base_url+endpoint, params=params)
    resp.raise_for_status()
    return resp.json()

def peer_groups(_symbol):
    print("Peer groups for: " + _symbol)
    endpoint = f'stock/{_symbol}/peers'
    resp = requests.get(base_url+endpoint, params=params)
    resp.raise_for_status()
    return resp.json()

def logo(_symbol):
    print("Logo for:" + _symbol)
    endpoint = f'stock/{_symbol}/logo'
    resp = requests.get(base_url+endpoint, params=params)
    resp.raise_for_status()
    return resp.json()

def last_prices(_symbols):
    payload = params.copy()
    payload['symbols'] = _symbols
    endpoint = 'tops/last'
    resp = requests.get(base_url+endpoint, params=payload)
    resp.raise_for_status()
    return resp.json()

def last_price(_symbol):
    print("Last price info for: " + _symbol)
    payload = params.copy()
    payload['symbols'] = _symbol
    endpoint = f'tops/last'
    resp = requests.get(base_url+endpoint, params=payload)
    resp.raise_for_status()
    return resp.json()


def news(_symbol, _last=None):
    print("News for: "+_symbol)
    endpoint = f'stock/{_symbol}/news'
    if _last:
        endpoint += f'/last/{_last}'
    print(endpoint)
    resp = requests.get(base_url+endpoint, params=params)
    resp.raise_for_status()
    return resp.json()

def today_earnings():
    print("Today Earnings")
    endpoint = 'stock/market/today-earnings'
    resp = requests.get(base_url+endpoint, params=params)
    resp.raise_for_status()
    return resp.json()

# ~500 msgs
def historical_data(_symbol, _range=None, _date=None):
    print("Historical Data: "+_symbol)
    endpoint = f'{base_url}/stock/{_symbol}/chart'
    if _range:
        endpoint += f'/{_range}'
    elif _date:
        endpoint += f'/date/{_date}'

    resp = requests.get(endpoint, params=params)
    resp.raise_for_status()
    return pd.DataFrame(resp.json())

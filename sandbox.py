#!/usr/bin/env python
#https://algotrading101.com/learn/iex-api-guide/
from api_helper import *
from company_profile import CompanyProfile
import json


def start():
    print("Start")
    # ks = key_stats("AAPL")
    # print(ks)

    # print(ks["companyName"])

    # print(ksj)
    # print(ksj["companyName"])

    # comp = buildCompanyProfile(ks)
    # print(comp.dividendYield)

    # l = logo("AAPL")
    # print(l)

    symbols = all_symbols()
    print(symbols)

    
def buildCompanyProfile(_company):
    cp = CompanyProfile()
    cp.name = _company["companyName"]
    cp.marketCap = _company["marketcap"]
    cp.employees = _company["employees"]
    cp.dividendYield = _company["dividendYield"]
    cp.nextDividendDate = _company["nextDividendDate"]
    cp.nextEarningsDate = _company["nextEarningsDate"]
    return cp

start()
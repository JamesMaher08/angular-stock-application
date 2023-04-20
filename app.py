import random
import string
from api_helper import *
from company_profile import CompanyProfile

import cherrypy

class Application(object):
    @cherrypy.expose
    def index(self):
        return "Index!"

    @cherrypy.tools.json_out()
    @cherrypy.expose
    def company(self, company):
        ks = key_stats(company)
        print(ks)
        # comp = buildCompanyProfile(ks)
        # print (comp.name)
        return ks
    
def buildCompanyProfile(_company):
        cp = CompanyProfile()
        cp.name = _company["companyName"]
        cp.marketCap = _company["marketcap"]
        cp.employees = _company["employees"]
        cp.dividendYield = _company["dividendYield"]
        cp.nextDividendDate = _company["nextDividendDate"]
        cp.nextEarningsDate = _company["nextEarningsDate"]
        return cp


if __name__ == '__main__':
    conf = {
        '/': {
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Access-Control-Allow-Origin', 'http://localhost:4200')]
        }
    }
    cherrypy.quickstart(Application(), '/', conf)
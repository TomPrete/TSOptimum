'use strict'

const router = require('express').Router()
const {User, Company} = require('../db/models')
module.exports = router

// const userRoute = require('./users');
// const projectRoute = require('./projectRoute');
// const companyRoute = require('./companyRoute')



router.post('/', (req, res, next) => {
  return Company.bulkCreate(req.body)
    .then(company => res.json(company))
    .catch(next);
});

  //GET company by company ID
  router.get('/:companyId', (req, res, next) => {
		Company.findOne({where: {companyId: req.params.companyId}})
		.then(company => res.json(company))
		.catch(next);
  });

  //GET all companies
	router.get('/', (req, res, next) => {
		Company.findAll()
		.then(companies => res.json(companies))
		.catch(next);
	});

  //DELETE a company
  router.delete('/:companyId', (req, res, next) => {

    return Company.destroy({
      where: {
        companyId: req.params.companyId
      }
    })
    .then(affectedRows => res.status(200).json(affectedRows))
    .catch(next);
  });

  //UPDATE a company
  router.put('/', (req,res,next) => {
    for (let i=0; i < req.length; i++) {
      console.log("COMPANY: ", req[i]['companyId'])
    }
  })

  const companies = [
    {
      "name": "Wal-Mart Stores",
      "companyId": 10193405
    },
    {
      "name": "Exxon Mobil",
      "companyId": 89406722
    },
    {
      "name": "Chevron",
      "companyId": 51952520
    },
    {
      "name": "Berkshire,Hathaway",
      "companyId": 30011785
    },
    {
      "name": "Apple",
      "companyId": 74447565
    },
    {
      "name": "Phillips 66",
      "companyId": 49675569
    },
    {
      "name": "General Motors",
      "companyId": 31406116
    },
    {
      "name": "Ford Motor",
      "companyId": 68592404
    },
    {
      "name": "General Electric",
      "companyId": 72599849
    },
    {
      "name": "Valero Energy",
      "companyId": 63883759
    },
    {
      "name": "AT&T",
      "companyId": 30981171
    },
    {
      "name": "CVS Caremark",
      "companyId": 86780653
    },
    {
      "name": "Fannie Mae",
      "companyId": 37368519
    },
    {
      "name": "UnitedHealth Group",
      "companyId": 49140099
    },
    {
      "name": "McKesson",
      "companyId": 52095095
    },
    {
      "name": "Verizon Communications",
      "companyId": 36764073
    },
    {
      "name": "Hewlett-Packard",
      "companyId": 74562589
    },
    {
      "name": "J.P. Morgan Chase & Co.",
      "companyId": 66505780
    },
    {
      "name": "Costco Wholesale",
      "companyId": 43492780
    },
    {
      "name": "Express Scripts Holding",
      "companyId": 50098606
    },
    {
      "name": "Bank of America",
      "companyId": 22673642
    },
    {
      "name": "Cardinal Health",
      "companyId": 57145836
    },
    {
      "name": "International Business Machines",
      "companyId": 79447699
    },
    {
      "name": "Kroger",
      "companyId": 95907955
    },
    {
      "name": "Marathon Petroleum",
      "companyId": 37948672
    },
    {
      "name": "Citigroup",
      "companyId": 43667243
    },
    {
      "name": "Archer Daniels Midland",
      "companyId": 32516139
    },
    {
      "name": "AmerisourceBergen",
      "companyId": 78934991
    },
    {
      "name": "Wells Fargo",
      "companyId": 53500479
    },
    {
      "name": "Boeing",
      "companyId": 22126478
    },
    {
      "name": "Procter & Gamble",
      "companyId": 13176636
    },
    {
      "name": "Freddie Mac",
      "companyId": 61568182
    },
    {
      "name": "Home Depot",
      "companyId": 14081407
    },
    {
      "name": "Microsoft",
      "companyId": 39940116
    },
    {
      "name": "Amazon.com",
      "companyId": 96532963
    },
    {
      "name": "Target",
      "companyId": 65177243
    },
    {
      "name": "Walgreen Co.",
      "companyId": 98788716
    },
    {
      "name": "WellPoint",
      "companyId": 66689810
    },
    {
      "name": "Johnson & Johnson",
      "companyId": 36527679
    },
    {
      "name": "American International Group",
      "companyId": 56812825
    },
    {
      "name": "State Farm Insurance Cos.",
      "companyId": 62579932
    },
    {
      "name": "MetLife",
      "companyId": 26112060
    },
    {
      "name": "PepsiCo",
      "companyId": 53332146
    },
    {
      "name": "Comcast",
      "companyId": 51142627
    },
    {
      "name": "United Technologies",
      "companyId": 59611942
    },
    {
      "name": "Google",
      "companyId": 71910132
    },
    {
      "name": "ConocoPhillips",
      "companyId": 92193974
    },
    {
      "name": "Dow Chemical",
      "companyId": 47959951
    },
    {
      "name": "Caterpillar",
      "companyId": 86662099
    },
    {
      "name": "United Parcel Service",
      "companyId": 93519085
    },
    {
      "name": "Pfizer",
      "companyId": 71199640
    },
    {
      "name": "Lowe’s Companies",
      "companyId": 60080736
    },
    {
      "name": "Intel Corporation",
      "companyId": 43344638
    },
    {
      "name": "Energy Transfer Equity, L.P.",
      "companyId": 19295077
    },
    {
      "name": "Cisco Systems, Inc.",
      "companyId": 56102574
    },
    {
      "name": "Enterprise Products Partners L.P.",
      "companyId": 45862738
    },
    {
      "name": "Aetna Inc.",
      "companyId": 35409982
    },
    {
      "name": "The Coca-Cola Company",
      "companyId": 37856707
    },
    {
      "name": "Lockheed Martin Corporation",
      "companyId": 59352820
    },
    {
      "name": "Best Buy Co., Inc.",
      "companyId": 89865279
    },
    {
      "name": "The Walt Disney Company",
      "companyId": 19925445
    },
    {
      "name": "CHS Inc.",
      "companyId": 27871367
    },
    {
      "name": "Sysco Corporation",
      "companyId": 12454702
    },
    {
      "name": "FedEx Corporation",
      "companyId": 31449950
    },
    {
      "name": "Merck & Co., Inc.",
      "companyId": 82758752
    },
    {
      "name": "INTL FCStone Inc.",
      "companyId": 16220561
    },
    {
      "name": "Safeway Inc.",
      "companyId": 99836567
    },
    {
      "name": "Johnson Controls, Inc.",
      "companyId": 41488477
    },
    {
      "name": "Ingram Micro Inc.",
      "companyId": 24481896
    },
    {
      "name": "Plains GP Holdings, L.P.",
      "companyId": 70661867
    },
    {
      "name": "World Fuel Services Corporation",
      "companyId": 42841462
    },
    {
      "name": "Prudential Financial, Inc.",
      "companyId": 66158812
    },
    {
      "name": "Humana Inc.",
      "companyId": 94873745
    },
    {
      "name": "The Goldman Sachs Group, Inc.",
      "companyId": 63917499
    },
    {
      "name": "Tesoro Corporation",
      "companyId": 83995142
    },
    {
      "name": "Liberty Mutual Holding Company Inc.",
      "companyId": 22059429
    },
    {
      "name": "Honeywell International Inc.",
      "companyId": 44414565
    },
    {
      "name": "United Continental Holdings, Inc.",
      "companyId": 61291496
    },
    {
      "name": "HCA Holdings, Inc.",
      "companyId": 54272436
    },
    {
      "name": "Deere & Company",
      "companyId": 16570368
    },
    {
      "name": "Delta Air Lines, Inc.",
      "companyId": 98444194
    },
    {
      "name": "Oracle Corporation",
      "companyId": 91602080
    },
    {
      "name": "Morgan Stanley",
      "companyId": 33455466
    },
    {
      "name": "Hess Corporation",
      "companyId": 57762748
    },
    {
      "name": "Twenty-First Century Fox, Inc.",
      "companyId": 90849424
    },
    {
      "name": "E.I. du Pont de Nemours and Company",
      "companyId": 20865026
    },
    {
      "name": "Sears Holdings Corporation",
      "companyId": 55266454
    },
    {
      "name": "New York Life Insurance Company",
      "companyId": 65215532
    },
    {
      "name": "Mondelez International, Inc.",
      "companyId": 50742056
    },
    {
      "name": "American Express Company",
      "companyId": 25681113
    },
    {
      "name": "Nationwide Mutual Insurance Co.",
      "companyId": 51561474
    },
    {
      "name": "The Allstate Corporation",
      "companyId": 74438431
    },
    {
      "name": "Tyson Foods, Inc.",
      "companyId": 86127373
    },
    {
      "name": "Supervalu Inc.",
      "companyId": 28359707
    },
    {
      "name": "TIAA-CREF",
      "companyId": 19646516
    },
    {
      "name": "Massachusetts Mutual Life Insurance Company",
      "companyId": 48604601
    },
    {
      "name": "CIGNA Corporation",
      "companyId": 26508099
    },
    {
      "name": "DIRECTV",
      "companyId": 65277167
    },
    {
      "name": "General Dynamics Corporation",
      "companyId": 70174709
    },
    {
      "name": "Philip Morris International Inc.",
      "companyId": 46014492
    },
    {
      "name": "3M Company",
      "companyId": 48100151
    },
    {
      "name": "Time Warner Inc.",
      "companyId": 43837954
    },
    {
      "name": "Halliburton Company",
      "companyId": 54832768
    },
    {
      "name": "Publix Super Markets, Inc.",
      "companyId": 47639253
    },
    {
      "name": "International Paper Company",
      "companyId": 14322365
    },
    {
      "name": "McDonald’s Corporation",
      "companyId": 47622005
    },
    {
      "name": "Macy’s, Inc.",
      "companyId": 79271097
    },
    {
      "name": "The TJX Companies, Inc.",
      "companyId": 87279462
    },
    {
      "name": "Fluor Corporation",
      "companyId": 81191181
    },
    {
      "name": "Northwestern Mutual Life Insurance Company,Inc.",
      "companyId": 24136590
    },
    {
      "name": "Tech Data Corporation",
      "companyId": 18785927
    },
    {
      "name": "American Airlines Group Inc.",
      "companyId": 43770002
    },
    {
      "name": "The Hartford Financial Services Group, Inc.",
      "companyId": 43619462
    },
    {
      "name": "The Travelers Companies, Inc.",
      "companyId": 96600207
    },
    {
      "name": "Nike, Inc.",
      "companyId": 49848416
    },
    {
      "name": "Occidental Petroleum Corporation",
      "companyId": 10796123
    },
    {
      "name": "Avnet, Inc.",
      "companyId": 59552360
    },
    {
      "name": "Rite Aid Corporation",
      "companyId": 83339611
    },
    {
      "name": "Exelon Corporation",
      "companyId": 87139131
    },
    {
      "name": "Qualcomm Incorporated",
      "companyId": 41783159
    },
    {
      "name": "Emerson Electric Co.",
      "companyId": 65510736
    },
    {
      "name": "Northrop Grumman Corporation",
      "companyId": 25737265
    },
    {
      "name": "Duke Energy Corporation",
      "companyId": 94783862
    },
    {
      "name": "Capital One Financial Corporation",
      "companyId": 94790052
    },
    {
      "name": "Aflac Incorporated",
      "companyId": 65475472
    },
    {
      "name": "Raytheon Company",
      "companyId": 62719082
    },
    {
      "name": "Staples, Inc.",
      "companyId": 58535612
    },
    {
      "name": "EMC Corporation",
      "companyId": 90471902
    },
    {
      "name": "Eli Lilly and Company",
      "companyId": 12046949
    },
    {
      "name": "Alcoa Inc.",
      "companyId": 19986536
    },
    {
      "name": "National Oilwell Varco, Inc.",
      "companyId": 58874276
    },
    {
      "name": "Baker Hughes Incorporated",
      "companyId": 48476030
    },
    {
      "name": "US Foods, Inc.",
      "companyId": 47899075
    },
    {
      "name": "Time Warner Cable Inc.",
      "companyId": 62739112
    },
    {
      "name": "Union Pacific Corporation",
      "companyId": 14653447
    },
    {
      "name": "Abbott Laboratories",
      "companyId": 45540658
    },
    {
      "name": "Xerox Corporation",
      "companyId": 88161110
    },
    {
      "name": "Arrow Electronics, Inc",
      "companyId": 58426777
    },
    {
      "name": "Kimberly-Clark Corporation",
      "companyId": 31969657
    },
    {
      "name": "U.S. Bancorp",
      "companyId": 77748883
    },
    {
      "name": "United Services Automobile Association",
      "companyId": 48509570
    },
    {
      "name": "Freeport-McMoRan Copper & Gold Inc.",
      "companyId": 95306404
    },
    {
      "name": "Icahn Enterprises L.P.",
      "companyId": 46512665
    },
    {
      "name": "ManpowerGroup Inc.",
      "companyId": 21006101
    },
    {
      "name": "HollyFrontier Corporation",
      "companyId": 84862109
    },
    {
      "name": "Global Partners LP",
      "companyId": 79153749
    },
    {
      "name": "The Goodyear Tire & Rubber Company",
      "companyId": 62910926
    },
    {
      "name": "PBF Energy Inc.",
      "companyId": 42278397
    },
    {
      "name": "Danaher Corporation",
      "companyId": 81878044
    },
    {
      "name": "Nucor Corporation",
      "companyId": 37590449
    },
    {
      "name": "Kohl’s Corporation",
      "companyId": 28372965
    },
    {
      "name": "AbbVie Inc.",
      "companyId": 41094811
    },
    {
      "name": "Whirlpool Corporation",
      "companyId": 93042718
    },
    {
      "name": "Amgen Inc.",
      "companyId": 76322556
    },
    {
      "name": "Jabil Circuit, Inc.",
      "companyId": 85507515
    },
    {
      "name": "Kraft Foods Group, Inc.",
      "companyId": 93906742
    },
    {
      "name": "The Progressive Corporation",
      "companyId": 35210597
    },
    {
      "name": "CenturyLink, Inc.",
      "companyId": 49028966
    },
    {
      "name": "General Mills, Inc.",
      "companyId": 88336899
    },
    {
      "name": "Southwest Airlines Co.",
      "companyId": 49803813
    },
    {
      "name": "Altria Group, Inc.",
      "companyId": 44101848
    },
    {
      "name": "AutoNation, Inc.",
      "companyId": 81494427
    },
    {
      "name": "Chesapeake Energy Corporation",
      "companyId": 15625463
    },
    {
      "name": "Dollar General Corporation",
      "companyId": 39777510
    },
    {
      "name": "TRW Automotive Holdings Corp.",
      "companyId": 44228084
    },
    {
      "name": "United States Steel Corporation",
      "companyId": 59812052
    },
    {
      "name": "Colgate-Palmolive Company",
      "companyId": 84913643
    },
    {
      "name": "Cummins Inc.",
      "companyId": 12861734
    },
    {
      "name": "PACCAR Inc",
      "companyId": 18491854
    },
    {
      "name": "The Southern Company",
      "companyId": 18608999
    },
    {
      "name": "Illinois Tool Works Inc.",
      "companyId": 42283986
    },
    {
      "name": "The PNC Financial Services Group, Inc.",
      "companyId": 87902893
    },
    {
      "name": "Medtronic, Inc.",
      "companyId": 65044151
    },
    {
      "name": "The AES Corporation",
      "companyId": 21381662
    },
    {
      "name": "Murphy USA Inc.",
      "companyId": 29099315
    },
    {
      "name": "Bristol-Myers Squibb Company",
      "companyId": 16050065
    },
    {
      "name": "Lear Corporation",
      "companyId": 24811168
    },
    {
      "name": "The Gap, Inc.",
      "companyId": 78100585
    },
    {
      "name": "Apache Corporation",
      "companyId": 54890437
    },
    {
      "name": "eBay Inc.",
      "companyId": 83009809
    },
    {
      "name": "The Bank of New York Mellon Corporation",
      "companyId": 58428610
    },
    {
      "name": "CBS Corporation",
      "companyId": 82601776
    },
    {
      "name": "PG&E Corporation",
      "companyId": 91038838
    },
    {
      "name": "ConAgra Foods, Inc.",
      "companyId": 61235602
    },
    {
      "name": "Computer Sciences Corporation",
      "companyId": 66049305
    },
    {
      "name": "American Electric Power Company, Inc.",
      "companyId": 91240853
    },
    {
      "name": "Western Digital Corporation",
      "companyId": 87701657
    },
    {
      "name": "Marathon Oil Corporation",
      "companyId": 16041535
    },
    {
      "name": "Baxter International Inc.",
      "companyId": 78782948
    },
    {
      "name": "PPG Industries, Inc.",
      "companyId": 97677398
    },
    {
      "name": "NextEra Energy, Inc.",
      "companyId": 49992573
    },
    {
      "name": "Community Health Systems, Inc.",
      "companyId": 54382474
    },
    {
      "name": "Loews Corporation",
      "companyId": 29126328
    },
    {
      "name": "Penske Automotive Group, Inc.",
      "companyId": 89274599
    },
    {
      "name": "FirstEnergy Corp.",
      "companyId": 20303509
    },
    {
      "name": "Starbucks Corporation",
      "companyId": 26525979
    },
    {
      "name": "Monsanto Company",
      "companyId": 42884886
    },
    {
      "name": "Kellogg Company",
      "companyId": 12147164
    },
    {
      "name": "Land O’Lakes, Inc.",
      "companyId": 18056900
    },
    {
      "name": "ONEOK, Inc.",
      "companyId": 19768734
    },
    {
      "name": "Omnicom Group Inc.",
      "companyId": 13352007
    },
    {
      "name": "Anadarko Petroleum Corporation",
      "companyId": 55388115
    },
    {
      "name": "EOG Resources, Inc.",
      "companyId": 97670260
    },
    {
      "name": "DISH Network Corporation",
      "companyId": 32291477
    },
    {
      "name": "Genuine Parts Company",
      "companyId": 92561868
    },
    {
      "name": "Kinder Morgan, Inc.",
      "companyId": 68692681
    },
    {
      "name": "Waste Management, Inc.",
      "companyId": 42838709
    },
    {
      "name": "The Chubb Corporation",
      "companyId": 22445811
    },
    {
      "name": "Aramark Holdings Corporation",
      "companyId": 71229583
    },
    {
      "name": "Viacom Inc.",
      "companyId": 41139878
    },
    {
      "name": "Las Vegas Sands Corp.",
      "companyId": 83912500
    },
    {
      "name": "Dominion Resources, Inc.",
      "companyId": 88547626
    },
    {
      "name": "Ecolab Inc.",
      "companyId": 18667816
    },
    {
      "name": "Smithfield Foods, Inc.",
      "companyId": 69809518
    },
    {
      "name": "Thermo Fisher Scientific Inc.",
      "companyId": 96849408
    },
    {
      "name": "Yum! Brands, Inc.",
      "companyId": 14339323
    },
    {
      "name": "Parker-Hannifin Corporation",
      "companyId": 78291907
    },
    {
      "name": "Whole Foods Market, Inc.",
      "companyId": 78474990
    },
    {
      "name": "Marriott International, Inc.",
      "companyId": 55818716
    },
    {
      "name": "C. H. Robinson Worldwide, Inc.",
      "companyId": 63226260
    },
    {
      "name": "L-3 Communications Holdings, Inc.",
      "companyId": 69893631
    },
    {
      "name": "Edison International",
      "companyId": 63556761
    },
    {
      "name": "Toys “R” Us, Inc.",
      "companyId": 22206305
    },
    {
      "name": "Nordstrom, Inc.",
      "companyId": 19897193
    },
    {
      "name": "Consolidated Edison, Inc.",
      "companyId": 64402916
    },
    {
      "name": "Marsh & McLennan Companies, Inc.",
      "companyId": 81196105
    },
    {
      "name": "Texas Instruments Incorporated",
      "companyId": 32358286
    },
    {
      "name": "Textron Inc.",
      "companyId": 91119291
    },
    {
      "name": "Tenet Healthcare Corporation",
      "companyId": 26842132
    },
    {
      "name": "DaVita HealthCare Partners Inc.",
      "companyId": 58770201
    },
    {
      "name": "CSX Corporation",
      "companyId": 60207735
    },
    {
      "name": "Lincoln National Corporation",
      "companyId": 38114802
    },
    {
      "name": "Praxair, Inc.",
      "companyId": 95215328
    },
    {
      "name": "PPL Corporation",
      "companyId": 14054600
    },
    {
      "name": "J.C. Penney Company, Inc.",
      "companyId": 98130257
    },
    {
      "name": "Peter Kiewit Sons’, Inc.",
      "companyId": 49038040
    },
    {
      "name": "Jacobs Engineering Group Inc.",
      "companyId": 98551856
    },
    {
      "name": "Visa Inc.",
      "companyId": 99471626
    },
    {
      "name": "H.J. Heinz Company",
      "companyId": 67284694
    },
    {
      "name": "CarMax, Inc.",
      "companyId": 52823821
    },
    {
      "name": "V.F. Corporation",
      "companyId": 17303237
    },
    {
      "name": "Entergy Corporation",
      "companyId": 47770565
    },
    {
      "name": "Automatic Data Processing, Inc.",
      "companyId": 37253138
    },
    {
      "name": "NRG Energy, Inc.",
      "companyId": 85427951
    },
    {
      "name": "Guardian Life Ins. Co. of America",
      "companyId": 12316199
    },
    {
      "name": "Liberty Interactive Corporation",
      "companyId": 10249690
    },
    {
      "name": "Norfolk Southern Corporation",
      "companyId": 38187554
    },
    {
      "name": "Office Depot, Inc.",
      "companyId": 57948904
    },
    {
      "name": "Ameriprise Financial, Inc.",
      "companyId": 48713925
    },
    {
      "name": "Gilead Sciences, Inc.",
      "companyId": 36287548
    },
    {
      "name": "Centene Corporation",
      "companyId": 89283026
    },
    {
      "name": "Leucadia National Corporation",
      "companyId": 99618991
    },
    {
      "name": "Huntsman Corporation",
      "companyId": 93200557
    },
    {
      "name": "Health Net, Inc.",
      "companyId": 81442152
    },
    {
      "name": "Stanley Black & Decker, Inc.",
      "companyId": 63161323
    },
    {
      "name": "URS Corporation",
      "companyId": 89808601
    },
    {
      "name": "Xcel Energy Inc.",
      "companyId": 69987099
    },
    {
      "name": "Bed Bath & Beyond Inc.",
      "companyId": 30705606
    },
    {
      "name": "Navistar International Corporation",
      "companyId": 64244849
    },
    {
      "name": "Synnex Corporation",
      "companyId": 73475657
    },
    {
      "name": "First Data Corporation",
      "companyId": 50869915
    },
    {
      "name": "AGCO Corporation",
      "companyId": 44815213
    },
    {
      "name": "L Brands, Inc.",
      "companyId": 87000532
    },
    {
      "name": "Hertz Global Holdings, Inc.",
      "companyId": 49830112
    },
    {
      "name": "CDW Corporation",
      "companyId": 56442217
    },
    {
      "name": "CST Brands, Inc.",
      "companyId": 88570525
    },
    {
      "name": "Sempra Energy",
      "companyId": 82956617
    },
    {
      "name": "R.R. Donnelley & Sons Company",
      "companyId": 26323139
    },
    {
      "name": "BB&T Corporation",
      "companyId": 76269686
    },
    {
      "name": "Devon Energy Corporation",
      "companyId": 51265798
    },
    {
      "name": "Family Dollar Stores, Inc.",
      "companyId": 35158449
    },
    {
      "name": "Unum Group",
      "companyId": 55449274
    },
    {
      "name": "Ally Financial Inc.",
      "companyId": 51387382
    },
    {
      "name": "Reinsurance Group of America, Incorporated",
      "companyId": 14515958
    },
    {
      "name": "State Street Corporation",
      "companyId": 31267851
    },
    {
      "name": "Air Products & Chemicals, Inc.",
      "companyId": 82766198
    },
    {
      "name": "Ross Stores, Inc.",
      "companyId": 78246304
    },
    {
      "name": "The Sherwin-Williams Company",
      "companyId": 90448513
    },
    {
      "name": "The Estée Lauder Companies Inc.",
      "companyId": 13036477
    },
    {
      "name": "BlackRock, Inc.",
      "companyId": 75005028
    },
    {
      "name": "Western Refining, Inc.",
      "companyId": 83138142
    },
    {
      "name": "Avon Products, Inc.",
      "companyId": 29318515
    },
    {
      "name": "The Mosaic Company",
      "companyId": 65915779
    },
    {
      "name": "Public Service Enterprise Group Incorporated",
      "companyId": 77146732
    },
    {
      "name": "Dean Foods Company",
      "companyId": 29025443
    },
    {
      "name": "Cameron International Corporation",
      "companyId": 54440444
    },
    {
      "name": "MGM Resorts International",
      "companyId": 27642890
    },
    {
      "name": "KKR & Co. L.P.",
      "companyId": 29455535
    },
    {
      "name": "Hilton Worldwide Holdings Inc.",
      "companyId": 60734087
    },
    {
      "name": "DTE Energy Company",
      "companyId": 39976425
    },
    {
      "name": "Genworth Financial, Inc.",
      "companyId": 80187744
    },
    {
      "name": "Henry Schein, Inc.",
      "companyId": 22222508
    },
    {
      "name": "Rock-Tenn Company",
      "companyId": 57533055
    },
    {
      "name": "WellCare Health Plans, Inc.",
      "companyId": 84245018
    },
    {
      "name": "W.W. Grainger, Inc.",
      "companyId": 73569115
    },
    {
      "name": "Discover Financial Services",
      "companyId": 63262524
    },
    {
      "name": "Eastman Chemical Company",
      "companyId": 91145453
    },
    {
      "name": "Principal Financial Group, Inc.",
      "companyId": 22444577
    },
    {
      "name": "Reliance Steel & Aluminum Co.",
      "companyId": 53126065
    },
    {
      "name": "AutoZone, Inc.",
      "companyId": 43713594
    },
    {
      "name": "Dover Corporation",
      "companyId": 97976187
    },
    {
      "name": "Micron Technology, Inc.",
      "companyId": 86322255
    },
    {
      "name": "Owens & Minor, Inc.",
      "companyId": 86631213
    },
    {
      "name": "Assurant, Inc.",
      "companyId": 59032042
    },
    {
      "name": "GameStop Corp.",
      "companyId": 30633117
    },
    {
      "name": "Stryker Corporation",
      "companyId": 27495131
    },
    {
      "name": "Group 1 Automotive, Inc.",
      "companyId": 79835135
    },
    {
      "name": "Cognizant Technology Solutions Corporation",
      "companyId": 43133261
    },
    {
      "name": "Sonic Automotive, Inc.",
      "companyId": 30719689
    },
    {
      "name": "Autoliv, Inc.",
      "companyId": 59249328
    },
    {
      "name": "Hormel Foods Corporation",
      "companyId": 81708588
    },
    {
      "name": "Motorola Solutions, Inc.",
      "companyId": 11138705
    },
    {
      "name": "Crown Holdings, Inc.",
      "companyId": 61724199
    },
    {
      "name": "SunTrust Banks, Inc.",
      "companyId": 28053536
    },
    {
      "name": "Campbell Soup Company",
      "companyId": 17492059
    },
    {
      "name": "Fidelity National Financial, Inc.",
      "companyId": 43486139
    },
    {
      "name": "HD Supply Holdings, Inc.",
      "companyId": 52569154
    },
    {
      "name": "Caesars Entertainment Corporation",
      "companyId": 39446240
    },
    {
      "name": "Darden Restaurants, Inc.",
      "companyId": 66269826
    },
    {
      "name": "Weyerhaeuser Company",
      "companyId": 62438253
    },
    {
      "name": "Ball Corporation",
      "companyId": 35166104
    },
    {
      "name": "Precision Castparts Corp.",
      "companyId": 55039952
    },
    {
      "name": "Masco Corporation",
      "companyId": 28344808
    },
    {
      "name": "Universal Health Services, Inc.",
      "companyId": 40785966
    },
    {
      "name": "Republic Services, Inc.",
      "companyId": 80773257
    },
    {
      "name": "MasterCard Incorporated",
      "companyId": 85646331
    },
    {
      "name": "Newmont Mining Corporation",
      "companyId": 23994945
    },
    {
      "name": "Broadcom Corporation",
      "companyId": 56982672
    },
    {
      "name": "Reynolds American Inc.",
      "companyId": 23657001
    },
    {
      "name": "PVH Corp.",
      "companyId": 35811337
    },
    {
      "name": "Charter Communications, Inc.",
      "companyId": 79654384
    },
    {
      "name": "AECOM Technology Corporation",
      "companyId": 71623829
    },
    {
      "name": "CenterPoint Energy, Inc.",
      "companyId": 32273193
    },
    {
      "name": "Pacific Life",
      "companyId": 91367426
    },
    {
      "name": "Thrivent Financial for Lutherans",
      "companyId": 74654415
    },
    {
      "name": "Becton, Dickinson and Company",
      "companyId": 17802779
    },
    {
      "name": "Franklin Resources, Inc.",
      "companyId": 58712847
    },
    {
      "name": "Tenneco Inc.",
      "companyId": 71038631
    },
    {
      "name": "TravelCenters of America LLC",
      "companyId": 31366647
    },
    {
      "name": "Avis Budget Group, Inc.",
      "companyId": 46701332
    },
    {
      "name": "Facebook, Inc.",
      "companyId": 33000486
    },
    {
      "name": "Dollar Tree, Inc.",
      "companyId": 30872771
    },
    {
      "name": "Corning Incorporated",
      "companyId": 84489562
    },
    {
      "name": "Ashland Inc.",
      "companyId": 90535473
    },
    {
      "name": "Sealed Air Corporation",
      "companyId": 34250362
    },
    {
      "name": "Core-Mark Holding Company, Inc.",
      "companyId": 40813806
    },
    {
      "name": "Oshkosh Corporation",
      "companyId": 51703594
    },
    {
      "name": "Coca-Cola Enterprises, Inc.",
      "companyId": 10238975
    },
    {
      "name": "WESCO International, Inc.",
      "companyId": 29053427
    },
    {
      "name": "Applied Materials, Inc.",
      "companyId": 93163506
    },
    {
      "name": "Visteon Corporation",
      "companyId": 11186144
    },
    {
      "name": "BorgWarner Inc.",
      "companyId": 81721540
    },
    {
      "name": "Spectrum Group International, Inc.",
      "companyId": 77797161
    },
    {
      "name": "Oaktree Capital Group, LLC",
      "companyId": 79869905
    },
    {
      "name": "Steel Dynamics, Inc.",
      "companyId": 65847215
    },
    {
      "name": "Jarden Corporation",
      "companyId": 36307112
    },
    {
      "name": "Mohawk Industries, Inc.",
      "companyId": 80674372
    },
    {
      "name": "Terex Corporation",
      "companyId": 24860467
    },
    {
      "name": "Northeast Utilities",
      "companyId": 39746267
    },
    {
      "name": "KBR, Inc.",
      "companyId": 27466177
    },
    {
      "name": "Fifth Third Bancorp",
      "companyId": 39594209
    },
    {
      "name": "UGI Corporation",
      "companyId": 46471398
    },
    {
      "name": "CBRE Group, Inc.",
      "companyId": 10463059
    },
    {
      "name": "Quest Diagnostics Incorporated",
      "companyId": 57723416
    },
    {
      "name": "Peabody Energy Corporation",
      "companyId": 26738730
    },
    {
      "name": "The Hershey Company",
      "companyId": 38332334
    },
    {
      "name": "Boston Scientific Corporation",
      "companyId": 79990439
    },
    {
      "name": "FMC Technologies, Inc.",
      "companyId": 27278850
    },
    {
      "name": "The Interpublic Group of Companies, Inc.",
      "companyId": 71228852
    },
    {
      "name": "Commercial Metals Company",
      "companyId": 94755401
    },
    {
      "name": "The Pantry, Inc.",
      "companyId": 20956226
    },
    {
      "name": "Owens-Illinois, Inc.",
      "companyId": 73358658
    },
    {
      "name": "American Family Ins. Group",
      "companyId": 49868394
    },
    {
      "name": "Ralph Lauren Corporation",
      "companyId": 27636579
    },
    {
      "name": "Biogen Idec Inc.",
      "companyId": 32949470
    },
    {
      "name": "PetSmart, Inc.",
      "companyId": 15687335
    },
    {
      "name": "Mylan Inc.",
      "companyId": 60267272
    },
    {
      "name": "Symantec Corporation",
      "companyId": 99832867
    },
    {
      "name": "Ameren Corporation",
      "companyId": 58954629
    },
    {
      "name": "The Williams Companies, Inc.",
      "companyId": 20644167
    },
    {
      "name": "Barnes & Noble, Inc.",
      "companyId": 64915832
    },
    {
      "name": "Huntington Ingalls Industries, Inc.",
      "companyId": 47477637
    },
    {
      "name": "The Priceline Group Inc.",
      "companyId": 68652145
    },
    {
      "name": "Agilent Technologies, Inc.",
      "companyId": 84921766
    },
    {
      "name": "Dana Holding Corporation",
      "companyId": 60783789
    },
    {
      "name": "Dillard’s, Inc.",
      "companyId": 58926998
    },
    {
      "name": "Seaboard Corporation",
      "companyId": 32720834
    },
    {
      "name": "Vanguard Health Systems, Inc.",
      "companyId": 66840908
    },
    {
      "name": "Casey’s General Stores, Inc.",
      "companyId": 23568867
    },
    {
      "name": "O’Reilly Automotive, Inc.",
      "companyId": 74557512
    },
    {
      "name": "The Blackstone Group L.P.",
      "companyId": 99897472
    },
    {
      "name": "Mutual of Omaha Insurance Company",
      "companyId": 34488106
    },
    {
      "name": "Molina Healthcare, Inc.",
      "companyId": 33648052
    },
    {
      "name": "CMS Energy Corporation",
      "companyId": 97330278
    },
    {
      "name": "Targa Resources Corp.",
      "companyId": 39994256
    },
    {
      "name": "Quanta Services, Inc.",
      "companyId": 34471939
    },
    {
      "name": "Cablevision Systems Corporation",
      "companyId": 76059939
    },
    {
      "name": "Avery Dennison Corporation",
      "companyId": 92496577
    },
    {
      "name": "Celanese Corporation",
      "companyId": 80302027
    },
    {
      "name": "Foot Locker, Inc.",
      "companyId": 15811457
    },
    {
      "name": "Celgene Corporation",
      "companyId": 56197877
    },
    {
      "name": "Advance Auto Parts, Inc.",
      "companyId": 31277461
    },
    {
      "name": "Mattel, Inc.",
      "companyId": 46136269
    },
    {
      "name": "Live Nation Entertainment, Inc.",
      "companyId": 56442084
    },
    {
      "name": "General Cable Corporation",
      "companyId": 56415092
    },
    {
      "name": "Ryder System, Inc.",
      "companyId": 88418663
    },
    {
      "name": "EMCOR Group, Inc.",
      "companyId": 62875100
    },
    {
      "name": "Allergan, Inc.",
      "companyId": 50770392
    },
    {
      "name": "W.R. Berkley Corporation",
      "companyId": 14808985
    },
    {
      "name": "Rockwell Automation, Inc.",
      "companyId": 31087144
    },
    {
      "name": "NetApp, Inc.",
      "companyId": 83139436
    },
    {
      "name": "Ingredion Incorporated",
      "companyId": 38898893
    },
    {
      "name": "Level 3 Communications, Inc.",
      "companyId": 45038207
    },
    {
      "name": "Calpine Corporation",
      "companyId": 59256449
    },
    {
      "name": "Omnicare, Inc.",
      "companyId": 97515125
    },
    {
      "name": "Erie Insurance Group",
      "companyId": 92319275
    },
    {
      "name": "SLM Corporation",
      "companyId": 86751061
    },
    {
      "name": "D.R. Horton, Inc.",
      "companyId": 15133859
    },
    {
      "name": "CC Media Holdings, Inc.",
      "companyId": 25360403
    },
    {
      "name": "Anixter International Inc.",
      "companyId": 52626114
    },
    {
      "name": "Dick’s Sporting Goods, Inc.",
      "companyId": 99856509
    },
    {
      "name": "SanDisk Corporation",
      "companyId": 29740420
    },
    {
      "name": "NCR Corporation",
      "companyId": 27728510
    },
    {
      "name": "Starwood Hotels & Resorts Worldwide, Inc.",
      "companyId": 28253906
    },
    {
      "name": "Expeditors International of Washington, Inc.",
      "companyId": 81917814
    },
    {
      "name": "Fidelity National Information Services, Inc.",
      "companyId": 43518102
    },
    {
      "name": "United Natural Foods, Inc.",
      "companyId": 78040125
    },
    {
      "name": "Auto-Owners Insurance Group",
      "companyId": 76102177
    },
    {
      "name": "Windstream Holdings, Inc.",
      "companyId": 38499175
    },
    {
      "name": "Dr Pepper Snapple Group, Inc.",
      "companyId": 45814320
    },
    {
      "name": "Lennar Corporation",
      "companyId": 80415814
    },
    {
      "name": "Sanmina",
      "companyId": 48354296
    },
    {
      "name": "Harley-Davidson, Inc.",
      "companyId": 45912358
    },
    {
      "name": "CONSOL Energy Inc.",
      "companyId": 64440092
    },
    {
      "name": "The J.M. Smucker Company",
      "companyId": 74135319
    },
    {
      "name": "Newell Rubbermaid Inc.",
      "companyId": 72353232
    },
    {
      "name": "CH2M HILL Companies, Ltd.",
      "companyId": 39601890
    },
    {
      "name": "Energy Future Holdings Corp.",
      "companyId": 77221796
    },
    {
      "name": "Susser Holdings Corporation",
      "companyId": 37462671
    },
    {
      "name": "Laboratory Corporation of America Holdings",
      "companyId": 34530836
    },
    {
      "name": "Kindred Healthcare, Inc.",
      "companyId": 77370438
    },
    {
      "name": "Leidos Holdings Inc.",
      "companyId": 99780037
    },
    {
      "name": "Booz Allen Hamilton Holding Corp.",
      "companyId": 99465142
    },
    {
      "name": "The Jones Financial Companies,L.L.L.P.",
      "companyId": 64385159
    },
    {
      "name": "Cliffs Natural Resources Inc.",
      "companyId": 98111732
    },
    {
      "name": "PulteGroup, Inc.",
      "companyId": 99056127
    },
    {
      "name": "Regions Financial Corporation",
      "companyId": 76793823
    },
    {
      "name": "NiSource Inc.",
      "companyId": 93097184
    },
    {
      "name": "Graybar Electric Company, Inc.",
      "companyId": 89380200
    },
    {
      "name": "Integrys Energy Group, Inc.",
      "companyId": 45825795
    },
    {
      "name": "The Clorox Company",
      "companyId": 33236829
    },
    {
      "name": "Wynn Resorts, Limited",
      "companyId": 44551565
    },
    {
      "name": "The Andersons, Inc.",
      "companyId": 61189389
    },
    {
      "name": "J.B. Hunt Transport Services, Inc.",
      "companyId": 55608028
    },
    {
      "name": "AK Steel Holding Corporation",
      "companyId": 44724501
    },
    {
      "name": "Harbinger Group Inc.",
      "companyId": 31861644
    },
    {
      "name": "MeadWestvaco Corporation",
      "companyId": 75605632
    },
    {
      "name": "The Western Union Company",
      "companyId": 99013890
    },
    {
      "name": "The Charles Schwab Corporation",
      "companyId": 79293618
    },
    {
      "name": "Discovery Communications, Inc.",
      "companyId": 10409805
    },
    {
      "name": "Spectra Energy Corp",
      "companyId": 89549631
    },
    {
      "name": "St. Jude Medical, Inc.",
      "companyId": 77136574
    },
    {
      "name": "CF Industries Holdings, Inc.",
      "companyId": 63614201
    },
    {
      "name": "Con-way Inc.",
      "companyId": 39238753
    },
    {
      "name": "Old Republic International Corporation",
      "companyId": 96041156
    },
    {
      "name": "JetBlue Airways Corporation",
      "companyId": 82653188
    },
    {
      "name": "Calumet Specialty Products Partners, L.P.",
      "companyId": 95701450
    },
    {
      "name": "Kelly Services, Inc.",
      "companyId": 26843280
    },
    {
      "name": "Domtar Corporation",
      "companyId": 40618856
    },
    {
      "name": "Murphy Oil Corporation",
      "companyId": 10725306
    },
    {
      "name": "Harris Corporation",
      "companyId": 37716475
    },
    {
      "name": "Asbury Automotive Group, Inc.",
      "companyId": 84795586
    },
    {
      "name": "Big Lots, Inc.",
      "companyId": 28772336
    },
    {
      "name": "Advanced Micro Devices, Inc.",
      "companyId": 17976280
    },
    {
      "name": "Owens Corning",
      "companyId": 18577271
    },
    {
      "name": "Realogy Holdings Corp.",
      "companyId": 64085368
    },
    {
      "name": "Host Hotels & Resorts, Inc.",
      "companyId": 92408534
    },
    {
      "name": "MRC Global Inc.",
      "companyId": 19232084
    },
    {
      "name": "Simon Property Group, Inc.",
      "companyId": 92816251
    },
    {
      "name": "Tractor Supply Company",
      "companyId": 75696028
    },
    {
      "name": "Gannett Co., Inc.",
      "companyId": 45025941
    },
    {
      "name": "Alaska Air Group, Inc.",
      "companyId": 77171722
    },
    {
      "name": "Insight Enterprises, Inc.",
      "companyId": 75413777
    },
    {
      "name": "McGraw Hill Financial, Inc.",
      "companyId": 85269327
    },
    {
      "name": "Buckeye Partners, L.P.",
      "companyId": 24128049
    },
    {
      "name": "Quintiles Transnational Holdings Inc.",
      "companyId": 91069128
    },
    {
      "name": "American Financial Group, Inc.",
      "companyId": 19952835
    },
    {
      "name": "United Stationers Inc.",
      "companyId": 72120369
    },
    {
      "name": "Coach, Inc.",
      "companyId": 49699731
    },
    {
      "name": "LKQ Corporation",
      "companyId": 38311388
    },
    {
      "name": "Noble Energy, Inc.",
      "companyId": 88529466
    },
    {
      "name": "Bemis Company, Inc.",
      "companyId": 66290642
    },
    {
      "name": "Joy Global Inc.",
      "companyId": 62800452
    },
    {
      "name": "Wyndham Worldwide Corporation",
      "companyId": 79211341
    },
    {
      "name": "NII Holdings, Inc.",
      "companyId": 73846806
    },
    {
      "name": "Lorillard, Inc.",
      "companyId": 61036778
    },
    {
      "name": "Alleghany Corporation",
      "companyId": 25142936
    },
    {
      "name": "Airgas, Inc.",
      "companyId": 33024563
    },
    {
      "name": "First American Financial Corporation",
      "companyId": 70328544
    },
    {
      "name": "United Rentals, Inc.",
      "companyId": 14966242
    }]



module.exports = router;

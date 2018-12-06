// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/dataDrilling/_config","./panels/US/Population ./panels/US/Households ./panels/US/Income ./panels/US/NetWorth ./panels/US/HomeValue ./panels/US/Spending ./panels/US/Electronics ./panels/US/Pets ./panels/US/Businesses ./panels/US/Employees ./panels/US/Education ./panels/US/Mortgage ./panels/US/Housing ./panels/US/JourneyToWork ./panels/US/Health ./panels/US/Tapestry ./panels/US/AtRisk dojo/i18n!esri/nls/jsapi".split(" "),function(c,f,g,
l,m,a,n,d,p,h,q,r,t,u,v,w,x,b){b=b.geoenrichment.dijit.ReportPlayer.VariableStates;var k={US:{"TOTPOP_CY, POPGRW10CY":[c.annualGrowth],MEDAGE_CY:[c.agePyramid],"ACSOTNOA65, ACSSPNOA65":[c.pop65PlusNoEnglish],DPOP_CY:[c.daytimePopulation],"ACSCIVNINS, ACS0ONEHI, ACS18ONEHI, ACS35ONEHI, ACS65ONEHI, ACSCIVNI0, ACSCIVNI18, ACSCIVNI35, ACSCIVNI65, ACS0NOHI, ACS18NOHI, ACS35NOHI, ACS65NOHI":[c.populationACS],MEDHINC_CY:[g.householdsByIncome],"PCI_CY, MEDDI_CY":[g.disposableIncome],"AVGHHSZ_CY, TOTHH_CY":[f.avgHouseholdSize],
ACSOVEH0:[f.householdsWithNoVehicles],EDUCBASECY:[q.educationalAttainment],S01_BUS:[p.businessSummaryBySIC],"S01_EMP, UNEMPRT_CY":[h.civilianPopulation16Plus],EMP_CY:[h.laborForceByOccupation],MEDNW_CY:[l.netWorth],MEDVAL_CY:[m.homeValue],X5001_A:[a.apparelMenVsWomen],X8001_A:[a.healthCare],X1130_A:[a.eatingOut],"X4100_A, MP19013a_B":[a.purchasedMostRecentComputers],X1003_A:[a.avgSpentOnFoodAtStores],X7001_A:[a.travel],X9008_A:[a.interestInSports],X9073_A:[a.purchasedMusic],X9045_A:[a.timeOnline],
X9074_A:[a.movieGenre],X8002_X:[a.annualHealthExpenditures],X8018_X:[a.medicalServices],"ACS65MEDCR, ACS65HI2PM, ACS65HI2EM, ACS65HI2MM":[a.medicarePopulation65Plus],X3004_X:[r.dwellingMortgage],"X3036_X, X3004_A, ACSMEDCRNT":[t.renterExpenses],"ACSWORKERS, ACSDRALONE, ACSPUBTRAN, ACSCARPOOL, ACSWALKED, ACSBICYCLE":[u.jorneyToWork],"MP14001a_B, MP14002a_B":[v.exercise],MP19014a_B:[n.cellPhonePlan],MP26004h_B:[d.dogProducts],MP26003h_B:[d.catProducts],MP26001h_B:[d.hhOnwsAnyPet],TSEGNAME:[w.tapestry],
ACSHHDIS:[x.householdsWithDisability]}},y={US:{Population:c,Households:f,Income:g,NetWorth:l,HomeValue:m,Spending:a,Electronics:n,Pets:d,Businesses:p,Employees:h,Education:q,Mortgage:r,Housing:t,JourneyToWork:u,Health:v,Tapestry:w,AtRisk:x}};c={n:b.stateNumber_short,p:b.statePercent_short,a:b.stateAverage_short,i:b.stateIndex_short,r:b.stateReliability_short};b={p:b.statePercent,a:b.stateAverage,i:b.stateIndex,r:b.stateReliability};for(var z in k){var e=k[z];Object.keys(e).forEach(function(a){-1!==
a.indexOf(",")&&(a.split(",").forEach(function(b){b=b.trim();var c=e[a];c.forEach(function(a){a.fieldInfo.infographicJson&&(a.fieldInfo.infographicJson.style=a.fieldInfo.infographicJson.style||{});!a.name&&a.fieldInfo.isChart&&(a.name=a.fieldInfo.chartJson.visualProperties.title.text)});e[b]=c}),delete e[a])})}return{LIBRARY:k,STATE_LOCALIZATION_MAP:b,STATE_LOCALIZATION_MAP_SHORT:c,getById:function(a){var b,c;a=a.split(".");return b=y[a[0]],c=b&&b[a[1]],c&&c[a[2]]}}});
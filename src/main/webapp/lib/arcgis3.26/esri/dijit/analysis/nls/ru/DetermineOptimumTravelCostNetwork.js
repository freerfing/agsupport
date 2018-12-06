// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/nls/ru/DetermineOptimumTravelCostNetwork",{inputLayerLabel:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0441\u0442\u0440\u043e\u0432\u044b\u0439 \u0438\u043b\u0438 \u0432\u0435\u043a\u0442\u043e\u0440\u043d\u044b\u0439 \u0441\u043b\u043e\u0439 \u043c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0439 \u0434\u043b\u044f \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u044f \u043c\u0430\u0440\u0448\u0440\u0443\u0442\u043e\u0432 \u0434\u0432\u0438\u0436\u0435\u043d\u0438\u044f",
inputCostRasterLabel:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0441\u0442\u0440\u043e\u0432\u044b\u0439 \u0441\u043b\u043e\u0439 \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u0438 \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u044f",outputOptimumNetworkName:"\u0418\u043c\u044f \u0438\u0442\u043e\u0433\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u043b\u0438\u043b\u0438\u043d\u0435\u0439\u043d\u043e\u0433\u043e \u0441\u043b\u043e\u044f \u043e\u043f\u0442\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0445 \u043f\u0443\u0442\u0435\u0439",
outputNeighborNetworkName:"\u0418\u043c\u044f \u0438\u0442\u043e\u0433\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u043b\u0438\u043b\u0438\u043d\u0435\u0439\u043d\u043e\u0433\u043e \u0441\u043b\u043e\u044f \u0441\u043e\u0441\u0435\u0434\u043d\u0438\u0445 \u043f\u0443\u0442\u0435\u0439 (\u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e)",outputLayerName:"\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u044c \u043e\u043f\u0442\u0438\u043c\u0430\u043b\u044c\u043d\u0443\u044e \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u044f \u0434\u043b\u044f ${layername}",
itemDescription:"\u0412\u0435\u043a\u0442\u043e\u0440\u043d\u044b\u0439 \u0441\u043b\u043e\u0439, \u0441\u043e\u0437\u0434\u0430\u043d\u043d\u044b\u0439 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u043c \u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u044c \u043e\u043f\u0442\u0438\u043c\u0430\u043b\u044c\u043d\u0443\u044e \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u044f \u043f\u043e \u0441\u0435\u0442\u0438 \u0434\u043b\u044f ${Layername}. ",
itemTags:"\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u0430\u043d\u0430\u043b\u0438\u0437\u0430, \u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u044c \u043e\u043f\u0442\u0438\u043c\u0430\u043b\u044c\u043d\u0443\u044e \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u044f \u043f\u043e \u0441\u0435\u0442\u0438, ${layername} ${fieldname}",itemSnippet:"\u0412\u0435\u043a\u0442\u043e\u0440\u043d\u044b\u0439 \u0441\u043b\u043e\u0439, \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u043d\u044b\u0439 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u043c \u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u044c \u043e\u043f\u0442\u0438\u043c\u0430\u043b\u044c\u043d\u0443\u044e \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u044f \u043f\u043e \u0441\u0435\u0442\u0438."});
// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/nls/he/MultiVariableForm",{distToNearest:"\u05de\u05e8\u05d7\u05e7 \u05d0\u05dc \u05d4\u05d9\u05e9\u05d5\u05ea \u05d4\u05e7\u05e8\u05d5\u05d1\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8",attrOfInterest:"\u05de\u05d0\u05e4\u05d9\u05d9\u05df \u05d4\u05d9\u05e9\u05d5\u05ea \u05d4\u05e7\u05e8\u05d5\u05d1\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8",summaryNearby:"\u05e1\u05d9\u05db\u05d5\u05dd \u05d9\u05e9\u05d5\u05ea \u05e1\u05de\u05d5\u05db\u05d4",summaryIntersecting:"\u05e1\u05d9\u05db\u05d5\u05dd \u05d9\u05e9\u05d5\u05d9\u05d5\u05ea \u05d7\u05d5\u05ea\u05db\u05d5\u05ea",
distToNearestLabel:"\u05d4\u05de\u05e8\u05d7\u05e7 \u05d1\u05d9\u05df \u05de\u05e8\u05db\u05d6 \u05d4-Bin \u05d5\u05d4\u05d9\u05e9\u05d5\u05ea \u05d4\u05e7\u05e8\u05d5\u05d1\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8 \u05d1\u05e9\u05db\u05d1\u05ea \u05d4\u05e7\u05dc\u05d8",attrOfInterestLabel:"\u05d4\u05e2\u05e8\u05da \u05e9\u05dc \u05e9\u05d3\u05d4 \u05e9\u05e6\u05d5\u05d9\u05df \u05de\u05d4\u05d9\u05e9\u05d5\u05ea \u05d4\u05e7\u05e8\u05d5\u05d1\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8 \u05d1\u05e9\u05db\u05d1\u05ea \u05d4\u05e7\u05dc\u05d8",
summaryNearbyLabel:"\u05e0\u05ea\u05d5\u05df \u05e1\u05d8\u05d8\u05d9\u05e1\u05d8\u05d9 \u05d4\u05de\u05d7\u05d5\u05e9\u05d1 \u05d1\u05db\u05dc \u05d4\u05d9\u05e9\u05d5\u05d9\u05d5\u05ea \u05e9\u05e0\u05de\u05e6\u05d0\u05d5 \u05d1\u05de\u05e8\u05d7\u05e7 \u05e9\u05e6\u05d5\u05d9\u05df \u05de\u05de\u05e8\u05db\u05d6 \u05d4-Bin",summaryIntersectingLabel:"\u05e0\u05ea\u05d5\u05df \u05e1\u05d8\u05d8\u05d9\u05e1\u05d8\u05d9 \u05d4\u05de\u05d7\u05d5\u05e9\u05d1 \u05d1\u05db\u05dc \u05d4\u05d9\u05e9\u05d5\u05d9\u05d5\u05ea \u05e9\u05d7\u05d5\u05ea\u05db\u05d5\u05ea \u05d0\u05ea \u05d4-Bin",
maxDistancefromCtr:"\u05d4\u05de\u05e8\u05d7\u05e7 \u05d4\u05de\u05e8\u05d1\u05d9 \u05de\u05de\u05e8\u05db\u05d6 \u05d4-Bin",fieldToIncude:"\u05e9\u05d3\u05d4 \u05dc\u05d4\u05db\u05dc\u05dc\u05d4",statstoCalculate:"\u05e0\u05ea\u05d5\u05df \u05e1\u05d8\u05d8\u05d9\u05e1\u05d8\u05d9 \u05dc\u05d7\u05d9\u05e9\u05d5\u05d1",summFeatuesWithin:"\u05e1\u05db\u05dd \u05d9\u05e9\u05d5\u05d9\u05d5\u05ea \u05d1\u05ea\u05d5\u05da",smallMaxDistErrorMsg:"\u05d4\u05de\u05e8\u05d7\u05e7 \u05d4\u05de\u05e8\u05d1\u05d9 \u05de\u05de\u05e8\u05db\u05d6 \u05d4-Bin \u05d7\u05d9\u05d9\u05d1 \u05dc\u05d4\u05d9\u05d5\u05ea \u05d2\u05d3\u05d5\u05dc \u05de\u05d2\u05d5\u05d3\u05dc \u05d4-Bin.",
smallSumFeaturesErrorMsg:"\u05d4\u05de\u05e8\u05d7\u05e7 \u05d4\u05de\u05e8\u05d1\u05d9 \u05de\u05de\u05e8\u05db\u05d6 \u05d4-Bin \u05d7\u05d9\u05d9\u05d1 \u05dc\u05d4\u05d9\u05d5\u05ea \u05d2\u05d3\u05d5\u05dc \u05de\u05d2\u05d5\u05d3\u05dc \u05d4-Bin."});
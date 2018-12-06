// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/nls/ar/BuildMultiVariablesList",{chooseInputLayer:"\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0637\u0628\u0642\u0629 \u0627\u0644\u0645\u062f\u062e\u0644\u0629",addAVar:"\u0625\u0636\u0627\u0641\u0629 \u0645\u062a\u063a\u064a\u0631",distToNearest:"\u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0639\u0644\u0645 \u0627\u0644\u0623\u0642\u0631\u0628",attrOfInterest:"\u0628\u064a\u0627\u0646\u0627\u062a \u062c\u062f\u0648\u0644\u064a\u0629 \u0644\u0644\u0645\u0639\u0644\u0645 \u0627\u0644\u0623\u0642\u0631\u0628",
summaryNearby:"\u0645\u0644\u062e\u0635 \u0627\u0644\u0645\u0639\u0627\u0644\u0645 \u0627\u0644\u0645\u062a\u062c\u0627\u0648\u0631\u0629",summaryIntersecting:"\u0645\u0644\u062e\u0635 \u0627\u0644\u0645\u0639\u0627\u0644\u0645 \u0627\u0644\u0645\u062a\u0642\u0627\u0637\u0639\u0629",distToNearestLabel:"\u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062e\u0627\u0646\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0639\u0644\u0645 \u0627\u0644\u0623\u0642\u0631\u0628 \u0641\u064a \u0627\u0644\u0637\u0628\u0642\u0629 \u0627\u0644\u0645\u062f\u062e\u0644\u0629",
attrOfInterestLabel:"\u0642\u064a\u0645\u0629 \u0627\u0644\u062d\u0642\u0644 \u0627\u0644\u0645\u062d\u062f\u062f \u0645\u0646 \u0627\u0644\u0645\u0639\u0644\u0645 \u0627\u0644\u0623\u0642\u0631\u0628 \u0645\u0646 \u0627\u0644\u0637\u0628\u0642\u0629 \u0627\u0644\u0645\u062f\u062e\u0644\u0629",summaryNearbyLabel:"\u0625\u062d\u0635\u0627\u0626\u064a\u0629 \u0644\u062d\u0633\u0627\u0628 \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0639\u0627\u0644\u0645 \u0627\u0644\u0645\u0648\u062c\u0648\u062f\u0629 \u0628\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062e\u0627\u0646\u0629",
summaryIntersectingLabel:"\u0625\u062d\u0635\u0627\u0626\u064a \u0644\u062d\u0633\u0627\u0628 \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0639\u0627\u0644\u0645 \u0627\u0644\u0645\u062a\u0642\u0627\u0637\u0639\u0629 \u0645\u0639 \u0627\u0644\u062e\u0627\u0646\u0629",maxDistancefromCtr:"\u0623\u0642\u0635\u0649 \u0645\u0633\u0627\u0641\u0629 \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062e\u0627\u0646\u0629",fieldToIncude:"\u062d\u0642\u0644 \u0644\u0625\u062f\u0631\u0627\u062c",statstoCalculate:"\u0625\u062d\u0635\u0627\u0626\u064a\u0629 \u0644\u062d\u0633\u0627\u0628",
summFeatuesWithin:"\u062a\u0644\u062e\u064a\u0635 \u0627\u0644\u0645\u0639\u0627\u0644\u0645 \u0636\u0645\u0646",layerChangeWarnMsg:"\u0633\u062a\u062a\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0645\u062a\u063a\u064a\u0631\u0627\u062a \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u0644\u0644\u0637\u0628\u0642\u0629 \u0627\u0644\u0645\u062f\u062e\u0644\u0629 \u0647\u0630\u0647 \u0641\u064a \u062d\u0627\u0644\u0629 \u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0637\u0628\u0642\u0629 \u0627\u0644\u0645\u062f\u062e\u0644\u0629",
validationErrorMsg:"\u0623\u0635\u0644\u062d\u0652 \u0623\u062e\u0637\u0627\u0621 \u0627\u0644\u062a\u062d\u0642\u0642 \u0642\u0628\u0644 \u0625\u0636\u0627\u0641\u0629 \u0645\u062a\u063a\u064a\u0631 \u062c\u062f\u064a\u062f",atleastOneVarMsg:"\u0623\u0636\u0641\u0652 \u0645\u062a\u063a\u064a\u0631 \u0648\u0627\u062d\u062f \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u0647\u0630\u0647 \u0627\u0644\u0637\u0628\u0642\u0629 \u0627\u0644\u0645\u062d\u062f\u062f\u0629"});
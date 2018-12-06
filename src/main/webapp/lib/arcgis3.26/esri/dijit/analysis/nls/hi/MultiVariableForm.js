// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/nls/hi/MultiVariableForm",{distToNearest:"\u0938\u092c\u0938\u0947 \u0928\u095b\u0926\u0940\u0915\u0940 \u0938\u0947 \u0926\u0942\u0930\u0940",attrOfInterest:"\u0938\u092c\u0938\u0947 \u0928\u095b\u0926\u0940\u0915\u0940 \u0915\u0940 \u0935\u093f\u0936\u0947\u0937\u0924\u093e",summaryNearby:"\u0906\u0938-\u092a\u093e\u0938 \u0915\u093e \u0938\u093e\u0930\u093e\u0902\u0936",summaryIntersecting:"\u092a\u094d\u0930\u0924\u093f\u091a\u094d\u091b\u0947\u0926\u0940 \u0915\u093e \u0938\u093e\u0930\u093e\u0902\u0936",
distToNearestLabel:"\u092c\u093f\u0928 \u0915\u0947\u0902\u0926\u094d\u0930 \u0938\u0947 \u0907\u0928\u092a\u0941\u091f \u0932\u0947\u092f\u0930 \u0915\u0940 \u0928\u095b\u0926\u0940\u0915\u0940 \u0938\u0941\u0935\u093f\u0927\u093e \u0915\u0940 \u0926\u0942\u0930\u0940",attrOfInterestLabel:"\u0907\u0928\u092a\u0941\u091f \u0932\u0947\u092f\u0930 \u0938\u0947 \u0938\u092c\u0938\u0947 \u0928\u095b\u0926\u0940\u0915\u0940 \u0938\u0941\u0935\u093f\u0927\u093e \u0924\u0915 \u0915\u0940 \u0926\u0942\u0930\u0940 \u0938\u0947 \u0935\u093f\u0936\u093f\u0937\u094d\u091f \u095e\u0940\u0932\u094d\u0921 \u0915\u093e \u092e\u093e\u0928",
summaryNearbyLabel:"\u092c\u093f\u0928 \u0915\u0947 \u0915\u0947\u0902\u0926\u094d\u0930 \u0938\u0947 \u0928\u093f\u0930\u094d\u0926\u093f\u0937\u094d\u091f \u0926\u0942\u0930\u0940 \u0915\u0947 \u0938\u093e\u0925 \u0938\u092d\u0940 \u0938\u0941\u0935\u093f\u0927\u093e\u0913\u0902 \u0915\u0947 \u0932\u093f\u090f \u0906\u0901\u0915\u0921\u093c\u0947 \u092a\u0930\u093f\u0915\u0932\u093f\u0924 \u0915\u093f\u090f \u0917\u090f",summaryIntersectingLabel:"\u0909\u0928 \u0938\u092d\u0940 \u0938\u0941\u0935\u093f\u0927\u093e\u0913\u0902 \u0915\u093e \u0938\u093e\u0902\u0916\u094d\u092f\u093f\u0915\u0940\u092f \u092a\u0930\u093f\u0915\u0932\u0928 \u091c\u094b \u092c\u093f\u0928 \u092a\u0930 \u092e\u093f\u0932\u0924\u0940 \u0939\u0948\u0902",
maxDistancefromCtr:"\u092c\u093f\u0928 \u0915\u0947 \u0915\u0947\u0902\u0926\u094d\u0930 \u0938\u0947 \u0905\u0927\u093f\u0915\u0924\u092e \u0926\u0942\u0930\u0940",fieldToIncude:"\u0936\u093e\u092e\u093f\u0932 \u0915\u0940 \u091c\u093e\u0928\u0947 \u0935\u093e\u0932\u0940 \u095e\u0940\u0932\u094d\u0921",statstoCalculate:"\u092a\u0930\u093f\u0915\u0932\u093f\u0924 \u0915\u093f\u090f \u091c\u093e\u0928\u0947 \u0935\u093e\u0932\u0947 \u0906\u0902\u0915\u095c\u0947",summFeatuesWithin:"\u0907\u0938\u092e\u0947\u0902 \u092e\u094c\u091c\u0942\u0926 \u0938\u0941\u0935\u093f\u0927\u093e\u0913\u0902 \u0915\u093e \u0938\u093e\u0930\u093e\u0902\u0936 \u0926\u0947\u0902",
smallMaxDistErrorMsg:"\u092c\u093f\u0928 \u0915\u0947 \u0915\u0947\u0902\u0926\u094d\u0930 \u0938\u0947 \u0905\u0927\u093f\u0915\u0924\u092e \u0926\u0942\u0930\u0940 \u0915\u094b \u092c\u093f\u0928 \u0915\u0947 \u0906\u0915\u093e\u0930 \u0938\u0947 \u0905\u0927\u093f\u0915 \u0939\u094b\u0928\u0940 \u091a\u093e\u0939\u093f\u090f\u0964",smallSumFeaturesErrorMsg:"\u092c\u093f\u0928 \u0915\u0947 \u0915\u0947\u0902\u0926\u094d\u0930 \u0938\u0947 \u0905\u0927\u093f\u0915\u0924\u092e \u0926\u0942\u0930\u0940 \u0915\u094b \u092c\u093f\u0928 \u0915\u0947 \u0906\u0915\u093e\u0930 \u0938\u0947 \u0905\u0927\u093f\u0915 \u0939\u094b\u0928\u0940 \u091a\u093e\u0939\u093f\u090f\u0964"});
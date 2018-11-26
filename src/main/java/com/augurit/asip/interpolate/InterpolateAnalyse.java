package com.augurit.asip.interpolate;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.geom.Polygon;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.shapefile.ShapefileDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureIterator;
import org.geotools.data.simple.SimpleFeatureSource;

import org.geotools.geojson.GeoJSONUtil;
import org.geotools.geojson.feature.FeatureJSON;
import org.opengis.feature.simple.SimpleFeature;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/interpolate")
public class InterpolateAnalyse {
    @RequestMapping("/analyse")
    public static ArrayList<YLStation> analyse(String url) throws Exception{
        InterpolateAnalyse analyse=new InterpolateAnalyse();
        System.out.println(url);
        //url="http://10.194.170.75/arcgis/rest/services/RainIDW/MapServer/jobs/j9533f19a1c7a4e9b80cf9ca623263a79";
        //http://10.194.170.75/arcgis/rest/services/Rain3/MapServer/jobs/jdcef6fc1fc174cf4836ec14e068bee35
        //http://10.194.170.75/arcgis/rest/services/RainIDW/MapServer/idw/jobs/j9533f19a1c7a4e9b80cf9ca623263a79
        ConcurrentHashMap<String, SimpleFeature> polygonMap =analyse.getFeatureMapByUrl("FID", url+"/1/query");
        getInteranlPolygon(polygonMap);//获取等值面的极值面
        ConcurrentHashMap<String, SimpleFeature> pointMap = analyse.getFeatureMapByUrl("STNM", url+"/2/query");
        ConcurrentHashMap<String, ArrayList<SimpleFeature>> internalPoint = getInternalPoint(polygonMap, pointMap);//获取与面相交的点集
        ArrayList<SimpleFeature> resultPointList=getMaxPointList(internalPoint);//取得雨量最大值的站点
        ArrayList<YLStation> stations=getStations(resultPointList);
        System.out.println("中心雨量站个数:" +resultPointList.size());
        return stations;
    }

    public static void main(String[] args) throws Exception {
        String baseUrl="http://10.194.170.75/arcgis/rest/services/RainIDW/MapServer/jobs/j9533f19a1c7a4e9b80cf9ca623263a79";
        //http://10.194.170.75/arcgis/rest/services/Rain3/MapServer/jobs/jdcef6fc1fc174cf4836ec14e068bee35
        //http://10.194.170.75/arcgis/rest/services/RainIDW/MapServer/idw/jobs/j9533f19a1c7a4e9b80cf9ca623263a79
        ConcurrentHashMap<String, SimpleFeature> polygonMap = new InterpolateAnalyse().getFeatureMapByUrl("FID", baseUrl+"/1/query");
        getInteranlPolygon(polygonMap);//获取等值面的极值面
        ConcurrentHashMap<String, SimpleFeature> pointMap = new InterpolateAnalyse().getFeatureMapByUrl("STNM", baseUrl+"/2/query");
        ConcurrentHashMap<String, ArrayList<SimpleFeature>> internalPoint = getInternalPoint(polygonMap, pointMap);//获取与面相交的点集
        ArrayList<SimpleFeature> resultPointList=getMaxPointList(internalPoint);//取得雨量最大值的站点
        ArrayList<YLStation> stations=getStations(resultPointList);
        System.out.println(polygonMap.size() + ":" +resultPointList.size());

    }

    private ConcurrentHashMap<String, SimpleFeature> getFeatureMapByUrl(String property,String serviceUrl) throws Exception{
        String result= sendGet(serviceUrl, "where=1=1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=2435&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson");
        JSONObject obj=JSONObject.parseObject(result);
        JSONArray features=obj.getJSONArray("features");
        ConcurrentHashMap<String, SimpleFeature> featureMap = new ConcurrentHashMap<String, SimpleFeature>();
        for(int i=0;i<features.size();i++){
            SimpleFeature sf=parseSimpleFeature(features.getJSONObject(i));
            featureMap.put(sf.getAttribute(property).toString(),sf);
        }
        return featureMap;
    }

    private SimpleFeature parseSimpleFeature(JSONObject jsonObject)  throws Exception{
        FeatureJSON fjson = new FeatureJSON();
        SimpleFeature sf=fjson.readFeature(GeoJSONUtil.toReader(jsonObject.toString()));
        return sf;
    }

    private static ArrayList<YLStation> getStations(ArrayList<SimpleFeature> resultPointList) {
        ArrayList<YLStation> resultList=new ArrayList<YLStation>();
        for(SimpleFeature point : resultPointList){
            YLStation station=new YLStation();
            String stnm=point.getAttribute("STNM").toString();
            double dvalue=Double.valueOf(point.getAttribute("D_value").toString());
            int objectid=Integer.valueOf(point.getAttribute("OBJECTID").toString());
            double x=((Point)point.getDefaultGeometry()).getX();
            double y=((Point)point.getDefaultGeometry()).getY();
            station.setX(x);
            station.setY(y);
            station.setStnm(stnm);
            station.setD_value(dvalue);
            station.setObjectid(objectid);
            if(dvalue>0)
            resultList.add(station);
        }
        return resultList;
    }

    private static ArrayList<SimpleFeature> getMaxPointList(ConcurrentHashMap<String, ArrayList<SimpleFeature>> internalPoint) {
        ArrayList<SimpleFeature> result=new ArrayList<SimpleFeature>();
        for(String key : internalPoint.keySet()){
            ArrayList<SimpleFeature> pointOfPolygon=internalPoint.get(key);
            SimpleFeature maxPoint=getMaxPoint(pointOfPolygon);
            result.add(maxPoint);
        }
        return result;
    }

    private static SimpleFeature getMaxPoint(ArrayList<SimpleFeature> pointOfPolygon) {
        SimpleFeature maxPoint=null;
        if(pointOfPolygon.size()>0) {
            if(pointOfPolygon.size()==1){
                maxPoint=pointOfPolygon.get(0);
            }else{
                maxPoint=pointOfPolygon.get(0);
                for (int i = 1; i < pointOfPolygon.size(); i++) {
                    SimpleFeature tempPoint=pointOfPolygon.get(i);
                    double thisValue=Double.valueOf(tempPoint.getAttribute("D_value").toString());
                    double maxValue=Double.valueOf(maxPoint.getAttribute("D_value").toString());
                    if(thisValue>maxValue) maxPoint=tempPoint;
                }
            }
        }
        return maxPoint;
    }

    private static ConcurrentHashMap<String, ArrayList<SimpleFeature>> getInternalPoint(ConcurrentHashMap<String, SimpleFeature> internalMap, ConcurrentHashMap<String, SimpleFeature> pointMap) {
        ConcurrentHashMap<String, ArrayList<SimpleFeature>> resultList = new ConcurrentHashMap<String, ArrayList<SimpleFeature>>();
        for (String key : internalMap.keySet()) {
            SimpleFeature polygonFeature = internalMap.get(key);
            Polygon mulPolygon=(Polygon)polygonFeature.getDefaultGeometry();
            for (String pKey : pointMap.keySet()) {
                SimpleFeature featurePoint=pointMap.get(pKey);
                Point tempPoint=(Point)featurePoint.getDefaultGeometry();
                if (mulPolygon.contains(tempPoint)) {
                    if (resultList.get(key) == null) {
                        resultList.put(key, new ArrayList<SimpleFeature>());
                    }
                    resultList.get(key).add(featurePoint);
                }
            }
        }
        return resultList;
    }

    private static void getInteranlPolygon(ConcurrentHashMap<String, SimpleFeature> polygonMap) {
        for(String key : polygonMap.keySet()){
            SimpleFeature sf = polygonMap.get(key);
            Polygon mp=(Polygon)sf.getDefaultGeometry();
            if (!isRings(mp)) {
                polygonMap.remove(key);
            }
        }

        //ConcurrentHashMap<String, SimpleFeature> resultMap = new ConcurrentHashMap<String, SimpleFeature>();
//        for (String key : polygonMap.keySet()) {
//            SimpleFeature sf = polygonMap.get(key);
//            MultiPolygon mp=(MultiPolygon)sf.getDefaultGeometry();
//            if (isRings(mp)) {
//                resultMap.put(key, sf);
//            }
//        }
//        return resultMap;
    }

    private static boolean isRings(Polygon mulPolygon) {//是否凹多边形,返回否就是凹多边形
        Polygon polygon = (Polygon) mulPolygon.getGeometryN(0);
        if (polygon.getNumInteriorRing() > 0) {//
            return false;
        } else {
            return true;
        }
    }

    public static  String sendGet(String url,String param) throws Exception{
        //application/x-www-form-urlencoded; charset=UTF-8中文
        URL realUrl = new URL(url+'?'+param);
        // 打开和URL之间的连接
        URLConnection connection = realUrl.openConnection();
        connection.connect();
        BufferedReader in = new BufferedReader(new InputStreamReader(
                connection.getInputStream(),"UTF-8"));
        String line,result="";
        while ((line = in.readLine()) != null) {
            result += line+"\r\n";
        }
        return result;
    }


    public ConcurrentHashMap<String, SimpleFeature> getFeatureMap(String property,String filePath) {
        ShapefileDataStoreFactory dataStoreFactory = new ShapefileDataStoreFactory();
        ConcurrentHashMap<String, SimpleFeature> polygonMap = new ConcurrentHashMap<String, SimpleFeature>();
        try {
            ShapefileDataStore sds = (ShapefileDataStore) dataStoreFactory.createDataStore(new File(filePath).toURI().toURL());
            sds.setCharset(Charset.forName("GBK"));
            SimpleFeatureSource featureSource = sds.getFeatureSource();
            SimpleFeatureIterator itertor = featureSource.getFeatures().features();
            while (itertor.hasNext()) {    //遍历feature
                SimpleFeature feature = itertor.next();
                polygonMap.put(feature.getAttribute(property).toString(), feature);
            }
            itertor.close();
            sds.dispose();
            itertor.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return polygonMap;
    }

}
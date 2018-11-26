<%@page session="false" %>
<%@page import="java.io.InputStream,java.io.OutputStream" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.net.URLDecoder" %>
<%@ page import="java.io.ByteArrayOutputStream" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.regex.Matcher" %>
<%@ page import="java.io.ByteArrayInputStream" %>
<%
    try {
        String reqUrl = request.getQueryString();
        reqUrl = URLDecoder.decode(reqUrl, "UTF-8");
        reqUrl = reqUrl.replaceAll("(https?://[^\\?]+proxy\\.jsp\\?)(https?://[^\\?]+proxy\\.jsp\\?)(.*)", "$1$3");
        URL url = new URL(reqUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setDoOutput(true);
        con.setConnectTimeout(60*1000);
        con.setReadTimeout(3*60*1000);
        con.setRequestMethod(request.getMethod());
        if (request.getMethod().equals(String.valueOf("POST"))) {
            con.setRequestProperty("Content-Type", request.getHeader("Content-Type"));
        }
        int clength = request.getContentLength();
        if (clength > 0) {
            con.setDoInput(true);
            InputStream istream = request.getInputStream();
            OutputStream os = con.getOutputStream();
            final int length = 5000;
            byte[] bytes = new byte[length];
            int bytesRead = 0;
            while ((bytesRead = istream.read(bytes, 0, length)) > 0) {
                os.write(bytes, 0, bytesRead);
            }
        }
        out.clear();
        out = pageContext.pushBody();
        OutputStream ostream = response.getOutputStream();
        response.setContentType(con.getContentType());
        InputStream in = con.getInputStream();
        if (reqUrl.matches(".*(?i)\\.css$")) {
            in = covert(in, reqUrl);
        } else if (reqUrl.indexOf("/micmap.js") != -1) {
            in = getMicmap(in, reqUrl);
        }
        final int length = 5000;
        byte[] bytes = new byte[length];
        int bytesRead = 0;
        while ((bytesRead = in.read(bytes, 0, length)) > 0) {
            ostream.write(bytes, 0, bytesRead);
        }
    } catch (Exception e) {
        response.setStatus(500);
    }
%>
<%!
    public byte[] readStream(InputStream inStream) throws Exception {
        if (inStream == null) return null;
        ByteArrayOutputStream outSteam = null;
        try {
            outSteam = new ByteArrayOutputStream();
            byte[] buffer = new byte[2048];
            int len = -1;
            while ((len = inStream.read(buffer)) != -1) {
                outSteam.write(buffer, 0, len);
            }
            outSteam.flush();
            return outSteam.toByteArray();
        } finally {
            if (outSteam != null) outSteam.close();
            inStream.close();
        }
    }

    public String checkNull(Object inputField) {
        if (inputField == null) {
            return "";
        } else {
            String tempStr = inputField.toString();
            if (tempStr == null) {
                return "";
            } else {
                tempStr = tempStr.trim();
                return tempStr.equalsIgnoreCase("null") ? "" : tempStr;
            }
        }
    }

    public InputStream covert(InputStream inStream, String uri) throws Exception {
        String resource = new String(readStream(inStream), "utf8");
        inStream.close();
        Pattern regex = Pattern.compile("url\\(('|\")?((\\.\\./)*)([^\\(\\)'\"]*)('|\")?\\)");
        Matcher m = regex.matcher(resource);
        StringBuffer b = new StringBuffer();
        String[] sp_uri = uri.split("/");
        while (m.find()) {
            String second = checkNull(m.group(2));
            String fourth = checkNull(m.group(4));
            String url = "";
            if (second.length() == 0) {
                StringBuffer sb = new StringBuffer();
                for (int i = 0; i < sp_uri.length - 1; i++) {
                    sb.append(sp_uri[i] + "/");
                }
                url = sb.toString();
            } else {
                String[] sp = second.split("/");
                StringBuffer sb = new StringBuffer();
                for (int i = 0; i < sp_uri.length - sp.length - 1; i++) {
                    sb.append(sp_uri[i] + "/");
                }
                url = sb.toString();
            }
            url = "proxy.jsp?" + url;
            m.appendReplacement(b, "url('" + url + fourth + "')");
        }
        m.appendTail(b);
        ByteArrayInputStream e = new ByteArrayInputStream(b.toString().getBytes("utf8"));
        return e;
    }

    public InputStream getMicmap(InputStream inStream, String uri) throws Exception {
        String resource = new String(readStream(inStream), "utf8");
        inStream.close();
        uri = uri.replaceAll("^([^/]+//[^/]+/[^/]+)/.*$", "$1");
        resource = resource.replace("basePath+\"/agcom/resources/lib/js/echarts-2.2.7/build/source/echarts-all.js\"", "\"" + uri + "/agcom/resources/lib/js/echarts-2.2.7/build/source/echarts-all.js\"");
        resource = resource.replaceAll(",requirejs.config\\(.+\\);$", ";");
        ByteArrayInputStream ins = new ByteArrayInputStream(resource.getBytes("utf8"));
        return ins;
    }
%>

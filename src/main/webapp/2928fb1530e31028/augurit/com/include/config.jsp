<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.util.regex.Matcher" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.io.*" %>
<%@ page import="com.common.util.ConfigProperties" %>

<%
    request.setCharacterEncoding("utf-8");
    String basePath = "../../../proxy.jsp?" + getBasePath();
    String agsupportUrl = getProperty("agsupport.url");
    String loginName = getLoginName(request);
    String currentPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getRequestURI();
    currentPath = currentPath.replaceAll("^(.*/)([^/]+)", "$1");
    String browserIp = getIpAddr(request);
%>
<%!
   // public String basePath = "http://192.168.30.101:8088/agcom";    //  样式、js引用Ip
	public String basePath = ConfigProperties.getByKey("agcom.url");
   private static Pattern regex = Pattern.compile("[\\u4e00-\\u9fa5]");

    public String getBasePath() {
        return basePath;
    }

    public String getIpAddr(HttpServletRequest request) {
        String ip = getRemoteAddrIp(request);
        if (ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)) {
            ip = request.getHeader(" x-forwarded-for ");
        }
        if (ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)) {
            ip = request.getHeader(" Proxy-Client-IP ");
        }
        if (ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)) {
            ip = request.getHeader(" WL-Proxy-Client-IP ");
        }
        if (ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    public boolean isCheckNull(Object inputField) {
        if (inputField instanceof Collection) {
            Collection map1 = (Collection) inputField;
            return map1 == null || map1.size() == 0;
        } else if (inputField instanceof Map) {
            Map map = (Map) inputField;
            return map == null || map.isEmpty();
        } else {
            return CheckNull(inputField).length() == 0;
        }
    }

    public String CheckNull(Object inputField) {
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

    private String getRemoteAddrIp(HttpServletRequest request) {
        String ipFromNginx = getHeader(request, "X-Real-IP");
        return isCheckNull(ipFromNginx) ? request.getRemoteAddr() : ipFromNginx;
    }

    private String getHeader(HttpServletRequest request, String headName) {
        String value = request.getHeader(headName);
        return isCheckNull(value) && !"unknown".equalsIgnoreCase(value) ? value : "";
    }

    public String getProperty(String key) throws Exception {
        if (isCheckNull(key)) return "";
        Map data = new HashMap();
        data.put("key", key);
        HttpRespons respons = send(basePath + "/agcom/structure/property", "GET", data, (Map) null);
        return respons.getContent();
    }

    public String getUserId(String loginName) throws Exception {
        String url = getProperty("agsupport.url") + "/agsupport/user/getUserIdByName/" + loginName;
        HttpRespons respons = send(url, "GET", (Map) null, (Map) null);
        return respons.getContent();
    }

    public String getUserName(String loginName) throws Exception {
        String url = getProperty("agsupport.url") + "/agsupport/user/getUserByName/" + loginName;
        HttpRespons respons = send(url, "GET", (Map) null, (Map) null);
        return respons.getContent();
    }

    public String getLoginName(HttpServletRequest request) {
        String loginName = "";
        try {
            if (!isCheckNull(request.getUserPrincipal())) {
                loginName = request.getUserPrincipal().getName();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return loginName;
    }

    public synchronized HttpRespons send(String urlString, String method, Map<String, String> parameters, Map<String, String> propertys) throws IOException {
        HttpURLConnection urlConnection = null;
        StringBuffer param = new StringBuffer();
        try {
            urlString = urlString.replaceAll("\\?$", "");
            int e;
            String httpResponser;
            Iterator ecod;
            String input;
            if (method.equalsIgnoreCase("GET") && parameters != null) {
                e = 0;
                ecod = parameters.keySet().iterator();
                while (true) {
                    if (!ecod.hasNext()) {
                        urlString = urlString + param;
                        break;
                    }
                    httpResponser = (String) ecod.next();
                    if (e == 0 && !urlString.contains("?")) {
                        param.append("?");
                    } else {
                        param.append("&");
                    }
                    input = (String) parameters.get(httpResponser);
                    if (!isCheckNull(input)) {
                        param.append(URLEncoder.encode(httpResponser, "UTF-8")).append("=").append(URLEncoder.encode(input, "UTF-8"));
                    } else {
                        param.append(URLEncoder.encode(httpResponser, "UTF-8")).append("=");
                    }
                    ++e;
                }
            }
            if (method.equalsIgnoreCase("POST") && parameters != null) {
                e = 0;
                for (ecod = parameters.keySet().iterator(); ecod.hasNext(); ++e) {
                    httpResponser = (String) ecod.next();
                    if (e != 0) {
                        param.append("&");
                    }
                    input = (String) parameters.get(httpResponser);
                    if (!isCheckNull(input)) {
                        param.append(URLEncoder.encode(httpResponser, "UTF-8")).append("=").append(URLEncoder.encode(input, "UTF-8"));
                    } else {
                        param.append(URLEncoder.encode(httpResponser, "UTF-8")).append("=");
                    }
                }
            }
            urlString = encode(urlString);
            URL var20 = new URL(urlString);
            urlConnection = (HttpURLConnection) var20.openConnection();
            if (method.equalsIgnoreCase("GET")) {
                urlConnection.setRequestMethod("GET");
            } else {
                urlConnection.setRequestMethod("POST");
            }
            urlConnection.setRequestMethod(method);
            urlConnection.setDoOutput(true);
            urlConnection.setDoInput(true);
            urlConnection.setUseCaches(false);
            if (propertys != null) {
                ecod = propertys.keySet().iterator();
                while (ecod.hasNext()) {
                    httpResponser = (String) ecod.next();
                    urlConnection.addRequestProperty(httpResponser, (String) propertys.get(httpResponser));
                }
            }
            if (method.equalsIgnoreCase("POST") && !isCheckNull(parameters)) {
                OutputStream var21 = urlConnection.getOutputStream();
                var21.write(encode(param.toString()).getBytes());
                var21.flush();
                var21.close();
            }
            HttpRespons var22 = new HttpRespons();
            String var23 = "UTF-8";
            InputStream var24 = urlConnection.getInputStream();
            byte[] bytay = getByteArr(var24);
            boolean isText = true;
            int i = 0;
            while (true) {
                if (i < bytay.length) {
                    if (bytay[i] != 0) {
                        ++i;
                        continue;
                    }
                    isText = false;
                }
                var22.isText = isText;
                var22.bytay = bytay;
                var22.urlString = urlString;
                var22.defaultPort = urlConnection.getURL().getDefaultPort();
                var22.file = urlConnection.getURL().getFile();
                var22.host = urlConnection.getURL().getHost();
                var22.path = urlConnection.getURL().getPath();
                var22.port = urlConnection.getURL().getPort();
                var22.protocol = urlConnection.getURL().getProtocol();
                var22.query = urlConnection.getURL().getQuery();
                var22.ref = urlConnection.getURL().getRef();
                var22.userInfo = urlConnection.getURL().getUserInfo();
                var22.contentEncoding = var23;
                var22.code = urlConnection.getResponseCode();
                var22.message = urlConnection.getResponseMessage();
                var22.contentType = urlConnection.getContentType();
                var22.method = urlConnection.getRequestMethod();
                var22.connectTimeout = urlConnection.getConnectTimeout();
                var22.readTimeout = urlConnection.getReadTimeout();
                HttpRespons var15 = var22;
                return var15;
            }
        } catch (IOException var18) {
            if (urlConnection != null) {
                System.out.println("error url: " + urlConnection.getURL());
            }
            throw var18;
        } finally {
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
        }
    }

    public static String encode(String str) {
        Matcher m = regex.matcher(str);
        StringBuffer b = new StringBuffer();
        try {
            while (m.find()) {
                String e = m.group();
                m.appendReplacement(b, URLEncoder.encode(e, "UTF-8"));
            }
        } catch (Exception var4) {
            var4.printStackTrace();
        }
        m.appendTail(b);
        return b.toString();
    }

    private byte[] getByteArr(InputStream input) throws IOException {
        ArrayList list = new ArrayList();
        int total = 0;
        while (true) {
            byte bytay = 64;
            byte[] i = new byte[bytay];
            int n = input.read(i);
            byte[] byt;
            if (n == -1) {
                input.close();
                byte[] var10 = new byte[total];
                int var11 = 0;
                for (n = 0; var11 < list.size(); ++var11) {
                    byt = (byte[]) list.get(var11);
                    for (int j = 0; j < byt.length; ++n) {
                        byte temp = byt[j];
                        var10[n] = temp;
                        ++j;
                    }
                }
                return var10;
            }
            if (n < bytay) {
                byt = new byte[n];
                System.arraycopy(i, 0, byt, 0, n);
                list.add(byt);
            } else {
                list.add(i);
            }
            total += n;
        }
    }


%>
<%!
    class HttpRespons {
        String urlString;
        int defaultPort;
        String file;
        String host;
        String path;
        int port;
        String protocol;
        String query;
        String ref;
        String userInfo;
        String contentEncoding;
        StringBuffer content;
        String contentType;
        int code;
        String message;
        String method;
        int connectTimeout;
        int readTimeout;
        byte[] bytay;
        boolean isText;

        public HttpRespons() {
        }

        public String getContent() {
            return this.getContentBuffer().toString();
        }

        public StringBuffer getContentBuffer() {
            if (this.content == null) {
                try {
                    ByteArrayInputStream e = new ByteArrayInputStream(this.bytay);
                    InputStreamReader input = new InputStreamReader(e, "UTF-8");
                    BufferedReader reader = new BufferedReader(input);
                    this.content = new StringBuffer();
                    String line = null;
                    for (int i = 0; (line = reader.readLine()) != null; this.content.append(line)) {
                        if (i++ > 0) {
                            this.content.append("\r\n");
                        }
                    }
                    reader.close();
                } catch (Exception var6) {
                    var6.printStackTrace();
                }
            }
            return this.content;
        }

        public String getUrlString() {
            return this.urlString;
        }

        public int getDefaultPort() {
            return this.defaultPort;
        }

        public String getFile() {
            return this.file;
        }

        public String getHost() {
            return this.host;
        }

        public String getPath() {
            return this.path;
        }

        public int getPort() {
            return this.port;
        }

        public String getProtocol() {
            return this.protocol;
        }

        public String getQuery() {
            return this.query;
        }

        public String getRef() {
            return this.ref;
        }

        public String getUserInfo() {
            return this.userInfo;
        }

        public String getContentEncoding() {
            return this.contentEncoding;
        }

        public String getContentType() {
            return this.contentType;
        }

        public int getCode() {
            return this.code;
        }

        public String getMessage() {
            return this.message;
        }

        public String getMethod() {
            return this.method;
        }

        public int getConnectTimeout() {
            return this.connectTimeout;
        }

        public int getReadTimeout() {
            return this.readTimeout;
        }

        public byte[] getBytay() {
            return this.bytay;
        }

        public boolean isText() {
            return this.isText;
        }
    }
%>

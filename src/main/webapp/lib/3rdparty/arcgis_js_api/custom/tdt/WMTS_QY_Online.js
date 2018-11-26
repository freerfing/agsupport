define(["dojo/_base/declare", "esri/layers/TiledMapServiceLayer"],
function (declare, tile) {
    var layerType = {
        "dlg": {
            "url": "http://19.168.104.247/qy_dlg_gov/wmts",
            "9to14": { "layer": "qyZwbDlg9to14", "tileMatrixSet": "Matrix_3" },
            "15to17": { "layer": "qyZwbDlg15to17", "tileMatrixSet": "Matrix_0" },
            "18to20": { "layer": "qyZwbDlg18to20", "tileMatrixSet": "Matrix_6" }
        },
        "dlgzj": {
            "url": "http://19.168.104.247/qy_dlg_gov_zj/wmts",
            "9to14": { "layer": "qyZwbDlgZJ9to14", "tileMatrixSet": "Matrix_0" },
            "15to17": { "layer": "qyZwbDlgZJ15to17", "tileMatrixSet": "Matrix_6" },
            "18to20": { "layer": "qyZwbDlgZJ18to20", "tileMatrixSet": "Matrix_3" }
        },
        "dom": {
            "url": "http://19.168.104.247/qy_dom_gov/wmts",
            "9to14": { "layer": "qyZwbDom9to14", "tileMatrixSet": "Matrix_6" },
            "15to17": { "layer": "qyZwbDom15to17", "tileMatrixSet": "Matrix_3" },
            "18to20": { "layer": "qyZwbDom18to20", "tileMatrixSet": "Matrix_0" }
		},
        "domzj": {
            "url": "http://19.168.104.247/qy_dom_gov_zj/wmts",
            "9to14": { "layer": "qyZwbDomZJ9to14", "tileMatrixSet": "Matrix_3" },
            "15to17": { "layer": "qyZwbDomZJ15to17", "tileMatrixSet": "Matrix_6" },
            "18to20": { "layer": "qyZwbDomZJ18to20", "tileMatrixSet": "Matrix_0" }
		}
	};
return declare("custom.QY.WMTS_QY", tile,
    {
        constructor: function (type) {
			this.id = type;
            this.type = type;
            this.spatialReference = new esri.SpatialReference({ wkid: 4490 });
            this.initialExtent = new esri.geometry.Extent(113.2261534040657, 23.516950933378663, 113.50627503561122, 23.659245848053327, this.spatialReference);
			this.fullExtent = new esri.geometry.Extent(111.796875, 23.203125, 114.609375, 25.3125, this.spatialReference);
            this.tileInfo = new esri.layers.TileInfo({
                "rows": 256,
                "cols": 256,
                "compressionQuality": 0,
                "origin": { "x": -180, "y": 90 },
                "spatialReference": { "wkid": 4490 },
                "lods": [
					{ "level": 9, "resolution":  0.00274966018695, "scale": 1155583.419744397 },
					{ "level": 10, "resolution": 0.001374830093475, "scale": 577791.7098721985 },
					{ "level": 11, "resolution": 0.0006874150467375, "scale": 288895.85493609926 },
					{ "level": 12, "resolution": 0.00034370752336875, "scale": 144447.92746804963 },
					{ "level": 13, "resolution": 0.000171853761684375, "scale": 72223.96373402482 },
					{ "level": 14, "resolution": 0.0000859268808421875, "scale": 36111.98186701241 },
					{ "level": 15, "resolution": 0.00004296344042109375, "scale": 18055.990933506204 },
					{ "level": 16, "resolution": 0.000021481720210546875, "scale": 9027.995466753102 },
					{ "level": 17, "resolution": 0.0000107408601052734375, "scale": 4513.997733376551 },
					{ "level": 18, "resolution": 0.00000537043005263671875, "scale": 2256.9988666882755 },
					{ "level": 19, "resolution": 0.000002685215026318359375, "scale": 1128.4994333441377 },
					{ "level": 20, "resolution": 0.0000013426075131591796875, "scale": 564.2497166720689 }
				]
            });
            this.loaded = true;
            this.onLoad(this);
        },
        getTileUrl: function (level, row, col) {
            var layerInfo;
            if (9 <= level && level <= 14) layerInfo = layerType[this.type]["9to14"];
            if (15 <= level && level <= 17) layerInfo = layerType[this.type]["15to17"];
            if (18 <= level && level <= 20) layerInfo = layerType[this.type]["18to20"];
            var layer = layerInfo.layer;
            var set = layerInfo.tileMatrixSet;
            var url = layerType[this.type].url;
            return url + "?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=" + layer + "&STYLE=" + layer + "&TILEMATRIXSET=" + set + "&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=image/png";
        }
    }
    );
}
);

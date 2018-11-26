define(["dojo/_base/declare", "esri/layers/TiledMapServiceLayer"],
function (declare, tile) {
return declare("custom.QY.WMTS_QY", tile,
    {
        constructor: function (url) {
			this.id = url.split("/")[(url.split("/").length - 1)];
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
            return this.url+"/L"+dojo.string.pad(level, 2, '0') +"/R"+(dojo.string.pad(row.toString(16), 8, '0')).toLowerCase()+"/C"+(dojo.string.pad(col.toString(16), 8, '0')).toLowerCase()+".png";
        }
    }
    );
}
);

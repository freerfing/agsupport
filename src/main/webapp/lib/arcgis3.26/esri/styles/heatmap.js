// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/styles/heatmap",["dojo/_base/array","dojo/_base/lang","dojo/has","../kernel","../Color"],function(f,l,q,r,t){function d(a,b){return f.map(a,function(a){a=new t(a);null!=b&&(a.a=b);return a})}var m={v1:"#85c1c8 #90a1be #9c8184 #a761aa #af4980 #b83055 #c0182a #c80000 #d33300 #de6600 #e99900 #f4cc00 #ffff00".split(" "),v2:"#f3e4e5 #e4becb #d498b2 #c57298 #b95685 #ae3972 #a21d5e #96004b #ab006f #c00093 #d500b7 #ea00db #ff00ff".split(" "),v3:"#d4e3f5 #b3c5f7 #93a6fa #7288fc #566ffd #3955fe #1d3bfe #0022ff #334ecc #667a99 #99a766 #ccd333 #ffff00".split(" "),
v4:"#0022c8 #2b1ca7 #551785 #801164 #aa0b43 #d50621 #ff0000 #ff3900 #ff7100 #ffaa00 #ffc655 #ffe3aa #ffffff".split(" "),"dark-yellow-orange":"#664c28 #795523 #8d5f1e #a06819 #b37114 #c67a0f #d9830a #ec8c05 #ff9500 #ffae00 #ffc600 #ffde00 #fff700".split(" "),"dark-yellow-green":"#284c66 #35585b #436550 #507145 #5d7d3a #6f8e2c #819e1d #92af0f #a4bf00 #b9cf00 #cedf00 #e2eF00 #f7ff00".split(" "),"dark-yellow-purple":"#3f2866 #472b77 #4e2d87 #563098 #5d32a8 #6735be #7139d4 #7b3ce9 #853fff #a46fbf #c29f80 #e0cf40 #ffff00".split(" "),
"dark-yellow-magenta":"#730073 #820082 #910091 #a000a0 #af00af #c300c3 #d700d7 #eb00eb #ff00ff #ff58a0 #ff896b #ffb935 #ffea00".split(" "),"dark-white-blue":"#215587 #245b91 #26629b #2968a5 #2b6eaf #307bc3 #3687d7 #3b94eb #40a0ff #6db8ff #9bd0ff #c8e7ff #f5ffff".split(" "),"dark-white-blue-metal":"#404873 #485182 #505990 #57629f #5f6aad #6772bb #6f7bca #7683d8 #7e8be6 #9ea8ec #bfc5f3 #dfe2f9 #ffffff".split(" "),"dark-white-gold":"#4d4700 #5f5700 #706700 #827700 #938700 #a59700 #b6a700 #c8b700 #d9c700 #e3d540 #ece380 #f6f1bf #ffffff".split(" "),
"dark-yellow-bronze":"#592d00 #68390a #764615 #85521F #935e29 #a16a33 #b0773e #be8348 #cc8f52 #d9a877 #e6c19c #f2dac1 #fff3e6".split(" "),"neutral-yellow-orange":"#ccbba3 #d3b68a #d9b270 #e0ad57 #e6a852 #eca32f #f39f1f #f99a10 #ff9500 #ffae00 #ffc600 #ffde00 #fff700".split(" "),"neutral-yellow-green":"#a3bccc #a3bdb3 #a4bd99 #a4be7f #a4be66 #a4be4d #a4bf33 #a4bf1a #a4bf00 #b9cf00 #cedf00 #e2ef00 #f7ff00".split(" "),"neutral-yellow-purple":"#a297b3 #9f8cbd #9b81c6 #9876d0 #946bd9 #9060cf #8d55ec #894af6 #853fff #a46fbf #c29f80 #e0cf40 #ffff00".split(" "),
"neutral-yellow-magenta":"#b397b3 #bd84bd #c672c6 #d05fd0 #d94cd9 #e339e3 #ec26ec #f613f6 #ff00ff #ff3bbf #ff7580 #ffb040 #ffea00".split(" "),"neutral-white-blue":"#97a5b3 #8ca4bd #82a4c6 #77a3d0 #6ca2d9 #61a2e3 #56a1ec #4ba1f6 #40a0ff #6db8ff #9bd0ff #c8e7ff #f5ffff".split(" "),"neutral-white-blue-metal":"#979cb3 #949ab9 #9198c0 #8d96c6 #8a94cc #8792d3 #8490d9 #818de0 #7e8be6 #9ea8ec #bfc5f3 #dfe2f9 #ffffff".split(" "),"neutral-white-gold":"#b3b197 #b8b484 #bdb772 #c1b95f #c6bc4c #cbbf39 #d0c226 #d4c413 #d9c700 #e3d540 #ece380 #f6f1bf #ffffff".split(" "),
"neutral-yellow-bronze":"#bfb0a1 #c1ac97 #c3a88d #c4a483 #c6a079 #c89c6f #c99866 #cb935c #cc8f52 #d9a877 #e6c19c #f2dac1 #fff3e6".split(" ")},g={"default":{name:"default",label:"Default",description:"Default theme for visualizing features using heatmap.",basemapGroups:{light:"streets gray topo terrain national-geographic oceans osm".split(" "),dark:["satellite","hybrid","dark-gray"]},schemes:{light:{primary:"v1",secondary:"v2 v3 neutral-yellow-orange neutral-yellow-green neutral-yellow-purple neutral-yellow-magenta neutral-white-blue neutral-white-blue-metal neutral-white-gold neutral-yellow-bronze v4 dark-yellow-orange dark-yellow-green dark-yellow-purple dark-yellow-magenta dark-white-blue dark-white-blue-metal dark-white-gold dark-yellow-bronze".split(" ")},
dark:{primary:"v4",secondary:"dark-yellow-orange dark-yellow-green dark-yellow-purple dark-yellow-magenta dark-white-blue dark-white-blue-metal dark-white-gold dark-yellow-bronze v1 v2 v3 neutral-yellow-orange neutral-yellow-green neutral-yellow-purple neutral-yellow-magenta neutral-white-blue neutral-white-blue-metal neutral-white-gold neutral-yellow-bronze".split(" ")}}}},k={};(function(){var a,b,c,e,n,f,h,d;for(a in g)for(e in b=g[a],c=b.basemapGroups,n=k[a]={basemaps:[].concat(c.light).concat(c.dark)},
c)for(f=c[e],h=0;h<f.length;h++)d=f[h],b.schemes&&(n[d]=b.schemes[e])})();var p={getAvailableThemes:function(a){var b=[],c,e,d;for(c in g)e=g[c],d=k[c],a&&-1===f.indexOf(d.basemaps,a)||b.push({name:e.name,label:e.label,description:e.description,basemaps:d.basemaps.slice(0)});return b},getSchemes:function(a){var b=a.basemap;a=k[a.theme];var c;(b=a&&a[b])&&(c={primaryScheme:{name:b.primary,colors:d(m[b.primary]),opacity:.7},secondarySchemes:f.map(b.secondary,function(a){return{name:a,colors:d(m[a]),
opacity:.7}})});return c},cloneScheme:function(a){var b;a&&(b=l.mixin({},a),b.colors=d(b.colors));return b}};q("extend-esri")&&l.setObject("styles.heatmap",p,r);return p});
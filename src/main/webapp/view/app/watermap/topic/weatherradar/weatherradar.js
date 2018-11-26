define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal"],
  function ($, app, composition, ko, common, http, panal) {
    var curPanal;
    var Weatherradar = {
      init: function() {
        var that = this;
        composition.addBindingHandler("weatherradarInitHandler", {
          init: function(dom) {
            that.renderUI();
            that.bindUI();
            panalObj = panal.getPanalByElement(dom);
            panalObj.settings.onClose = function () {
                $(".nr_sd>a[name='" + panalObj.param.id + "']").removeClass("hover");
            }
          },
          update: function() {}
        });
      },
      renderUI: function() {
        var that = this;        
      },
      bindUI: function() {
        var that = this;
      }
    }

    var modal = {
    };
    Weatherradar.init();
    return modal;
  });
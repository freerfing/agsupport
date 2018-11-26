define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal"],
  function ($, app, composition, ko, common, http, panal) {
    var curPanal;
    var Cloudchart = {
      init: function() {
        var that = this;
        composition.addBindingHandler("cloudchartInitHandler", {
          init: function(dom) {
            that.renderUI();
            that.bindUI();
            panalObj = panal.getPanalByElement(dom);
            panalObj.settings.onClose = function () {
              $(".nr_sd>a[name='" + panalObj.param.id + "']").removeClass("hover");
            }
            $(dom).click(function() {
              
            });
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
    Cloudchart.init();
    return modal;
  });
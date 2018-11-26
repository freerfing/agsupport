define(['jquery'], function($) {

	$.fn.mouseSelect = function(option) {
        option = $.extend(true, {}, $.fn.mouseSelect.defaults, option);

        return this.each(function() {
            var $this = $(this),
                offset = $this.offset();

            $this.bind('mousedown', function(e) {
                if (e.which == 3)
                    return false;
                option.onBeforeDrag();
                var selList = [];
                $this.find(option.selectClass).each(function() {
                    selList.push($(this));
                });
          
                var isSelect = true;
                var selDiv = null;
                var startX = e.pageX - offset.left;
                var startY = e.pageY - offset.top;
                var _x = null;
                var _y = null;
                clearEventBubble(e);
          
                $this.bind('mousemove', function(e) {
                    if (isSelect) {
                        option.onStartDrag();
                        if (!selDiv) {
                            selDiv = $('<div style="position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;"></div>');
                            if (option.selDivClass) {
                                selDiv.attr('style', '');
                                selDiv.addClass(option.selDivClass);
                            }
                            $this.append(selDiv);
                      
                            selDiv.css('left', startX + 'px');
                            selDiv.css('top', startY + 'px');
                        }

                        if (selDiv.css('display') == 'none') {
                            selDiv.css('display', '');
                        }
                        _x = e.pageX - offset.left;
                        _y = e.pageY - offset.top;
                        selDiv.css('left', Math.min(_x, startX) + 'px');
                        selDiv.css('top', Math.min(_y, startY) + 'px');
                        selDiv.css('width', Math.abs(_x - startX) + 'px');
                        selDiv.css('height', Math.abs(_y - startY) + 'px');
 
                        var _l = selDiv.offset().left, _t = selDiv.offset().top;
                        var _w = selDiv.width(), _h = selDiv.height();
                        for ( var i = 0; i < selList.length; i++) {
                            var sl = selList[i].width() + selList[i].offset().left;
                            var st = selList[i].height() + selList[i].offset().top;
                            if (sl > _l && st > _t && selList[i].offset().left < _l + _w && selList[i].offset().top < _t + _h) {
                                if (!selList[i].hasClass(option.seldClass)) {
                                    selList[i].addClass(option.seldClass);
                                }
                            } else {
                                if (selList[i].hasClass(option.seldClass)) {
                                    selList[i].removeClass(option.seldClass);
                                }
                            }
                        }
                    }
                    clearEventBubble(e);
                });
          
                $this.bind('mouseup', function() {
                    if (e.which == 3)
                        return false;
                    $this.unbind('mousemove');
                    isSelect = false;
                    if (selDiv) {
                        selDiv.remove();
                        option.onStopDrag();
                    }
                    selList = null, _x = null, _y = null, selDiv = null, startX = null, startY = null;
                });
            });

            function clearEventBubble(evt) {
                if (evt.stopPropagation)
                    evt.stopPropagation();
                else
                    evt.cancelBubble = true;
                if (evt.preventDefault)
                    evt.preventDefault();
                else
                    evt.returnValue = false;
            }
        });
    };

    $.fn.mouseSelect.defaults = {
        selDivClass: '',                 //框的css样式
        seldClass: 'mouseSeld',          //为选中的div添加的css样式
        selectClass: '.component',       //可以被选中的div的样式
        onBeforeDrag: function(e){},
        onStartDrag: function(e){},
        onStopDrag: function(e){}
    };

});
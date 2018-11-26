function downloadAttach(fileId) {
	window.open("/agsupport/download/file/" + fileId);
}

function initNoticeInfo() {
    var id=getUrlValue(location.href, "id");
    $.ajax({
        url:'/agsupport/platformNotice/findById',
        data: {"id": id},
        dataType:"json",
        success:function(notice) {
            if(notice){
                $(".title").html(notice.title);
                var publishOrg = '';
				for(var i = 0; i < notice.senderOrgs.length; i++) {
					if(i != 0) {
						publishOrg += '、';
					}
					publishOrg += notice.senderOrgs[i].name;
				}

                $("#publishOrg").html(publishOrg);
                $("#publishUser").html(notice.sender.userName);
                $("#publishTime").html(notice.noticeTime);
                $("#content").html(notice.content);
                if(notice.fileInfos.length > 0) {
                    $("#attachDiv").css('display', "");
                    for(var i=0; i<notice.fileInfos.length; i++){
                        var file = notice.fileInfos[i];
						var fileHtmlContent = ""
							+ '<div class="attachName">'
								+ '<a href="javascript:void(0);" onclick="downloadAttach(\'' + file.id + '\');">附件' + (i+1) + '——' + file.originalFilename + '</a>'
							+ '</div>';

                        $("#attachList").append(fileHtmlContent);
                    }
                }
            }
        },
        error:function(){
            layer.msg("获取公告详情失败");
        }
    });
}


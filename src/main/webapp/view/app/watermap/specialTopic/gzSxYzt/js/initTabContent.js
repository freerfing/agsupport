$(document).ready(
    function () {
        initTabContent(true);
    });


function initTabContent(flag) {
    //Default Action  
    //$(".tab_content").hide(); //Hide all content  
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab  
    $(".tab_content:first").show(); //Show first tab content  

    //On Click Event  
    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active"); //Remove any "active" class  
        $(this).addClass("active"); //Add "active" class to selected tab  
        $(".tab_content").hide(); //Hide all tab content  
        var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content  
        $(activeTab).fadeIn(); //Fade in the active content
        //统计图重绘
        if (flag == true) {
            if (statistic35 == true) {
                initChartAndTable(CZCData35);
            }
            else {
                initChartAndTable(CZCData152);
            }
        }
        return false;
    });
}
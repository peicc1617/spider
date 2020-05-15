//爬取链接
function getSpiderUrl() {
    $.ajax({
        url:"/spider/start",
        type:"GET",
        async:false,
        success:function (result) {
            alert("链接获取完毕");
        }
    });
}
//根据链接获取企业信息
function getEnterpriseInfo() {
    $.ajax({
        url:"/spider/start/getEnterprise",
        type:"GET",
        async:false,
        success:function (result) {
            alert("企业信息获取完毕");
        }
    });
}
//初始化
jQuery(function($) {
    initSpiderPage();
});
function initSpiderPage() {
    $.ajax({
        url:"/api/getDataOfSpider",
        type:"GET",
        async:false,
        success:function (result) {
            var data=result.split(":");
            $("#content0").html(data[0]);
            $("#content1").html(data[1]);
            $("#content2").html(data[2]);
            $("#content3").html(data[3]);
        }
    });
}
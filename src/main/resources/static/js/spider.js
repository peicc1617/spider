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
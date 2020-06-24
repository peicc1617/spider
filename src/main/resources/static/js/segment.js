//开始分词
function startSegment() {
    $.ajax({
        url:"/segment/start",
        type:"GET",
        async:false,
        success:function (result) {
            alert("分词完成");
        }
    });
}
//重置
function resetSegment(){
    $.ajax({
        url:"/segment/reset",
        type:"GET",
        async:false,
        success:function (result) {
            alert("分词完成");
        }
    });
}
//初始化
jQuery(function($) {
    initSermentPage();
});
function initSermentPage() {
    $.ajax({
        url:"/api/getDataOfSegment",
        type:"GET",
        async:false,
        success:function (result) {
            var data=result.split(":");
            $("#content0").html(data[0]);
            $("#content1").html(data[1]);
        }
    });
}
function viewResultOfSegment() {
    $.ajax({
        url:"/api/getEnterpriseResult",
        type:"GET",
        async:false,
        success:function (result) {
            $('#segmentTable').bootstrapTable('removeAll');
            result.forEach(function (enterprise) {
                var rowData=[];
                rowData.push({
                    companyID:enterprise.companyId,
                    /*description:enterprise.description,
                    result:enterprise.result*/
                })
                $('#segmentTable').bootstrapTable('append', rowData);
            })
        }
    });
}
//在线分词
function cutWordsOnLine() {
    $.ajax({
        url:"/segment/cutWordsOnLine",
        type:"POST",
        async:false,
        data:{
            originStr:$("#originStr").val()
        },
        success:function (result) {
            $('#resultStr').val(result);
        }
    });
}
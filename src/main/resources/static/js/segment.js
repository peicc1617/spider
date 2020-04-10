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
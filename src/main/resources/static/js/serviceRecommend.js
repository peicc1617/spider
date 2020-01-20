function recommend() {
    var searchWord=$("#searchKey").val();
    $.ajax({
        url:"/api/getEnterpriseForRecommend",
        type:"POST",
        async:false,
        data:{
            searchWord:searchWord
        },
        success:function (result) {
            initTable(result)
        }
    });
}
function initTable(result) {
    $('#table').bootstrapTable('removeAll');
    result.forEach(function (enterprise) {
        var rowData=[];
        rowData.push({
            companyName:enterprise.companyName,
            area:enterprise.area,
            description:enterprise.description,
            score:enterprise.score
        })
        $('#table').bootstrapTable('append', rowData);
    })
    $(".tableContainer").prepend("<h3 class=\"header blue lighter smaller\">\n" +
        "\t\t\t\t\t\t\t\t\t\t\t为您找到相关MRO提供商约<span id=\"result\"></span>家\n" +
        "\t\t\t\t\t\t\t\t\t\t</h3>")
    $("#result").html(result.length);
}
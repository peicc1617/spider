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
    $("#mroResult").remove();
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
    $(".tableContainer").prepend("<h3 class=\"header blue lighter smaller\" id=\"mroResult\">\n" +
        "\t\t\t\t\t\t\t\t\t\t\t为您找到相关MRO提供商约<span id=\"result\"></span>家\n" +
        "\t\t\t\t\t\t\t\t\t\t</h3>")
    $("#result").html(result.length);
}
function recommend1() {
    $(".tableContainer").hide();
    //显示模态对话框
    $('#mroRequest').modal('show');
}
function getMROOfOWL() {
    $.ajax({
        url:"/serviceMatch/getMROOfOWL",
        type:"GET",
        async:false,
        data:{
            name:$("#request_name").val(),
            description:$("#request_description").val(),
            num:$("#request_num").val(),
            time:$("#request_time").val(),
            addInfo:$("#request_addInfo").val(),
            cost:$("#request_cost").val(),
            speed:$("#request_speed").val(),
            reliability:$("#request_reliability").val(),
            reputation:$("#request_reputation").val(),
        },
        success:function (result) {
            //将结果按照综合匹配度降序排列
            result.sort(function (a,b) {
                if (a.all>b.all) {
                    return -1;
                } else if (a.all<b.all) {
                    return 1;
                }
                return 0;
            })
            $('#table1').bootstrapTable('removeAll');
            result.forEach(function (enterprise) {
                var rowData=[];
                rowData.push({
                    companyId:enterprise.companyId,
                    companyName:enterprise.companyName,
                    name:enterprise.name,
                    addInfo:enterprise.addInfo,
                    num:enterprise.num,
                    time:enterprise.time,
                    serviceCapability:enterprise.serviceCapability.toFixed(2),
                    qos:enterprise.qos.toFixed(2),
                    all:enterprise.all.toFixed(2),
                })
                $('#table1').bootstrapTable('append', rowData);
            })

        }
    });
    $('#mroRequest').modal("hide");
}

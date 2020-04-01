//MRO运行调度
var taskId;
var requests=[];//MRO服务请求
var suppliers=[];//MRO服务提供商
//加载表格
function refresh() {
    taskId=$("#taskID").val();
    if(taskId==null){
        alert("请输入MRO服务任务ID")
    }else{
        //加载MRO服务需求数据
        $.ajax({
            url:"/schedule/getRequest",
            type:"POST",
            async:false,
            data:{
                taskId:taskId,
            },
            success:function (result) {
                //将数据填充到服务需求表格
                $('#requestTable').bootstrapTable('removeAll')
                $("#machine").val(result.machine);
                $("#desc").val(result.description);
                var requests=JSON.parse(result.requestContent);
                for(var i=0;i<requests.length;i++){
                    var rowData={
                        requestID:requests[i].requestID,
                        requestContent:requests[i].requestContent,
                        requestIdentify:requests[i].requestIdentify
                    }
                    $('#requestTable').bootstrapTable('append',rowData);
                }

            },
            error:function () {
                alert("暂无当前服务任务ID相关数据，请创建后保存")
            }
        });
        //加载MRO服务提供商数据
        $.ajax({
            url:"/schedule/getSupplier",
            type:"POST",
            async:false,
            data:{
                taskId:taskId,
            },
            success:function (result) {
                //将数据填充到服务需求表格
                $('#supplierTable').bootstrapTable('removeAll')
                var suppliers=JSON.parse(result.supplierContent);
                for(var i=0;i<suppliers.length;i++){
                    var rowData={
                        supplierID:suppliers[i].supplierID,
                        companyName:suppliers[i].companyName,
                        serviceCapability:suppliers[i].serviceCapability
                    }
                    $('#supplierTable').bootstrapTable('append',rowData);
                }

            },
            error:function () {
                alert("暂无当前服务任务ID相关数据，请创建后保存")
            }
        });
    }
}

//MRO服务需求
function addRequest() {
    //显示模态对话框
    $('#addRequestItem').modal('show');
}
function addRequestItem() {
    var num=$('#requestTable').bootstrapTable('getData').length;
    var rowData={
        requestID:num+1,
        requestContent:$("#requestContent").val(),
        requestIdentify:$("#requestIdentify").val()
    }
    $('#requestTable').bootstrapTable('append',rowData);
    $('#addRequestItem').modal('hide');
}
function deleteRequest() {
    var ids = $.map($('#requestTable').bootstrapTable('getSelections'), function (row) {
        return row.requestID;
    })
    $('#requestTable').bootstrapTable('remove', {field: 'requestID', values: ids});
}
//根据服务任务ID保存MRO服务需求
function saveRequests() {
    taskId=$("#taskID").val();//任务id
    var machine=$("#machine").val();
    var desc=$("#desc").val();
    var tableData=$('#requestTable').bootstrapTable('getData');
    $.ajax({
        url:"/schedule/addRequest",
        type:"POST",
        async:false,
        data:{
            taskId:taskId,
            machine:machine,
            description:desc,
            requestContent:JSON.stringify(tableData)
        },
        success:function (result) {
            alert(result)
        }
    });
    
}
//MRO服务提供商
function addSupplier() {
    //显示模态对话框
    $('#addSupplierItem').modal('show');
}
function addSupplierItem() {
    var num=$('#supplierTable').bootstrapTable('getData').length;
    var rowData={
        supplierID:num+1,
        companyName:$("#companyName").val(),
        serviceCapability:$("#serviceCapability").val()
    }
    $('#supplierTable').bootstrapTable('append',rowData);
    $('#addSupplierItem').modal('hide');
}
function deleteSupplier() {
    var ids = $.map($('#supplierTable').bootstrapTable('getSelections'), function (row) {
        return row.supplierID;
    })
    $('#supplierTable').bootstrapTable('remove', {field: 'supplierID', values: ids});
}
function saveSuppliers() {
    taskId=$("#taskID").val();
    var tableData=$('#supplierTable').bootstrapTable('getData');
    $.ajax({
        url:"/schedule/addSupplier",
        type:"POST",
        async:false,
        data:{
            taskId:taskId,
            supplierContent:JSON.stringify(tableData)
        },
        success:function (result) {
            alert(result)
        }
    });
}
//参数配置
function scheduleSheet() {
    //获取MRO服务需求数以及子需求数
    var requestTable=$('#requestTable').bootstrapTable('getData');
    requests=[];//MRO需求个数,数组下标对应MRO服务需求，其数值为对应子需求个数
    var index=0;
    for (var i = 0; i <requestTable.length ; i++) {
        var identify=requestTable[i].requestIdentify;
        var tempArray=identify.split("-");
        index=parseInt(tempArray[0]);
        if(typeof requests[index]=="undefined"){
            requests[index]=0;
        }
        requests[index]++;
    }
    $("#paratable").empty();
    //获取MRO服务提供商
    var supplierTable=$('#supplierTable').bootstrapTable('getData');
    suppliers=[];
    for (var i = 0; i <supplierTable.length ; i++) {
        var companyName=supplierTable[i].companyName;
        suppliers.push(companyName);
    }
    //第一行：MRO服务提供商信息
    var raw_m = "<tr style=\"background-color:#FCF8E3;font-size:20px;font-weight:bold\"><td> </td>";
    for(var i=0;i<suppliers.length;i++){
        raw_m = raw_m + "<td>";
        raw_m = raw_m + suppliers[i];
        raw_m = raw_m + "</td>";
    }
    raw_m = raw_m + "</tr>";
    $("#paratable").append(raw_m);
    //MRO服务需求信息
    for(var i=1;i<requests.length;i++){
        //工件种类信息
        var raw_type = "<tr style=\"background-color:#DFF0D8\">";
        raw_type = raw_type + "<td style=\"color:red;text-align:left\">";
        raw_type = raw_type + "MRO服务需求" + (i).toString();
        raw_type = raw_type + "</td>";
        for(var j=0;j<suppliers.length;j++){
            raw_type = raw_type + "<td>";
            raw_type = raw_type + "</td>";
        }
        raw_type = raw_type + "</tr>";
        $("#paratable").append(raw_type);

        //MRO服务子需求
        var num_input = "<input type=\"text\" style=\"width:100%\" value=0,0>";

        for(var j=0;j<requests[i];j++){

            var procedure_num = "<tr><td>";
            procedure_num = procedure_num + "子需求" + (j+1).toString();
            procedure_num = procedure_num + "</td>";
            for(var k=0;k<suppliers.length;k++){
                procedure_num = procedure_num + "<td>";
                procedure_num = procedure_num + num_input;
                procedure_num = procedure_num + "</td>";
            }
            raw_type = procedure_num + "</tr>";
            $("#paratable").append(procedure_num);

        }
    }

}
//提交排程表
function saveSheet() {
    taskId=$("#taskID").val();//获取服务任务id
    var sheetData=[];
    var size = $("#paratable input").size();
    for (var i=0;i<size;i++) {
        var tablevalue = $("#paratable input")[i].value;
        sheetData.push(tablevalue);
    }
    $.ajax({
        url:"/schedule/addSheet",
        type:"POST",
        async:false,
        data:{
            taskId:taskId,
            data:JSON.stringify(sheetData)
        },
        success:function (result) {
            alert("添加成功")
        }
    });

}
//加载排程表
function loadSheet() {
    scheduleSheet();
    $.ajax({
        url:"/schedule/getSheet",
        type:"GET",
        async:false,
        data:{
            taskId:taskId,
        },
        success:function (result) {
            var sheetData=JSON.parse(result.data);
            for (var i=0;i<sheetData.length;i++) {
                $("#paratable input")[i].value=sheetData[i];
            }
        }
    });
}
//运行调度
function run() {
    var sheetData=[];
    var size = $("#paratable input").size();
    for (var i=0;i<size;i++) {
        var tablevalue = $("#paratable input")[i].value;
        sheetData.push(tablevalue);
    }
    var time=[];
    var cost=[];
    var index=0;
    for (var i=1;i<requests.length;i++) {
        var time1=[];
        var cost1=[];
        for (var j=0;j<requests[i];j++) {
            for (var k = 0; k < suppliers.length; k++) {
                var time2={supplier:"",time:0};
                var cost2={supplier:"",cost:0};
                var temp = sheetData[index++].split(",");
                if (temp[0] != 0) {
                    time2.supplier = k;
                    time2.time = temp[0];
                    cost2.supplier = k;
                    cost2.cost = temp[1];
                    time1.push(time2);
                    cost1.push(cost2);
                }
            }
        }
        time.push(time1);
        cost.push(cost1);
    }
    var requestNum=requests.length-1;//MRO服务需求数
    var supplierNum=suppliers.length;
    $.ajax({
        url:"/schedule/run",
        type:"POST",
        async:false,
        data:{
            time:JSON.stringify(time),
            cost:JSON.stringify(cost),
            requestNum:requestNum,
            supplierNum:supplierNum,
            populationNumber:$("#scale").val(),
            crossProbability:$("#cp").val(),
            mutationProbabilit:$("#vp").val(),
},
        success:function (result) {
            alert("添加成功")
        }
    });
}
function drawGantt() {
    Highcharts.chart('container', {
        chart: {
            type: 'xrange'
        },
        title: {
            text: 'MRO运行调度甘特图'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                week: '%Y/%m/%d'
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: ['制作产品原型', '开发', '测试'],
            reversed: true
        },
        tooltip: {
            dateTimeLabelFormats: {
                day: '%Y/%m/%d'
            }
        },
        series: [{
            name: '项目1',
            // pointPadding: 0,
            // groupPadding: 0,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{
                x: Date.UTC(2014, 10, 21),
                x2: Date.UTC(2014, 11, 2),
                y: 0,
                partialFill: 0.25
            }, {
                x: Date.UTC(2014, 11, 2),
                x2: Date.UTC(2014, 11, 5),
                y: 1
            }, {
                x: Date.UTC(2014, 11, 8),
                x2: Date.UTC(2014, 11, 9),
                y: 2
            }, {
                x: Date.UTC(2014, 11, 9),
                x2: Date.UTC(2014, 11, 19),
                y: 1
            }, {
                x: Date.UTC(2014, 11, 10),
                x2: Date.UTC(2014, 11, 23),
                y: 2
            }],
            dataLabels: {
                enabled: true
            }
        }]
    });

}
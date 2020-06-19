//MRO运行调度
var taskId;
var requests=[];//MRO服务请求
var suppliers=[];//MRO服务提供商
var maxTime=0;//最大完工时间
var serviceCost=0;//服务成本
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
                userName:$("#userName").html()
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
                userName:$("#userName").html()
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
//根据服务任务ID和用户名保存MRO服务需求
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
            requestContent:JSON.stringify(tableData),
            userName:$("#userName").html()
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
            supplierContent:JSON.stringify(tableData),
            userName:$("#userName").html()
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
            data:JSON.stringify(sheetData),
            userName:$("#userName").html()
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
            userName:$("#userName").html()
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
    serviceCost=0;
    maxTime=0;
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
                    serviceCost=serviceCost+parseInt(temp[1]);
                }
            }
        }
        time.push(time1);
        cost.push(cost1);
    }
    var requestNum=requests.length-1;//MRO服务需求数
    var supplierNum=suppliers.length;
    $.ajax({
        url:"/schedule/go",
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
            alert("调度完成，请点击“运行调度结果”查看调度结果");
            drawGantt(result);
        }
    });
}


function drawGantt(scheduleResult) {
    var resultData=scheduleResult;
    var categories=[];//Y轴，保存MRO服务提供商，需去重
    var pointData=[];//每个子任务
    var set=new Set();
    var color=[];
    for (var i = 0; i <resultData.length ; i++) {
        set.add(resultData[i].supplier);
    }
    for (var i = 0; i <set.size ; i++) {
        color.push(generateColor());
    }
    function generateColor(){
        return '#'+Math.floor(Math.random()*0xffffff).toString(16);
    }
    $("#resultTable").bootstrapTable('removeAll');
    for (var i = 0; i <resultData.length ; i++) {
        var rowData={
            request:resultData[i].request,
           subRequest:resultData[i].subRequest,
           supplier:resultData[i].supplier,
           startTime:resultData[i].startTime,
            endTime:resultData[i].endTime,
        }
        $("#resultTable").bootstrapTable('append',rowData);
        if(maxTime<resultData[i].endTime){
            maxTime=resultData[i].endTime;
        }
        //甘特图数据
        var point={
            name:resultData[i].request,
            x:resultData[i].startTime,
            x2:resultData[i].endTime,
            y:parseInt(resultData[i].supplier.substr(resultData[i].supplier.indexOf("商")+1))-1,
            color:color[parseInt(resultData[i].request.substr(resultData[i].request.indexOf("求")))-1],

        }
        pointData.push(point);
    }
    for (var i = 0; i <set.size ; i++) {
        categories.push("MRO服务提供商"+(i+1));
    }

    Highcharts.chart('container', {
        chart: {
            type: 'xrange'
        },
        title: {
            text: 'MRO运行调度甘特图'
        },
        xAxis: {
            type: '',
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: categories,
            reversed: true
        },

        series: [{
            name: 'MRO服务任务'+taskId,
            borderColor: 'gray',
            pointWidth: 20,
            data:pointData,
        }]
    });
    //输出时间、成本
    $("#serviceCost").html(serviceCost);
    $("#maxTime").html(maxTime);

}
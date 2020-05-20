var flag=[0,0,0,0];
//服务监控
function loadMonitor() {
    reSetProgress();
    flag=[0,0,0,0];
    checkTaskId();
    monitorCPS();
    monitorRequest();
    monitorSupplier();
    monitorSchedule();
    monitorEvaluate();
    setProgress();
}
//检查是否指定服务任务id
function checkTaskId() {
    var taskId=$("#taskId").val();
    if(taskId==""){
        alert("请确定服务任务ID");
        return;
    }
}
//CPS节点监控
function monitorCPS() {
    $.ajax({
        url:"/oee/getIndexsByTaskId",
        type:"GET",
        async:false,
        data:{
            taskId:$("#taskId").val(),
        },
        success:function(result)
        {
            if (result=="") {
                alert("未获取到相关数据");
                window.location.reload();
            }else{
                var indexs=JSON.parse(result);
                drawTimeCharts(indexs);
                drawRateCharts(indexs);
            }
        }
    })
}
//绘制时间分类
function drawTimeCharts(indexs) {
    var xAxisName;//x轴名称
    var xData=[];//x轴数据
    var yData1=[];//日历时间
    var yData2=[];//计划停机时间
    var yData3=[];//负荷时间
    var yData4=[];//停机损失时间
    var yData5=[];//实际开动时间
    var yData6=[];//性能损失时间
    var yData7=[];//净开动时间
    if (indexs[0].machineName==indexs[1].machineName) { //说明设备相同，则为同一设备不同时间的OEE
        xAxisName="时间";
        for(var i=0;i<indexs.length;i++)
        {
            xData.push(indexs[i].date);
            yData1.push((indexs[i].calendarTime).toFixed(0));//日历时间
            yData2.push((indexs[i].planneddownTime).toFixed(0));
            yData3.push((indexs[i].loadTime).toFixed(0));
            yData4.push((indexs[i].downTime).toFixed(0));
            yData5.push((indexs[i].operationTime).toFixed(0));
            yData6.push((indexs[i].performanceLossTime).toFixed(0));
            yData7.push((indexs[i].netOperationTime).toFixed(0));
        }
    } else {//不同设备同一时间
        xAxisName="工业产品类型";
        for(var i=0;i<indexs.length;i++) {
            xData.push(indexs[i].machineName);
            yData1.push((indexs[i].calendarTime).toFixed(0));//日历时间
            yData2.push((indexs[i].planneddownTime).toFixed(0));
            yData3.push((indexs[i].loadTime).toFixed(0));
            yData4.push((indexs[i].downTime).toFixed(0));
            yData5.push((indexs[i].operationTime).toFixed(0));
            yData6.push((indexs[i].performanceLossTime).toFixed(0));
            yData7.push((indexs[i].netOperationTime).toFixed(0));
        }
    }
    //画图
    var dom = document.getElementById("timeCharts");
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    app.title = '坐标轴刻度与标签对齐';
    option = {
        title: {
            text: '时间监测'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['日历时间', '计划停机时间', '负荷时间', '停机损失时间', '实际开动时间', '性能损失时间', '净开动时间']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:xData,
            name:xAxisName
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '日历时间',
                type: 'bar',
                data:yData1
            },
            {
                name: '计划停机时间',
                type: 'bar',
                data:yData2
            },
            {
                name: '负荷时间',
                type: 'bar',
                data:yData3
            },
            {
                name: '停机损失时间',
                type: 'bar',
                data:yData4
            },
            {
                name: '实际开动时间',
                type: 'bar',
                data:yData5
            }
            ,
            {
                name: '性能损失时间',
                type: 'bar',
                data:yData6
            },
            {
                name: '净开动时间',
                type: 'bar',
                data:yData7
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }


}
//绘制时间利用率等
function drawRateCharts(indexs) {
    var xAxisName;//x轴名称
    var xData=[];//x轴数据
    var yData1=[];//设备利用率
    var yData2=[];//设备利用率
    var yData3=[];//设备利用率
    var yData4=[];//设备利用率
    var yData5=[];//设备利用率
    var yData6=[];//设备利用率
    if (indexs[0].machineName==indexs[1].machineName) { //说明设备相同，则为同一设备不同时间的OEE
        xAxisName="时间";
        for(var i=0;i<indexs.length;i++)
        {
            xData.push(indexs[i].date);
            yData1.push((indexs[i].utilizeRate*100).toFixed(0));//设备利用率
            yData2.push((indexs[i].TimeRate*100).toFixed(0));
            yData3.push((indexs[i].performanceRate*100).toFixed(0));
            yData4.push((indexs[i].qualityRate*100).toFixed(0));
            yData5.push((indexs[i].OEE*100).toFixed(0));
            yData6.push((indexs[i].TEEP*100).toFixed(0));
        }
    } else {//不同设备同一时间
        xAxisName="工业产品类型";
        for(var i=0;i<indexs.length;i++) {
            xData.push(indexs[i].machineName);
            yData1.push((indexs[i].utilizeRate*100).toFixed(0));//设备利用率
            yData2.push((indexs[i].TimeRate*100).toFixed(0));
            yData3.push((indexs[i].performanceRate*100).toFixed(0));
            yData4.push((indexs[i].qualityRate*100).toFixed(0));
            yData5.push((indexs[i].OEE*100).toFixed(0));
            yData6.push((indexs[i].TEEP*100).toFixed(0));
        }
    }
    //画图
    var dom = document.getElementById("rateCharts");
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    app.title = '坐标轴刻度与标签对齐';
    option = {
        title: {
            text: '指标监测'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['设备利用率', '时间开动率', '性能开动率', '质量合格率', 'OEE', 'TEEP']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:xData,
            name:xAxisName
        },
        yAxis: {
            type: 'value',
            min:0,
            max:100,
            axisLabel: {
                formatter: '{value} %'
            }
        },
        series: [
            {
                name: '设备利用率',
                type: 'line',
                barWidth: '60%',
                data:yData1
            },
            {
                name: '时间开动率',
                type: 'line',
                barWidth: '60%',
                data:yData2
            },
            {
                name: '性能开动率',
                type: 'line',
                barWidth: '60%',
                data:yData3
            },
            {
                name: '质量合格率',
                type: 'line',
                barWidth: '60%',
                data:yData4
            },
            {
                name: 'OEE',
                type: 'line',
                barWidth: '60%',
                data:yData5
            }
            ,
            {
                name: 'TEEP',
                type: 'line',
                barWidth: '60%',
                data:yData6
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
//服务进度监控
//MRO服务需求监控
function monitorRequest() {
    $.ajax({
        url:"/schedule/getRequest",
        type:"POST",
        async:false,
        data:{
            taskId:$("#taskId").val(),
        },
        success:function (result) {
            if (result!="") {
                flag[0]=1;
                //将数据填充到服务需求表格
                var requests=JSON.parse(result.requestContent);
                var num= requests.length;
                var subRequests= num;
                var wholeRequests = requests[num-1].requestIdentify.split("-")[0];
                $("#wholeRequests").html(wholeRequests);
                $("#subRequests").html(subRequests);
            }
        },
        error:function () {
            alert("暂无当前服务任务ID相关数据，请创建后保存")
        }
    });
}
//MRO服务提供商监控
function monitorSupplier() {
    $.ajax({
        url:"/schedule/getSupplier",
        type:"POST",
        async:false,
        data:{
            taskId:$("#taskId").val()
        },
        success:function (result) {
            if (result!="") {
                flag[1]=1;
                var suppliers=JSON.parse(result.supplierContent);
                $("#suppliers").html(suppliers.length);
            }

        },
        error:function () {
            alert("暂无当前服务任务ID相关数据，请创建后保存")
        }
    });
}
//MRO运行调度监控
function monitorSchedule() {
    $.ajax({
        url:"/schedule/getSheet",
        type:"GET",
        async:false,
        data:{
            taskId:$("#taskId").val(),
        },
        success:function (result) {
            if (result!="") {
                var sheetData=JSON.parse(result.data);
                if (sheetData.length>0) {
                    flag[2]=1;
                }
            }
        }
    });
}
//MRO服务评价监控
function monitorEvaluate() {
    $.ajax({
        url:"/evaluate/getIndexsByTaskId",
        type:"POST",
        async:false,
        data:{
            taskId:$("#taskId").val()
        },
        success:function (result) {
            if (result!="") {
                flag[3]=1;
            }
        }
    });
}
function setProgress() {
    for (var i = 0; i <4 ; i++) {
        if (flag[i]==1) {
            $("#step"+(i+1)).addClass("active")
        }
    }
}
function reSetProgress() {
    for (var i = 0; i <4 ; i++) {
        $("#step"+(i+1)).removeClass("active")
    }
}
var imageForEmail;
function saveCanvas() {
    html2canvas(document.body).then(function(canvas) {
        var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        $("#download").attr("href",imgUri);
        imageForEmail=imgUri;
        console.log(imgUri);
        document.getElementById("download").click();
    });
}
jQuery(function($) {
    //未查询时隐藏表格
    $("#download").hide();
});
function LoadSelectionsOfMROOfOWL() {
    $("#taskId").empty();
    $.ajax({
        url:"api/getTaskListByUserName",
        type:"get",
        async:false,
        data:{
            tableName:$("#tableNameForTaskList").html(),
            userName:$("#userName").html()
        },
        success:function(result){
            result.forEach(function (project) {
                var option="<option value="+project.taskId+">"+project.taskId+"-"+project.description+"</option>"
                $("#taskId").append(option);
            })
        }
    })
}
jQuery(function($) {
    $("#email").hide();
    LoadSelectionsOfMROOfOWL()
});
//发送邮件
function sendEmail() {
    $("#email").show();
    $("#email").empty();
    $.ajax({
        url:"api/getAllUsers",
        type:"get",
        async:false,
        success:function(result){
            var option="<option>"+"请选择收件人"+"</option>"
            $("#email").append(option);
            result.forEach(function (user) {
                var option="<option value="+user.email+">"+user.userName+"-"+user.domainName+"</option>"
                $("#email").append(option);
            })
        }
    })
}
function sendEmail1() {
    $.ajax({
        url:"api/sendEmail",
        type:"get",
        async:false,
        data:{
            email:$("#email").val(),
        },
        success:function(result){
            alert(result)
        }
    })
    $("#email").hide();
}
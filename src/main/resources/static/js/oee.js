//计算OEE
function calculateOEE_back() {
    // var dataFromTable = $('#myBootstrapTable').bootstrapTable('getData');//获取表格数据
    var dataFromTable=getAllTabledata();//获取表格数据
    var productName=dataFromTable.product_name;//产品名称
    var theoreticalCycle=dataFromTable.theoretical_cycle;//理论加工时间
    var actualCycle=dataFromTable.actual_cycle;//实际加工时间
    var dataFromTable=dataFromTable.datas;//表格数据
    var dataFromTable=JSON.stringify(dataFromTable);
    $.ajax({
        type:'post',
        url:'oeeCalculate',
        data:{productName:productName,theoreticalCycle:theoreticalCycle,actualCycle:actualCycle,dataFromTable:dataFromTable},
        success:function(data){
            // alert("后台处理完毕！"+decodeURIComponent(data));
            data=JSON.parse(data);
            showOEEIndicator(data);

        },
        error:function (data) {
            alert("后台数据返回失败了！");
        }
    })
}
//tableEdit.js
//dataProcess.js
//result.js
//显示损失
function showLoss(datalist)
{
    $('#oeeDataTable2').bootstrapTable('removeAll');
    var actual_cycle=$('#actual_cycle1').val();//实际加工周期
    actual_cycle=parseFloat(actual_cycle);
    for (var i = 0; i < datalist.length; i++) {
        var valueWorkTime1=(parseFloat(datalist[i].totalQuantity)-parseFloat(datalist[i].defectQuantity))*actual_cycle
        var rowdata = {
            machineName: datalist[i].machineName,
            calendarTime:datalist[i].calendarTime,
            plannedDowntimeLoss:datalist[i].plannedDowntimeLoss,
            actualWorkTime:datalist[i].actualWorkTime,
            downtimeLoss:datalist[i].downtimeLoss,
            netWorkTime:datalist[i].netWorkTime,
            //质量损失暂时不用，改用合格品率计算
            // qualityLoss:parseFloat(datalist[i].netWorkTime)-valueWorkTime1,
            // valueWorkTime:valueWorkTime1
            defectQuantity:datalist[i].defectQuantity,
            totalQuantity:datalist[i].totalQuantity
        }
        $('#oeeDataTable2').bootstrapTable('append', rowdata);
    }
}
//显示OEE指标
function showOEEIndicator(datalist) {
    $('#oeeDataTable1').bootstrapTable('removeAll');
    for (var i = 0; i < datalist.length; i++) {
        var rowdata = {
            machineName: datalist[i].machineName,
            equipmentUtilizationRate: datalist[i].equipmentUtilizationRate.toFixed(2) * 100 + "%",
            timeUtilizationRate: datalist[i].timeUtilizationRate.toFixed(2) * 100 + "%",
            performanceUtilizationRate: datalist[i].performanceUtilizationRate.toFixed(2) * 100 + "%",
            qualityRate: datalist[i].qualityRate.toFixed(2) * 100 + "%",
            OEE: datalist[i].OEE.toFixed(2) * 100 + "%",
            TEEP: datalist[i].TEEP.toFixed(2) * 100 + "%"

        }
        $('#oeeDataTable1').bootstrapTable('append', rowdata);
    }
    showLoss(datalist);
    showEcharts(datalist);//显示图形
}
//显示图形
function showEcharts(datalist)
{
    var xData=[];//x轴数据
    var yequipmentUtilizationRateData=[];//y轴数据设备利用率
    var ytimeUtilizationRateData=[];//y轴数据时间开动率
    var yperformanceUtilizationRateData=[];//y轴数据性能开动率
    var yqualityRateData=[];//y轴数据合格品率
    var yOEEData=[];//y轴数据OEE
    var yTEEPData=[];//y轴数据TEEP
    for(var i=0;i<datalist.length;i++)
    {
        xData.push(datalist[i].machineName);
        yequipmentUtilizationRateData.push(datalist[i].equipmentUtilizationRate.toFixed(2)*100);
        ytimeUtilizationRateData.push(datalist[i].timeUtilizationRate.toFixed(2)*100);
        yperformanceUtilizationRateData.push(datalist[i].performanceUtilizationRate.toFixed(2)*100);
        yqualityRateData.push(datalist[i].qualityRate.toFixed(2)*100);
        yOEEData.push(datalist[i].OEE.toFixed(2)*100);
        yTEEPData.push(datalist[i].TEEP.toFixed(2)*100);
    }
    var myChart = echarts.init(document.getElementById('OEECharts'));
    myChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['设备利用率','时间开动率','性能开动率','合格品率','OEE','TEEP']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data:xData,
                boundaryGap: true,
                axisLine : {    // 轴线
                    show: true,
                    lineStyle: {
                        color: 'green',
                        type: 'solid',
                        width: 2
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitArea : {show : true},
                axisLabel : {
                    show:true,
                    interval: 'auto',    // {number}
                    rotate: -45,
                    margin: 18,
                    formatter: '{value} %',    // Template formatter!
                    textStyle: {
                        color: '#1e90ff',
                        fontFamily: 'verdana',
                        fontSize: 10,
                        fontStyle: 'normal',
                        fontWeight: 'bold'
                    }
                },
                splitLine : {
                    show:true,
                    lineStyle: {
                        color: '#483d8b',
                        type: 'dotted',
                        width: 2
                    }
                },
                splitArea : {
                    show: true,
                    areaStyle:{
                        color:['rgba(205,92,92,0.3)','rgba(255,215,0,0.3)']
                    }
                },
            },


        ],
        series : [
            {
                name:'设备利用率',
                type:'bar',
                data:yequipmentUtilizationRateData
            },
            {
                name:'时间开动率',
                type:'bar',
                data:ytimeUtilizationRateData
            },
            {
                name:'性能开动率',
                type:'bar',
                data:yperformanceUtilizationRateData
            },
            {
                name:'合格品率',
                type:'bar',
                data:yqualityRateData
            },
            {
                name:'OEE',
                type:'line',
                data:yOEEData,
                lineStyle:{
                    normal:{
                        color:"#92ff61",
                        width:3,
                    }
                }
            },
            {
                name:'TEEP',
                type:'line',
                data:yTEEPData,
                lineStyle:{
                    normal:{
                        color:"#fe2aff",
                        width:3,
                    }
                }
            }
        ]
    });
}
// buttonAction.js
//添加一条记录时弹出模态对话框
function addrow()
{
    //alert("添加设备信息");
    $('#addItem').modal('show');
}
//添加一条记录
function addItem()
{
    var datanum=$('#oeeDataTable').bootstrapTable('getData').length;
    var rowdata={
        procedureIdForDelete:datanum+1,
        calendar_date:$('#calendar_date').val(),//日期
        machine_name:$('#machine_name').val(),//设备名称
        calendar_time:$('#calendar_time').val(),//日历时间
        rest_time:$('#rest_time').val(),//休息时间
        downtime_maintenance:$('#downtime_maintenance').val(),//停机保养
        downtime_noEquipment:$('#downtime_noEquipment').val(),//非设备因素停机
        downtime_loss:$('#downtime_loss').val(),//故障停机
        start_shutdown:$('#start_shutdown').val(),//开停机
        product_change:$('#product_change').val(),//更换品种
        tool_change:$('#tool_change').val(),//更换工具
        idling:$('#idling').val(),//空转
        small_downtime:$('#small_downtime').val(),//间歇停机
        theoretical_speed:$('#theoretical_speed').val(),//理论加工速度
        actual_speed:$('#actual_speed').val(),//实际加工速度
        defect_quantity:$('#defect_quantity').val(),//不合格品数量
        total_quantity:$('#total_quantity').val(),//产品总数量
    }
    $('#oeeDataTable').bootstrapTable('append', rowdata);
}
// 加载项目
function loadData() {
    var taskId = $("#taskId").val();
    if (taskId == undefined) {
        alert("请指定服务任务ID，再加载数据！");
    } else {
        //加载数据
        $.ajax({
            url: "/oee/getOEEDataByTaskId",
            type: "GET",
            data: {
                taskId: taskId,
            },
            success: function (result) {
                $('#oeeDataTable').bootstrapTable('removeAll');
                if (result=="") {
                    alert("未查询到相关数据");
                } else{
                    $("#description").val(result.description);
                    //加载表格
                    loadTable(JSON.parse(result.data));
                }

            }
        })
    }
}
function loadTable(tableData) {
    for (var i = 0; i < tableData.length; i++) {
        var rowdata = {
            procedureIdForDelete:i+1,
            calendar_date: tableData[i].calendar_date,//日期
            machine_name: tableData[i].machine_name,//设备名称
            calendar_time: tableData[i].calendar_time,//日历时间
            rest_time: tableData[i].rest_time,//休息时间
            downtime_maintenance: tableData[i].downtime_maintenance,//停机保养
            downtime_noEquipment: tableData[i].downtime_noEquipment,//非设备因素停机
            downtime_loss: tableData[i].downtime_loss,//故障停机
            start_shutdown: tableData[i].start_shutdown,//开停机
            product_change: tableData[i].product_change,//更换品种
            tool_change: tableData[i].tool_change,//设备调整
            idling: tableData[i].idling,//空转
            small_downtime: tableData[i].small_downtime,//间歇停机
            theoretical_speed:tableData[i].theoretical_speed,
            actual_speed:tableData[i].actual_speed,
            defect_quantity: tableData[i].defect_quantity,//不合格品数量
            total_quantity: tableData[i].total_quantity,//产品总数量
        }
        $('#oeeDataTable').bootstrapTable('append', rowdata);
    }
}

//保存项目
function saveProject()
{
    var taskId=$("#taskId").val();
    if(taskId==undefined)
    {
        alert("请指定服务任务ID，再保存数据！");
    }
    else
    {
        var tableData=$('#oeeDataTable').bootstrapTable('getData');
        $.ajax({
            url:"/oee/saveOEEDataByTaskId",
            type:"put",
            data:{
                taskId:taskId,
                description:$('#description').val(),//描述
                data:JSON.stringify(tableData),
                userName:$("#userName").html()
            },
            success:function(result)
            {
                alert("保存成功")

            }
        })
    }
}
//编辑_字段
function actionFormatter(value, row, index) {
    return [
        '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
        '<i class="glyphicon glyphicon-edit"></i> 编辑',
        '</a>'
    ].join('');
}
var updateindex=1;
window.actionEvents = {
    'click .edit': function (e, value, row, index) {
        $('#editItem').modal('show');
        $('#calendar_date1').val(row.calendar_date);//日期
        $('#machine_name1').val(row.machine_name);//设备名称
        $('#calendar_time1').val(row.calendar_time);//日历时间
        $('#rest_time1').val(row.rest_time);//休息时间
        $('#downtime_maintenance1').val(row.downtime_maintenance);//停机保养
        $('#downtime_noEquipment1').val(row.downtime_noEquipment);//非设备因素停机
        $('#downtime_loss1').val(row.downtime_loss);//故障停机
        $('#start_shutdown1').val(row.start_shutdown);//开停机
        $('#product_change1').val(row.product_change);//更换产品
        $('#tool_change1').val(row.tool_change),//更换工具
        $('#idling1').val(row.small_downtime);//空转
        $('#small_downtime1').val(row.small_downtime);//间歇停机
        $('#theoretical_speed1').val(row.theoretical_speed);
        $('#actual_speed1').val(row.actual_speed);
        $('#defect_quantity1').val(row.defect_quantity);//不合格品数量
        $('#total_quantity1').val(row.total_quantity);//产品总数量
        updateindex = index;
    }
};
//编辑一条记录
function editItem()
{
    // 隐藏模态对话框
    $('#editItem').modal('hide');
    var rowdata={
        calendar_date:$('#calendar_date1').val(),//日期
        machine_name:$('#machine_name1').val(),//设备名称
        calendar_time:$('#calendar_time1').val(),//日历时间
        rest_time:$('#rest_time1').val(),//休息时间
        downtime_maintenance:$('#downtime_maintenance1').val(),//停机保养
        downtime_noEquipment:$('#downtime_noEquipment1').val(),//非设备因素停机
        downtime_loss:$('#downtime_loss1').val(),//故障停机
        start_shutdown:$('#start_shutdown1').val(),//开停机
        product_change:$('#product_change1').val(),//更换品种
        tool_change:$('#tool_change1').val(),//设备调整
        idling:$('#idling1').val(),//空转、间歇停机
        small_downtime:$('#small_downtime1').val(),//空转、间歇停机
        theoretical_speed:$('#theoretical_speed1').val(),
        actual_speed:$('#actual_speed1').val(),
        defect_quantity:$('#defect_quantity1').val(),//不合格品数量
        total_quantity:$('#total_quantity1').val(),//产品总数量
    }
    $('#oeeDataTable').bootstrapTable('updateRow', {index: updateindex, row: rowdata});
}
//删除一条记录
function deleterow()
{
    var ids = $.map($('#oeeDataTable').bootstrapTable('getSelections'), function (row) {
        return row.procedureIdForDelete;
    })
    $('#oeeDataTable').bootstrapTable('remove', {field: 'procedureIdForDelete', values: ids});
}
//检查是否指定服务任务id
function checkTaskId() {
    var taskId=$("#taskId").val();
    if(taskId==""){
        alert("请确定服务任务ID");
        return;
    }
}
//OEE指标
var indexsSet=[];
function calculateOEE()
{
    checkTaskId();
    var indexs=[];//存储指标
    var dataFromTable=$('#oeeDataTable').bootstrapTable('getData');//获取表格数据
    for (var i = 0; i <dataFromTable.length ; i++) {
        dataForTab=new Object();
        dataForTab.date=dataFromTable[i].calendar_date;//设备名称
        dataForTab.machineName=dataFromTable[i].machine_name;//设备名称
        dataForTab.calendarTime=parseFloat(dataFromTable[i].calendar_time);//日历时间
        dataForTab.planneddownTime=parseFloat(dataFromTable[i].rest_time)+parseFloat(dataFromTable[i].downtime_maintenance)+parseFloat(dataFromTable[i].downtime_noEquipment);//计划停机时间=休息时间+停机保养+费设备因素停机
        dataForTab.loadTime=dataForTab.calendarTime-dataForTab.planneddownTime;//负荷时间=日历时间-计划停机时间
        dataForTab.downTime=parseFloat(dataFromTable[i].downtime_loss)+parseFloat(dataFromTable[i].start_shutdown)+parseFloat(dataFromTable[i].product_change)+parseFloat(dataFromTable[i].tool_change);//停机损失时间=故障停机+开关机+更换品种+更换工具
        dataForTab.operationTime=dataForTab.loadTime-dataForTab.downTime;//实际开动时间=负荷时间-停机损失时间
        dataForTab.performanceLossTime=dataForTab.operationTime-parseFloat(dataFromTable[i].total_quantity)/parseFloat(dataFromTable[i].theoretical_speed);//性能损失时间=实际开动时间-产品总数/理论加工速度
        dataForTab.netOperationTime=dataForTab.operationTime-dataForTab.performanceLossTime;//净开动时间=实际开动时间-性能损失时间
        dataForTab.qualityRate=(1-parseFloat(dataFromTable[i].defect_quantity)/parseFloat(dataFromTable[i].total_quantity)).toFixed(2);//合格品率
        dataForTab.utilizeRate=(dataForTab.loadTime/dataForTab.calendarTime).toFixed(2);//设备利用率=负荷时间/日历时间
        dataForTab.TimeRate=(dataForTab.operationTime/dataForTab.loadTime).toFixed(2);//时间开动率=负荷时间/日历时间
        dataForTab.performanceRate=(dataForTab.netOperationTime/dataForTab.operationTime).toFixed(2);//性能开动率=净操作时间/负荷时间
        dataForTab.OEE=(dataForTab.qualityRate*dataForTab.TimeRate*dataForTab.performanceRate).toFixed(2);//OEE=时间开动率*性能开动率*合格品率
        dataForTab.TEEP=(dataForTab.utilizeRate*dataForTab.OEE).toFixed(2);
        indexs.push(dataForTab);
    }
    indexsSet=indexs;
    //显示OEE图表
    showOEE(indexs);
}
//显示图表
function showOEE(indexs)
{
    //显示设备综合效率表格数据
    $('#oeeIndexs').bootstrapTable('removeAll');
    for(var i=0;i<indexs.length;i++) {
        var rowdata = {
            calendar_date:indexs[i].date,
            machine_name:indexs[i].machineName,
            utilizeRate:(indexs[i].utilizeRate* 100).toFixed(0) + "%",
            timeRate: (indexs[i].TimeRate* 100).toFixed(0) + "%",
            performanceRate: (indexs[i].performanceRate* 100).toFixed(0) + "%",
            qualityRate: (indexs[i].qualityRate* 100).toFixed(0) + "%",
            OEE: (indexs[i].OEE * 100 ).toFixed(0)+ "%",
            TEEP:(indexs[i].TEEP * 100).toFixed(0) + "%",
        }
        $('#oeeIndexs').bootstrapTable('append', rowdata);
    }
}
//OEE预测
function predictOEE1(oeeData) {
    var predictOEE=[];
    $.ajax({
        url:"/oee/predictOEE",
        type:"GET",
        async:false,
        data:{
            data:JSON.stringify(oeeData),
            aerf:$("#aerf").val(),
            beta:$("#beta").val()
        },
        success:function(result)
        {
            predictOEE=result;

        }
    })
    return predictOEE;
}
function predictOEE() {
    //绘制图表
    var xData=[];//x轴数据
    var yData=[];//y轴数据
    var xAxisName;//x轴名称
    if (indexsSet[0].machineName==indexsSet[1].machineName) { //说明设备相同，则为同一设备不同时间的OEE
        xAxisName="时间";
        for(var i=0;i<indexsSet.length;i++)
        {
            xData.push(indexsSet[i].date);
            yData.push((indexsSet[i].OEE*100).toFixed(0));
        }
        xData.push("下一时刻预测值")
    } else {//不同设备同一时间
        xAxisName="工业产品类型";
        for(var i=0;i<indexsSet.length;i++) {
            xData.push(indexsSet[i].machineName);
            yData.push((indexsSet[i].OEE * 100).toFixed(0));
        }
    }
    //获取OEE预测值
    var predictOEEValue=predictOEE1(yData);
    yData.push(predictOEEValue[predictOEEValue.length-1].toFixed(0));//添加预测值
    var dom = document.getElementById("OEECharts");
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    app.title = '坐标轴刻度与标签对齐';
    option = {
        title: {
            text: 'OEE'
        },
        tooltip: {
            trigger: 'axis'
        },
        /*legend: {
            data: ['实际值', '预测值']
        },*/
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
                name: '实际值',
                type: 'line',
                barWidth: '60%',
                data:yData
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
function saveResult() {
    checkTaskId();
    $.ajax({
        url:"/oee/saveIndexsByTaskId",
        type:"PUT",
        async:false,
        data:{
            taskId:$("#taskId").val(),
            indexs:JSON.stringify(indexsSet)
        },
        success:function(result)
        {
            alert("保存成功")
        }
    })
}
//绘制时间分类
function drawLossCharts() {
    var indexs=$('#oeeDataTable').bootstrapTable('getData');
    var xAxisName;//x轴名称
    var xData=[];//x轴数据
    var yData1=[];//休息时间
    var yData2=[];//停机保养时间
    var yData3=[];//非设备因素停机时间
    var yData4=[];//故障停机时间
    var yData5=[];//开关机时间
    var yData6=[];//更换产品
    var yData7=[];//更换工具
    var yData8=[];//空转
    var yData9=[];//间歇停机
    if (indexs[0].machine_name==indexs[1].machine_name) { //说明设备相同，则为同一设备不同时间的OEE
        xAxisName="时间";
        for(var i=0;i<indexs.length;i++)
        {
            xData.push(indexs[i].calendar_date);
            yData1.push(parseFloat(indexs[i].rest_time));//日历时间
            yData2.push(parseFloat(indexs[i].downtime_maintenance));
            yData3.push(parseFloat(indexs[i].downtime_noEquipment));
            yData4.push(parseFloat(indexs[i].downtime_loss));
            yData5.push(parseFloat(indexs[i].start_shutdown));
            yData6.push(parseFloat(indexs[i].product_change));
            yData7.push(parseFloat(indexs[i].tool_change));
            yData8.push(parseFloat(indexs[i].idling));
            yData9.push(parseFloat(indexs[i].small_downtime));
        }
    } else {//不同设备同一时间
        xAxisName="工业产品类型";
        for(var i=0;i<indexs.length;i++) {
            xData.push(indexs[i].machine_name);
            yData1.push(parseFloat(indexs[i].rest_time));//日历时间
            yData2.push(parseFloat(indexs[i].downtime_maintenance));
            yData3.push(parseFloat(indexs[i].downtime_noEquipment));
            yData4.push(parseFloat(indexs[i].downtime_loss));
            yData5.push(parseFloat(indexs[i].start_shutdown));
            yData6.push(parseFloat(indexs[i].product_change));
            yData7.push(parseFloat(indexs[i].tool_change));
            yData8.push(parseFloat(indexs[i].idling));
            yData9.push(parseFloat(indexs[i].small_downtime));
        }
    }
    //画图
    var dom = document.getElementById("lossCharts");
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    app.title = '坐标轴刻度与标签对齐';
    option = {
        title: {
            text: '损失分析'
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: 100
        },
        legend: {
            data: [ '停机保养时间', '非设备因素停机时间', '故障停机时间', '开停机时间', '更换产品时间', '更换工具时间', '空转时间', '间歇停机时间']
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
                name: '停机保养时间',
                type: 'bar',
                data:yData2
            },
            {
                name: '非设备因素停机时间',
                type: 'bar',
                data:yData3
            },
            {
                name: '故障停机时间',
                type: 'bar',
                data:yData4
            },
            {
                name: '开停机时间',
                type: 'bar',
                data:yData5
            }
            ,
            {
                name: '更换产品时间',
                type: 'bar',
                data:yData6
            },
            {
                name: '更换工具时间',
                type: 'bar',
                data:yData7
            },
            {
                name: '空转时间',
                type: 'bar',
                data:yData8
            },
            {
                name: '间歇停机时间',
                type: 'bar',
                data:yData9
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }


}
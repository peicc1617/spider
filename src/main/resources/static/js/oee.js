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
//显示图表
function showOEE(datalist)
{
    ///////////////////////////////////////////////////
    //显示设备综合效率表格数据
    $('#oeeDataTable1').bootstrapTable('removeAll');
    for(var i=0;i<datalist.length;i++) {
        var rowdata = {
            machineName: datalist[i].machineName,
            TimeRate: datalist[i].TimeRate,
            performanceRate: datalist[i].performanceRate,
            qualityRate: datalist[i].qualityRate,
            OEE: datalist[i].OEEValue * 100 + "%",

        }
        $('#oeeDataTable1').bootstrapTable('append', rowdata);
    }
    ///////////////////////////////////////////////////
    var xData=[];//x轴数据
    var yData=[];//y轴数据

    for(var i=0;i<datalist.length;i++)
    {
        xData.push(datalist[i].machineName);
        yData.push(datalist[i].OEEValue*100);
    }
    var dom = document.getElementById("OEECharts");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '坐标轴刻度与标签对齐';

    option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                name:'设备名称',
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                data:xData,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'设备综合效率',
                min:0,
                max:100,
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series: [
            {
                name: '设备综合效率',
                type: 'bar',
                barWidth: '60%',
                // data: [10, 52, 200, 334, 390, 330, 220]
                data:yData
            },
            {
                name: '设备综合效率',
                type: 'line',
                barWidth: '60%',
                // data: [10, 52, 200, 334, 390, 330, 220]
                data:yData
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
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
                data:JSON.stringify(tableData)
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
//OEE指标
function calculateOEE()
{
    /*var machineName=[];//设备名称
    var date=[];//日期
    var calendarTime=[];//日历时间
    var plannedDownTime=0;//计划停机时间
    var loadTime=0;//负荷时间
    var downTime=0;//停机损失
    var operationTime=0;//实际开动时间
    var performanceLossTime=0;//性能损失时间
    var netOperationTime=0;//净开动时间
    var qualityRate=0;//合格品率
    var TimeRate=0;//时间开动率
    var performanceRate=0;//性能开动率
    var OEE=0;//设备综合效率*/
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
        dataForTab.TimeRate=(dataForTab.loadTime/dataForTab.calendarTime).toFixed(2);//时间开动率=负荷时间/日历时间
        dataForTab.performanceRate=(dataForTab.netOperationTime/dataForTab.operationTime).toFixed(2);//性能开动率=净操作时间/负荷时间
        dataForTab.OEE=(dataForTab.qualityRate*dataForTab.TimeRate*dataForTab.performanceRate).toFixed(2);//OEE=时间开动率*性能开动率*合格品率
        indexs.push(dataForTab);
    }
    //显示OEE图表
    showOEE(datalist);
}
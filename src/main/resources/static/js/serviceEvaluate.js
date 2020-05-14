//服务评价
function selectedArray() {
    var ids = $.map($('#indexTable').bootstrapTable('getSelections'), function (row) {
        return row.indexIdForIdentify;
    });
    return ids;
}
//添加指标
function addIndex() {
    //显示模态框
    $("#addIndexItem").modal("show");
}
function addIndexItem() {
    var maxIndexIdForIdentify=0;//当前指标唯一标识的最大值
    //获取指标个数
    $.ajax({
        url:"/evaluate/getMaxIndexIdForIdentify",
        type:"GET",
        async:false,
        success:function (result) {
            //添加后重新加载表格
            maxIndexIdForIdentify=result;
        }
    });
    //添加指标
    $.ajax({
        url:"/evaluate/addIndex",
        type:"POST",
        async:false,
        data:{
            indexIdForIdentify:maxIndexIdForIdentify+1,
            indexName:$("#indexName").val(),
            indexDesc:$("#indexDesc").val(),
            minValue:$("#minValue").val(),
            maxValue:$("#maxValue").val(),
            indexType:$("input:radio:checked").val()
        },
        success:function (result) {
            //添加后重新加载表格
            loadIndex();
        }
    });
    //隐藏模态框
    $("#addIndexItem").modal("hide");
}
//删除指标
function deleteIndex() {
    //获取选中的行的集合
    var ids = selectedArray();
    if (ids[0]==undefined){
        alert("请选中指标后再尝试删除！")
    } else{
        //删除指标
        $.ajax({
            url:"/evaluate/deleteIndex",
            type:"GET",
            async:false,
            data:{
                indexIdForIdentify:ids[0]//选中多个只删除第一个（为啥只删一个，问就是懒）
            },
            success:function (result) {
                alert("删除成功");
                //删除后重新加载表格
                loadIndex();
            }
        });
    }
}
//加载指标
function loadIndex() {
    //首先清空表格
    $('#indexTable').bootstrapTable("removeAll");
    $.ajax({
        url:"/evaluate/getAllIndexs",
        type:"GET",
        async:false,
        success:function (result) {
            for (var i = 0; i <result.length ; i++) {
                var rowData={
                    indexId:i+1,
                    indexIdForIdentify:result[i].indexIdForIdentify,
                    indexName:result[i].indexName,
                    indexDesc:result[i].indexDesc,
                    minValue: result[i].minValue,
                    maxValue: result[i].maxValue,
                    indexType:result[i].indexType
                }
                $('#indexTable').bootstrapTable("append",rowData);
            }
        }
    });
}
//创建评价体系
function createEvaluate() {
    var ids=selectedArray();
    if (ids[0]==undefined) {
        alert("请先选择评价指标");
    } else{
        $("#createEvaluate").modal("show");
    }
}
function createEvaluateByTaskId() {
    var isExist;
    //taskId是否存在
    $.ajax({
        url:"/evaluate/isExistByTaskId",
        type:"POST",
        async:false,
        data:{
            taskId:$("#taskId").val(),
        },
        success:function (result) {
            isExist=result;
        }
    });
    if (isExist==true) {
        alert("当前任务id已存在！")
    }else{
        //添加
        $.ajax({
            url:"/evaluate/addIndexsByTaskId",
            type:"POST",
            async:false,
            data:{
                taskId:$("#taskId").val(),
                evaluateName:$("#evaluateName").val(),
                evaluateDesc:$("#evaluateDesc").val(),
                evaluateIndexs:JSON.stringify(selectedArray()),
                userName:$("#userName").html()
            },
            success:function (result) {
                alert("创建成功")
            }
        });
    }
    $("#createEvaluate").modal("hide");
}
//根据taskId加载指标及其取值和权重
function loadIndexs() {
    var taskId1=$("#taskID1").val();//获取服务任务ID
    var indexs=0;//保存服务任务id对应的指标索引集合
    var values=[];//指标取值
    var weights=[];//指标权重
    if (taskId1==""){
        alert("请选择服务任务Id")
    } else{
        $.ajax({
            url:"/evaluate/getIndexsByTaskId",
            type:"POST",
            async:false,
            data:{
                taskId:taskId1
            },
            success:function (result) {
                //服务任务id对应的指标索引集合
                indexs=result.evaluateIndexs;
                $("#evaluateName1").val(result.evaluateName);
                $("#evaluateDesc1").val(result.evaluateDesc);
                values=JSON.parse(result.value);
                weights=JSON.parse(result.weight);
            }
        });
        //根据指标索引加载指标表格
        $.ajax({
            url:"/evaluate/getIndexsForTaskId",
            type:"POST",
            async:false,
            data:{
                indexs:indexs
            },
            success:function (result) {
                initIndexValueTable(result)
            }
        });
        //加载取值及其权重
        if (values!=null) {
            for (var i = 0; i <values.length ; i++) {
                $("#indexValue"+(i+1)).val(values[i]);
                $("#indexWeight"+(i+1)).val(weights[i]);
            }
        }

    }
}
//初始化指标值-权重表格
function initIndexValueTable(para) {
    //首先清空表格
    $('#indexValueTable').bootstrapTable("removeAll");
    for (var i = 0; i <para.length ; i++) {
        var rowData={
            indexId:i+1,
            indexName:para[i].indexName,
            indexValue:"<input type=\"text\" style=\"margin: auto\"  placeholder=\"\"  id=indexValue"+(i+1)+" />",
            minValue: para[i].minValue,
            maxValue: para[i].maxValue,
            indexWeight:"<input type=\"text\" style=\"margin: auto\"  placeholder=\"\" id=indexWeight"+(i+1)+" />",
            indexType:para[i].indexType,
        }
        $('#indexValueTable').bootstrapTable("append",rowData);
    }
}
function saveIndexsValue() {
    var taskId1=$("#taskID1").val();//获取服务任务ID
    var tableData=$('#indexValueTable').bootstrapTable("getData");
    var values=[];//指标取值
    var weights=[];//权重
    for (var i = 0; i <tableData.length ; i++) {
        values.push($("#indexValue"+(i+1)).val());
        weights.push($("#indexWeight"+(i+1)).val());
    }
    //根据任务id存储指标值及其权重
    $.ajax({
        url:"/evaluate/saveValueAndWeight",
        type:"POST",
        async:false,
        data:{
            taskId:taskId1,
            indexValues:JSON.stringify(values),
            indexWeights: JSON.stringify(weights)
        },
        success:function (result) {
            alert("保存成功")
        }
    });
}
//计算服务得分
function calculate() {
    var tableData=$('#indexValueTable').bootstrapTable("getData");
    var indicator=[];//雷达图指标
    var data=[];//雷达图数据
    var maxData=[];//最大值
    var minData=[];//最小值
    if (tableData.length==0){
        alert("未获取到相关数据")
    }else{
        var sum=0;
        for (var i = 0; i <tableData.length ; i++) {
            var minValue=parseFloat(tableData[i].minValue);
            var maxValue=parseFloat(tableData[i].maxValue);
            var value=parseFloat($("#indexValue"+(i+1)).val());
            var weight=parseFloat($("#indexWeight"+(i+1)).val());
            var indexType=tableData[i].indexType;
            var dis=maxValue-minValue;
            var perScore=0;
            if (indexType=="正向指标") {
                if (value>=maxValue) {
                    perScore=1*weight
                } else{
                    perScore=(value-minValue)*weight/dis;
                }
            } else{
                if (value<minValue) {
                    perScore=1*weight
                } else {
                    perScore=(maxValue-value)*weight/dis;
                }
            }
            console.log(perScore*5);
            sum=sum+perScore;
            //雷达图指标数据
            var rowIndicator={
                name:tableData[i].indexName,
                max:maxValue
            }
            indicator.push(rowIndicator);
            //雷达图数据
            data.push(value);
            maxData.push(maxValue);
            minData.push(minValue);

        }
        var score=(sum*5).toFixed(1);
        $("#score").html(score);
        //画雷达图
        drawRadar(indicator,data,maxData,minData);
    }
}
function drawRadar(indicator,data,maxData,minData){
    var dom = document.getElementById("radarContainer");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title: {
            text: 'MRO评价指标雷达图'
        },
        legend: {
            data: ['实际值', '最大值','最小值'],
            right:10
        },
        tooltip: {},
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: indicator,
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: data,
                    name: '实际值'
                },
                {
                    value: maxData,
                    name: '最大值'
                },
                {
                    value: minData,
                    name: '最小值'
                },
            ]
        }]
    };;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

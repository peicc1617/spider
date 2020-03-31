//MRO运行调度
var taskId;
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
    var request;
    var supplier;
    var para_taskId=$("#para_taskId").val();

}
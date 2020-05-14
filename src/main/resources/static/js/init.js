//初始化
jQuery(function($) {
    //加载项目列表
    loadProjectList()
});
function loadProjectList() {
    $('#projectTable').bootstrapTable('removeAll');
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
                var rowData=[];
                rowData.push({
                    taskId:project.taskId,
                    taskDescription:project.description
                })
                $('#projectTable').bootstrapTable('append', rowData);
            })
        }
    })

}
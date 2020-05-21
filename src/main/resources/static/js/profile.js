jQuery(function($) {
    initUserInfo();
});
//初始化用户信息列表
function initUserInfo() {
    $('#userInfo').bootstrapTable('removeAll');
    $.ajax({
        url:"api/getAllUsers",
        type:"get",
        async:false,
        success:function(result){
            result.forEach(function (user) {
                var rowdata = {
                    userId: user.id,
                    userName: user.userName,
                    password: user.password,
                    nickName: user.nickName,
                    domain: user.domain,
                    permission: user.permission,
                    email: user.email,
                    phoneNumber:user.phoneNumber,
                    jobNumber:user.jobNumber

                }
                $('#userInfo').bootstrapTable('append', rowdata);
            })
        }
    })
}
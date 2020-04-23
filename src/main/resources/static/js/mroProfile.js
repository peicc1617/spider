function checkMROOfOWL() {
    $("owl_container").empty();
    var dictionary={
        0.07:"很低",
        0.2:"低",
        0.35:"较低",
        0.5:"中等",
        0.65:"较高",
        0.8:"高",
        0.93:"很高"
    }
    var dom = document.getElementById("owl_container");
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    option = {
        title: {
            text: 'MRO服务提供商本体模型'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    show: true
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 5],
                edgeLabel: {
                    fontSize: 10
                },
                data: [{
                    name: 'MRO',
                    symbolSize: 80,
                    x: 500,
                    y: 300
                }, {
                    name: '基本信息',
                    symbolSize: 60,
                    x: 800,
                    y: 300
                }, {
                    name: 'ID',
                    symbolSize: 60,
                    x: 1000,
                    y: 200
                }, {
                    name: '公司名称',
                    symbolSize: 60,
                    x: 1000,
                    y: 450
                }, {
                    name: '服务能力',
                    symbolSize: 60,
                    x: 200,
                    y: 300
                }, {
                    name: '资源名称',
                    symbolSize: 60,
                    x: 100,
                    y: -70
                }, {
                    name: '资源描述',
                    symbolSize: 60,
                    x: 0,
                    y:100
                }, {
                    name: '附加信息',
                    symbolSize: 60,
                    x: -50,
                    y: 300
                }, {
                    name: '响应时间',
                    symbolSize: 60,
                    x: -40,
                    y: 500
                }, {
                    name: '供货数量',
                    symbolSize: 60,
                    x:50,
                    y: 650
                }, {
                    name: '服务质量',
                    symbolSize: 60,
                    x: 500,
                    y: 560
                }, {
                    name: '服务价格',
                    symbolSize: 60,
                    x: 210,
                    y: 750
                }, {
                    name: '响应速度',
                    symbolSize: 60,
                    x: 430,
                    y: 800
                }, {
                    name: '可靠性',
                    symbolSize: 60,
                    x: 700,
                    y: 750
                }, {
                    name: '信誉',
                    symbolSize: 60,
                    x: 850,
                    y: 610
                }, {
                    name: '服务状态',
                    symbolSize: 60,
                    x: 500,
                    y: 40
                }, {
                    name: '空闲',
                    symbolSize: 60,
                    x: 300,
                    y: -150
                }, {
                    name: '半饱和',
                    symbolSize: 60,
                    x: 500,
                    y: -180
                }, {
                    name: '饱和',
                    symbolSize: 60,
                    x: 700,
                    y: -130
                }, {
                    name: '不可用',
                    symbolSize: 60,
                    x: 820,
                    y: 20
                }],
                // links: [],
                links: [{
                    source: 'MRO',
                    target: '基本信息',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: 'MRO',
                    target: '服务能力',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: 'MRO',
                    target: '服务质量',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: 'MRO',
                    target: '服务状态',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '基本信息',
                    target: 'ID',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '基本信息',
                    target: '公司名称',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务能力',
                    target: '资源名称',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务能力',
                    target: '资源描述',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务能力',
                    target: '附加信息',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务能力',
                    target: '响应时间',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务能力',
                    target: '供货数量',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务质量',
                    target: '服务价格',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务质量',
                    target: '响应速度',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务质量',
                    target: '可靠性',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务质量',
                    target: '信誉',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务状态',
                    target: '空闲',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务状态',
                    target: '半饱和',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务状态',
                    target: '饱和',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务状态',
                    target: '不可用',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                }],
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        ]
    };
    //根据MRO服务ID加载本体信息
    $.ajax({
        url:"/api/getEnterpriseOwlByCompanyId",
        type:"GET",
        async:false,
        data:{
            companyId:$("#companyId").val(),
        },
        success:function (result) {
            option.series[0].data.push(
                {
                    name: result.companyId,//公司ID
                    symbolSize: 60,
                    x: 1200,
                    y: 200
                },{
                    name: result.companyName,//公司名称
                    symbolSize: 60,
                    x: 1200,
                    y: 450
                },{
                    name: result.name,//资源名称
                    symbolSize: 60,
                    x: -100,
                    y: -70
                },{
                    name: result.description,//资源描述
                    symbolSize: 60,
                    x: -200,
                    y: 100
                },{
                    name: result.addInfo,//附加信息
                    symbolSize: 60,
                    x: -250,
                    y: 300
                },{
                    name: result.time,//响应时间
                    symbolSize: 60,
                    x: -240,
                    y: 500
                },{
                    name: result.num,//供货数量
                    symbolSize: 60,
                    x: -150,
                    y: 700
                },{
                    name: result.cost,//服务价格
                    symbolSize: 60,
                    x: 20,
                    y: 900
                },{
                    name: "响应速度："+dictionary[result.speed],//响应速度
                    symbolSize: 60,
                    x: 430,
                    y: 1000
                },{
                    name:"可靠性：" +dictionary[result.reliability],//可靠性
                    symbolSize: 60,
                    x: 900,
                    y: 850
                },{
                    name:"信誉：" +dictionary[result.reputation],//信誉
                    symbolSize: 60,
                    x: 1100,
                    y: 650
                }
            )
            option.series[0].links.push(
                {
                    source: 'ID',
                    target: result.companyId.toString(),
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '公司名称',
                    target: result.companyName,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '资源名称',
                    target: result.name,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '资源描述',
                    target: result.description,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '附加信息',
                    target: result.addInfo,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '响应时间',
                    target: result.time,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '供货数量',
                    target: result.num,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '服务价格',
                    target: result.cost.toString(),
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '响应速度',
                    target: "响应速度："+dictionary[result.speed],
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '可靠性',
                    target: "可靠性："+dictionary[result.reliability],
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                },{
                    source: '信誉',
                    target: "信誉："+dictionary[result.reputation],
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {

                        curveness: 0.2
                    }
                }
            )
        }
    });
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
function getAllOfstatistics() {
    var xData=[];
    var yData=[];
    $.ajax({
        url:"/api/getAllOfStatistics",
        type:"GET",
        async:false,
        success:function (result) {
            for (var i = 0; i <result.length ; i++) {
                xData.push(result[i].type);
                yData.push(result[i].num);
            }
        }
    })
    $("#container").empty();
    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    option = {
        xAxis: {
            type: 'category',
            axisLabel: {
                show: true,
                interval:0,
                rotate:40,
                textStyle: {
                    color: '#333'
                }
            },
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: yData,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
            }
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    getAllOfstatisticsByProvince();
}
function getAllOfstatisticsByProvince(){
    var xData=[];
    var yData=[];
    $.ajax({
        url:"/api/getAllOfStatisticsByProvince",
        type:"GET",
        async:false,
        success:function (result) {
            for (var i = 0; i <result.length ; i++) {
                xData.push(result[i].type);
                yData.push(result[i].num);
            }
        }
    })
    $("#container1").empty();
    var dom = document.getElementById("container1");
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    option = {
        xAxis: {
            type: 'category',
            axisLabel: {
                show: true,
                interval:0,
                rotate:40,
                textStyle: {
                    color: '#333'
                }
            },
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: yData,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
            }
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
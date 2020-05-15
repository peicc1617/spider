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
jQuery(function($) {
    getAllOfstatistics()
    LoadSelectionsOfMROOfOWL()
    drawChinaMap()
});
function LoadSelectionsOfMROOfOWL() {
    $("#companyId").empty();
    $.ajax({
        url:"/api/getAllEnterpriseOwl",
        type:"GET",
        async:false,
        success:function (result) {
            for (var i = 0; i <result.length ; i++) {
                var option="<option value="+result[i].companyId+">"+result[i].companyId+"-"+result[i].companyName+"</option>"
                $("#companyId").append(option);
            }
        }
    })
}
function drawChinaMap() {
    var dom = document.getElementById("container2");
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    /*var data = [
        {name:"北京",value:199},
        {name:"天津",value:42},
        {name:"河北",value:102},
        {name:"山西",value:81},
        {name:"内蒙古",value:47},
        {name:"辽宁",value:67},
        {name:"吉林",value:82},
        {name:"黑龙江",value:123},
        {name:"上海",value:24},
        {name:"江苏",value:92},
        {name:"浙江",value:114},
        {name:"安徽",value:109},
        {name:"福建",value:116},
        {name:"江西",value:91},
        {name:"山东",value:119},
        {name:"河南",value:137},
        {name:"湖北",value:116},
        {name:"湖南",value:114},
        {name:"重庆",value:91},
        {name:"四川",value:125},
        {name:"贵州",value:62},
        {name:"云南",value:83},
        {name:"西藏",value:9},
        {name:"陕西",value:80},
        {name:"甘肃",value:56},
        {name:"青海",value:10},
        {name:"宁夏",value:18},
        {name:"新疆",value:180},
        {name:"广东",value:123},
        {name:"广西",value:59},
        {name:"海南",value:14},
    ];*/
    var data=[];
    $.ajax({
        url:"/api/getAllOfStatisticsByProvince",
        type:"GET",
        async:false,
        success:function (result) {
            for (var i = 0; i <result.length ; i++) {
                var point={
                    name:result[i].type,
                    value:result[i].num,
                }
                data.push(point)
            }
        }
    })
    var geoCoordMap = {
        '台湾': [121.5135,25.0308],
        '黑龙江': [127.9688, 45.368],
        '内蒙古': [110.3467, 41.4899],
        "吉林": [125.8154, 44.2584],
        '北京市': [116.4551, 40.2539],
        "辽宁": [123.1238, 42.1216],
        "河北": [114.4995, 38.1006],
        "天津": [117.4219, 39.4189],
        "山西": [112.3352, 37.9413],
        "陕西": [109.1162, 34.2004],
        "甘肃": [103.5901, 36.3043],
        "宁夏": [106.3586, 38.1775],
        "青海": [101.4038, 36.8207],
        "新疆": [87.9236, 43.5883],
        "西藏": [91.11, 29.97],
        "四川": [103.9526, 30.7617],
        "重庆": [108.384366, 30.439702],
        "山东": [117.1582, 36.8701],
        "河南": [113.4668, 34.6234],
        "江苏": [118.8062, 31.9208],
        "安徽": [117.29, 32.0581],
        "湖北": [114.3896, 30.6628],
        "浙江": [119.5313, 29.8773],
        "福建": [119.4543, 25.9222],
        "江西": [116.0046, 28.6633],
        "湖南": [113.0823, 28.2568],
        "贵州": [106.6992, 26.7682],
        "云南": [102.9199, 25.4663],
        "广东": [113.12244, 23.009505],
        "广西": [108.479, 23.1152],
        "海南": [110.3893, 19.8516],
        '上海': [121.4648, 31.2891],
    };

    var max = 480, min = 9; // todo
    var maxSize4Pin = 100, minSize4Pin = 20;

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };



    var option = {
        backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#f2f3ff' // 0% 处的颜色
            }, {
                offset: 1, color: '#fffefa' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        },
        title: {
            top:20,
            text: 'MRO服务提供商地理分布',
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#45a5ff'
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if(typeof(params.value)[2] == "undefined"){
                    return params.name + ' : ' + params.value;
                }else{
                    return params.name + ' : ' + params.value[2];
                }
            }
        },
        /*   legend: {
               orient: 'vertical',
               y: 'bottom',
               x: 'right',
                data:['pm2.5'],
               textStyle: {
                   color: '#fff'
               }
           },*/
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x:'right',
            data:['pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            show: false,
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {

            }
        },
        geo: {
            map: 'china',
            show: true,
            roam: true,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#3a7fd5',
                    borderColor: '#0a53e9',//线
                    shadowColor: '#092f8f',//外发光
                    shadowBlur: 20
                },
                emphasis: {
                    areaColor: '#0a2dae',//悬浮区背景
                }
            }
        },
        series : [
            {

                symbolSize: 5,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }
                },
                name: 'light',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),

            },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 1, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#FFFFFF',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: 'Top 5',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: [50,50],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 9,
                        },
                        formatter (value){
                            return value.data.value[2]
                        }

                    }
                },
                itemStyle: {
                    normal: {
                        color: '#D8BC37', //标志颜色
                    }
                },
                data: convertData(data),
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                zlevel: 1
            },

        ]
    };
    myChart.setOption(option);
}
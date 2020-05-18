jQuery(function($) {
   showLocation();
});
function showLocation() {
    // 百度地图API功能
    var map = new BMap.Map("map", {
        enableMapClick: false
    });    // 创建Map实例
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
        "重庆": [106.404366, 29.539702],
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
    var area=$("#area").html();
    map.centerAndZoom(new BMap.Point(geoCoordMap[area][0],geoCoordMap[area][1]), 7);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    var data = [
        // 点数据
        {
            geometry: {
                type: 'Point',
                coordinates: geoCoordMap[area]
            },
            fillStyle: 'red',
            size: 10,
        }
    ];

    var dataSet = new mapv.DataSet(data);
    var options = {
        fillStyle: 'rgba(255, 50, 50, 0.6)',
        shadowColor: 'rgba(255, 50, 50, 1)',
        shadowBlur: 30,
        globalCompositeOperation: 'lighter',
        methods: {
            click: function (item) {
                console.log(item);
            }
        },
        size: 5,
        // updateImmediate: true,
        draw: 'simple'
    }

    var dataSet = new mapv.DataSet(data);
    var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
    // mapvLayer.show();

    /*map.setMapStyle({
        style: 'light'
    });*/

}
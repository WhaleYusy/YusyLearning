$(document).ready(function() {

	var url1 = "https://ujob.fsrlzy.cn/back/getpaymentstatisticsData?sDay=2018-10-01&eDay=2019-03-31&sDay1=undefined&eDay1=undefined&locationId=440600000000&graduates=0&analysisType=2&selects=undefined&education=0&industry=0&jobType=&sex=&nodeType=&interviewType=&workLife=0&schoolType=0&companyType=&educationId=&xType=2&jobFairChoice=undefined&personType=03&accountType=";
	$.post(url1,{},function(data){
		var datafd = data.dataMap;
		var datafdk = Object.keys(datafd);
		datafds = [];
		for (var i = 0; i < datafdk.length; i++) {
			var fds = {};
			fds.name = datafdk[i];
			fds.type = "bar";
			fds.data = datafd[datafdk[i]];
			datafds.push(fds);
		}
		var datafx = data.xList;
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
		// 指定图表的配置项和数据
		var option = {
			title: {
				x: 'center',
				text: '佛山市人才网应届毕业生薪酬期望值实时分析',
				textStyle:{
					fontSize : '20'
				}
			},
			grid: {
				y: '90',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer:{
					type:'shadow'
				}
			},
			legend: {
				type: 'scroll',
				x: 'center',
				y: '30',
				textStyle:{
					fontSize : '16'
				}
			},
			xAxis: {
				axisLabel: {
					fontSize: '16'
				},
				name: data.unitMap.xUnit,
				nameTextStyle: {
					fontSize: '18',
					fontWeight: 'bolder'
				},
				data: datafx
			},
			yAxis: {
				axisLabel: {
					fontSize: '16'
				},
				name: data.unitMap.yUnit,
				nameTextStyle: {
					fontSize: '18',
					fontWeight: 'bolder'
				}
			},
			series: datafds,
			dataZoom: [
				{
					start : 0,
					end : 400/(datafx.length),
					show : false
				}
				]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		clearInterval(timeTicket);
		var timeTicket = setInterval(function (){
			var data0 = option.series[0].data;
			data0.push(datafd['佛山市'][0]);
			data0.shift();
			var data1 = option.series[1].data;
			data1.push(datafd['佛山市禅城区'][0]);
			data1.shift();
			var data2 = option.series[2].data;
			data2.push(datafd['佛山市南海区'][0]);
			data2.shift();
			var data3 = option.series[3].data;
			data3.push(datafd['佛山市顺德区'][0]);
			data3.shift();
			var data4 = option.series[4].data;
			data4.push(datafd['佛山市三水区'][0]);
			data4.shift();
			var data5 = option.series[5].data;
			data5.push(datafd['佛山市高明区'][0]);
			data5.shift();
			option.xAxis.data.push(datafx[0]);
			option.xAxis.data.shift();
			myChart.setOption(option);
		}, 5000);
		
	});

	var url2 = "https://ujob.fsrlzy.cn/back/getpaymentstatisticsData?sDay=2018-10-01&eDay=2019-03-31&sDay1=&eDay1=&locationId=440600000000&graduates=&analysisType=2&selects=undefined&education=0&industry=0&jobType=&sex=&nodeType=&interviewType=&workLife=0&schoolType=0&companyType=&educationId=&xType=5&jobFairChoice=&personType=0&accountType=";
	$.post(url2,{},function(data){
		var datafd = data.dataMap;
		var datafdk = Object.keys(datafd);
		var datafds = [];
		for (var i = 0; i < datafdk.length; i++) {
			var fds = {};
			fds.name = datafdk[i];
			fds.type = "bar";
			fds.data = datafd[datafdk[i]];
			datafds.push(fds);
		}
		var datafx = data.xList;
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main2'));
		// 指定图表的配置项和数据
		var option = {
			title: {
				x: 'center',
				text: '佛山人才网求职人群薪酬期望值实时分析',
				textStyle:{
					fontSize : '20'
				}
			},
			grid: {
				y: '90',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer:{
					type:'shadow'
				}
			},
			legend: {
				type: 'scroll',
				x: 'center',
				y: '30',
				textStyle:{
					fontSize : '16'
				}
			},
			xAxis: {
				axisLabel: {
					fontSize: '16'
				},
				name: data.unitMap.xUnit,
				nameTextStyle: {
					fontSize: '18',
					fontWeight: 'bolder'
				},
				data: datafx
			},
			yAxis: {
				axisLabel: {
					fontSize: '16'
				},
				name: data.unitMap.yUnit,
				nameTextStyle: {
					fontSize: '18',
					fontWeight: 'bolder'
				}
			},
			series: datafds
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	});

	var url3 = "https://ujob.fsrlzy.cn/back/getRecommendResumeInfoData?sDay=2018-10-01&eDay=2019-03-31&sDay1=undefined&eDay1=undefined&locationId=440600000000&graduates=1&analysisType=&selects=0&education=undefined&industry=undefined&jobType=undefined&sex=undefined&nodeType=&interviewType=&workLife=&schoolType=&companyType=&educationId=&xType=1&jobFairChoice=undefined&personType=undefined&accountType=undefined";
	$.post(url3,{},function(data){
		var datafd = data.dataMap;
		var datafdk = Object.keys(datafd);
		var datafds = [];
		for (var i = 0; i < datafdk.length; i++) {
			var fds = {};
			fds.name = datafd[i].name;
			fds.value = datafd[i].value;
			fds.label = {show:true,formatter: "{b} : {c} ({d}%)"};
			datafds.push(fds);
		}
		var datafx = data.xList;
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main3'));
		// 指定图表的配置项和数据
		var option = {
			title: {
				x: 'center',
				text: '佛山人才网企业向应届毕业生发送面试邀约情况',
				textStyle:{
					fontSize : '20'
				}
			},
			grid: {
				y: '90',
			},
			tooltip: {
				trigger: 'item',
        		formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{
				name: '浏览简历',
				type: 'pie',
				radius: '55%',
				center: ['50%','60%'],
				data:datafds,
				label:{
					fontWeight: 'bolder',
					fontSize: '18'
				}
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	});

	var url4 = "https://ujob.fsrlzy.cn/back/getSeekerStatisticsData?sDay=2018-10-01&eDay=2019-03-31&sDay1=&eDay1=&locationId=440600000000&graduates=&analysisType=&selects=undefined&education=undefined&industry=&jobType=&sex=&nodeType=&interviewType=&workLife=&schoolType=&companyType=&educationId=&xType=4&jobFairChoice=&personType=&accountType=1";
	$.post(url4,{},function(data){
		var datafd = data.dataMap;
		var datafdk = Object.keys(datafd);
		var datafds = [];
		for (var i = 0; i < datafdk.length; i++) {
			var fds = {};
			fds.name = datafdk[i];
			fds.type = "line";
			fds.data = datafd[datafdk[i]];
			datafds.push(fds);
		}
		var datafx = data.xList;
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main4'));
		// 指定图表的配置项和数据
		var option = {
			title: {
				x: 'center',
				text: '佛山人才网求职者学历层次分布',
				textStyle:{
					fontSize : '20'
				}
			},
			grid: {
				y: '90',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer:{
					type:'shadow'
				}
			},
			legend: {
				type: 'scroll',
				x: 'center',
				y: '30',
				textStyle:{
					fontSize : '16'
				}
			},
			xAxis: {
				axisLabel: {
					fontSize: '12'
				},
				name: data.unitMap.xUnit,
				nameTextStyle: {
					fontSize: '16',
					fontWeight: 'bolder'
				},
				data: datafx
			},
			yAxis: {
				axisLabel: {
					fontSize: '12'
				},
				name: data.unitMap.yUnit,
				nameTextStyle: {
					fontSize: '16',
					fontWeight: 'bolder'
				}
			},
			series: datafds
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	});
var url5 = "https://ujob.fsrlzy.cn/back/getpaymentstatisticsData?sDay=2017-10-01&eDay=2018-03-31&sDay1=undefined&eDay1=undefined&locationId=440600000000&graduates=0&analysisType=2&selects=undefined&education=0&industry=0&jobType=&sex=&nodeType=&interviewType=&workLife=0&schoolType=0&companyType=&educationId=&xType=2&jobFairChoice=undefined&personType=03&accountType=";
	$.post(url5,{},function(data){
		var datafd = data.dataMap;
		var datafdk = Object.keys(datafd);
		datafds = [];
		for (var i = 0; i < datafdk.length; i++) {
			var fds = {};
			fds.name = datafdk[i];
			fds.type = "bar";
			fds.data = datafd[datafdk[i]];
			datafds.push(fds);
		}
		var datafx = data.xList;
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main5'));
		// 指定图表的配置项和数据
		var option = {
			title: {
				x: 'center',
				text: '佛山市人才网应届毕业生薪酬期望值实时分析',
				textStyle:{
					fontSize : '20'
				}
			},
			grid: {
				y: '90',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer:{
					type:'shadow'
				}
			},
			legend: {
				type: 'scroll',
				x: 'center',
				y: '30',
				textStyle:{
					fontSize : '16'
				}
			},
			xAxis: {
				axisLabel: {
					fontSize: '16'
				},
				name: data.unitMap.xUnit,
				nameTextStyle: {
					fontSize: '18',
					fontWeight: 'bolder'
				},
				data: datafx
			},
			yAxis: {
				axisLabel: {
					fontSize: '16'
				},
				name: data.unitMap.yUnit,
				nameTextStyle: {
					fontSize: '18',
					fontWeight: 'bolder'
				}
			},
			series: datafds,
			dataZoom: [
				{
					start : 0,
					end : 400/(datafx.length),
					show : false
				}
				]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		clearInterval(timeTicket);
		var timeTicket = setInterval(function (){
			var data0 = option.series[0].data;
			data0.push(datafd['佛山市'][0]);
			data0.shift();
			var data1 = option.series[1].data;
			data1.push(datafd['佛山市禅城区'][0]);
			data1.shift();
			var data2 = option.series[2].data;
			data2.push(datafd['佛山市南海区'][0]);
			data2.shift();
			var data3 = option.series[3].data;
			data3.push(datafd['佛山市顺德区'][0]);
			data3.shift();
			var data4 = option.series[4].data;
			data4.push(datafd['佛山市三水区'][0]);
			data4.shift();
			var data5 = option.series[5].data;
			data5.push(datafd['佛山市高明区'][0]);
			data5.shift();
			option.xAxis.data.push(datafx[0]);
			option.xAxis.data.shift();
			myChart.setOption(option);
		}, 5000);
		
	});
});
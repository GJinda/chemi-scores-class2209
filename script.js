
function getMaxLength(arr) {
  //console.log(arr);
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > max) {
      max = arr[i].length;
    }
  }
  return max;
}

let chartDom1 = document.getElementById('table1');
let chartDom2 = document.getElementById('table2');
let chartDom3 = document.getElementById('table3');
let chartDom4 = document.getElementById('table4');

let lineChart1 = echarts.init(chartDom1);
let lineChart2 = echarts.init(chartDom2);
let lineChart3 = echarts.init(chartDom3);
let lineChart4 = echarts.init(chartDom4);

let app = {};

let option1 = {
  legend: {},
  tooltip: {},
  dataset: {
    source: []
  },
  // x: category (first line of dataset)
  xAxis: { type: 'category' },
  // y: value。
  yAxis: {},
  // multiple bars (each line of dataset)
  series: []
}

let option2 = {
  legend: {},
  tooltip: {},
  dataset: {
    source: []
  },
  // x: category (first line of dataset)
  xAxis: { type: 'category' },
  // y: value。
  yAxis: {},
  // multiple bars (each line of dataset)
  series: []
}

let option3 = {
  legend: {},
  tooltip: {},
  dataset: {
    source: []
  },
  // x: category (first line of dataset)
  xAxis: { type: 'category' },
  // y: value。
  yAxis: {},
  // multiple bars (each line of dataset)
  series: []
}

let option4 = {
  legend: {},
  tooltip: {},
  dataset: {
    source: []
  },
  // x: category (first line of dataset)
  xAxis: { type: 'category' },
  // y: value。
  yAxis: {},
  // multiple bars (each line of dataset)
  series: []
}

let sheet = {}

const readFile = (obj) => {
  let file = obj.files[0];
  let reader = new FileReader();
  reader.readAsBinaryString(file);

  reader.onload = function (e) {
    let data = e.target.result;
    let workbook = XLSX.read(data, { type: 'binary' });
    sheet = workbook.Sheets[workbook.SheetNames[0]]
    // console.log(sheet)
    setData(sheet)

  };
}

const setSource = (sheet, source, categoryNum, barsi, barsj) => {
  let keys = Object.keys(sheet)
  console.log("keys", keys, "last key", keys[keys.length - 2])

  for (let i = 0; i < categoryNum; i++) {
    let chari = String.fromCharCode(65 + i)
    let arr = []
    arr.push(sheet[chari + "1"].v)
    for (let j = barsi; j < barsj; j++) {
      arr.push(sheet[chari + (j + 1)].v)
      // console.log("arr", arr)
      // console.log("i", i)
      // console.log("j", j)
      // console.log("chari + (j + 1)", chari + (j + 1))
      // console.log("sheet[chari + (j + 1)].v", sheet[chari + (j + 1)].v)
      // console.log("keys[keys.length - 2]", keys[keys.length - 2])
    }
    source.push(arr)
  }
}

const setSeries = (series, seriesNum, seriesType) => {
  series.splice(0, series.length);
  for (let i = 0; i < seriesNum; i++) {
    let obj = { type: seriesType, smooth: "true" }
    series.push(obj)
  }
}

const setTooltip = () => {
  let tip = {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  }
  return tip
}

const setData = (sheet) => {
  let keys = Object.keys(sheet)
  console.log("keys", keys, "last key", keys[keys.length - 2])
  let categoryNum = parseInt(keys.length / 45)
  console.log("categoryNum", categoryNum)

  let source1 = []
  setSource(sheet, source1, categoryNum + 1, 1, 12)
  let source2 = []
  setSource(sheet, source2, categoryNum + 1, 12, 23)
  let source3 = []
  setSource(sheet, source3, categoryNum + 1, 23, 34)
  let source4 = []
  setSource(sheet, source4, categoryNum + 1, 34, 44)

  console.log("source1", source1)
  option1.dataset.source = source1;
  console.log("source2", source2)
  option2.dataset.source = source2;
  console.log("source3", source3)
  option3.dataset.source = source3;
  console.log("source4", source4)
  option4.dataset.source = source4;

  let series1 = []
  setSeries(series1, 11, 'line')
  let series2 = []
  setSeries(series2, 11, 'line')
  let series3 = []
  setSeries(series3, 11, 'line')
  let series4 = []
  setSeries(series4, 10, 'line')

  console.log("series1", series1)
  option1.series = series1;
  console.log("series2", series2)
  option2.series = series2;
  console.log("series3", series3)
  option3.series = series3;
  console.log("series4", series4)
  option4.series = series4;

  let tooltip1 = {}
  tooltip1 = setTooltip()
  let tooltip2 = {}
  tooltip2 = setTooltip()
  let tooltip3 = {}
  tooltip3 = setTooltip()
  let tooltip4 = {}
  tooltip4 = setTooltip()

  console.log("tooltip1", tooltip1)
  option1.tooltip = tooltip1;
  console.log("tooltip2", tooltip2)
  option2.tooltip = tooltip2;
  console.log("tooltip3", tooltip3)
  option3.tooltip = tooltip3;
  console.log("tooltip4", tooltip4)
  option4.tooltip = tooltip4;

  if (option1 && typeof option1 === 'object') {
    lineChart1.setOption(option1, true);
  }
  console.log("option1", option1)
  if (option2 && typeof option2 === 'object') {
    lineChart2.setOption(option2, true);
  }
  console.log("option2", option2)
  if (option3 && typeof option3 === 'object') {
    lineChart3.setOption(option3, true);
  }
  console.log("option3", option3)
  if (option4 && typeof option4 === 'object') {
    lineChart4.setOption(option4, true);
  }
  console.log("option4", option4)
}


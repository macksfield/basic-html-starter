const counter = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

getData = (number, min, max) => {
  fetch(
    "https://www.random.org/integers/?num=" +
      number +
      "&min=" +
      min +
      "&max=" +
      max +
      "&col=1&base=10&format=plain&rnd=new"
  )
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("raw").innerHTML = data;
      //console.log(data);
      let list = data.trim().split("\n");
      let uniq = [...new Set(list)];
      let graphList = [];
      let rawList = [];
  
      let temp = null;
      uniq.forEach((item) => {
        temp = counter(list, item);
        rawList.push(temp);
        graphList.push({ num: item, value: temp });
      });
      let maxValue = Math.max(...rawList);
  
      drawGraph(graphList, maxValue, min, max);
    });
};

//initial values
getData(document.forms[0].dc.value, document.forms[0].min.value, document.forms[0].max.value);


function drawGraph(graphList, maxValue, min, max) {
  addBars(graphList, maxValue, min, max);
  addYAxis(maxValue);
  addXAxis(min, max);
}

function addBars(graphList, maxValue, min, max) {
  const histogram = graphList.reduce((acc, item) => {
    let height = (item.value / maxValue) * 100;
    let width = 100/(max-min);
    // if(width < 5) width = 5;
    return (
      acc +
      `<li class="histogramItem" style="height: calc(${height}% + 1px); width: ${width}%;" />`
    );
  }, ``);

  document.getElementById("bars").innerHTML = histogram;
}

function addYAxis(maxValue) {
  const maxCountKey = Math.ceil(maxValue / 10) * 10;
  let countsInnerHtml = "";
  for (i = maxCountKey / 10; i >= 0; i--) {
    countsInnerHtml += `<li class="countItem">${i * 10}</li>`;
  }

  document.getElementById("counts").innerHTML = countsInnerHtml;
}

function addXAxis(min, max) {
  let xInner = "";
  let width = 100/(max-min);
  for (i = min; i <= max; i++) {
    xInner += `<span style="width:${width}%">${i}</span>`;
  }
console.log(xInner)
  document.getElementById("keys").innerHTML = xInner;
}

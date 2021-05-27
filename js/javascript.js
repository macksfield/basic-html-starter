const counter = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

getData = (quantity, min, max) => {
  quantity = parseInt(quantity, 10);
  min = parseInt(min, 10);
  max = parseInt(max, 10);

  fetch(
    "https://www.random.org/integers/?num=" +
      quantity +
      "&min=" +
      min +
      "&max=" +
      max +
      "&col=1&base=10&format=plain&rnd=new"
  )
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("raw").innerHTML = data;
      let list = data.trim().split("\n").map(x => +x);
      let graphList = [];

      for(let x = min; x <= max; x++) {
        graphList.push(counter(list, x));
      }
      let maxValue = Math.max(...graphList);
  
      drawGraph(graphList, maxValue, min, max);
    });
};

//initial values
getData(document.forms[0].dc.value, document.forms[0].min.value, document.forms[0].max.value);

function drawGraph(graphList, maxValue, min, max) {
  const maxCountKey = Math.ceil(maxValue / 10) * 10;

  addYAxis(maxCountKey);
  addBars(graphList, maxCountKey, min, max);
  addXAxis(min, max);
}

function addBars(graphList, maxValue, min, max) {
  const histogram = graphList.reduce((acc, item) => {
    let height = (item / maxValue) * 100;
    let width = 100/((max-min) + 1);
    if(width < 2) width = 2;
    return (
      acc +
      `<li class="histogramItem" style="height: calc(${height}% + 1px); width: calc(${width}% - 2px);" />`
    );
  }, ``);

  document.getElementById("bars").innerHTML = histogram;
}

function addYAxis(maxCountKey) {
  const interval = maxCountKey / 5;
  let countsInnerHtml = "";

  for (i = maxCountKey; i >= 0; i=i-interval) {
    countsInnerHtml += `<li class="countItem">${i}</li>`;
  }

  document.getElementById("counts").innerHTML = countsInnerHtml;
}

// function addYAxis(maxCountKey) {
//   let countsInnerHtml = "";
//   for (i = maxCountKey / 10; i >= 0; i--) {
//     countsInnerHtml += `<li class="countItem">${i * 10}</li>`;
//   }
//     document.getElementById("counts").innerHTML = countsInnerHtml;
// }


function addXAxis(min, max) {
  let xInner = "";
  let width = 100/((max-min) + 1);
  if(width < 2) width = 2;
  for (i = min; i <= max; i++) {
    // xInner += `<span style="width:${width}%">${i}</span>`;
    xInner += `<span style="width:${width}%">${i}</span>`;
  }
  document.getElementById("keys").innerHTML = xInner;
}


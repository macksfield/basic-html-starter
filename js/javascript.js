const number = 500;
const min = 10;
const max = 40;
const counter = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

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

    drawGraph(graphList, maxValue);
  });

function drawGraph(graphList, maxValue) {
  addBars(graphList, maxValue);
  addYAxis(maxValue);
  addXAxis();
}

function addBars(graphList, maxValue) {
  const histogram = graphList.reduce((acc, item) => {
    let height = (item.value / maxValue) * 100;
    return (
      acc +
      `<li class="histogramItem" style="height: calc(${height}% + 1px);" />`
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

function addXAxis() {
  let xInner = "";
  for (i = min; i <= max; i++) {
    xInner += `<span>${i}</span>`;
  }

  document.getElementById("keys").innerHTML = xInner;
}

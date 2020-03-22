const dataArrs = [
  [5, 10, 18, 24, 44, 57, 60],
  [22, 30, 15, 50],
  [17, 25, 70, 33, 42, 51, 63, 48, 36]
];
console.log();
let arrData = dataArrs[0];

const body = d3.select('body');

body.append('button').text('Dataset 1').attr('data-array', '0').on('click', clickHandler);
body.append('button').text('Dataset 2').attr('data-array', '1').on('click', clickHandler);
body.append('button').text('Dataset 3').attr('data-array', '2').on('click', clickHandler);

const svgWidth = 400,
  svgHeight = 400;
const svg = body.append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

const xScale = d3.scaleLinear()
  .domain([d3.min([].concat(dataArrs[0], dataArrs[1], dataArrs[2])), d3.max([].concat(dataArrs[0], dataArrs[1], dataArrs[2]))])
  .range([0, svgWidth]);

draw(arrData);

function clickHandler() {
  let index = this.getAttribute('data-array');
  arrData = dataArrs[index];

  draw(arrData);
}

function draw(arrData) {
  const update = svg.selectAll('rect')
    .data(arrData);

  update.exit().transition().duration(3000).style('opacity', 0).remove();

  const enter = update.enter()
    .append('rect')
    .attr('y', (d, i) => {
      return (i * 25)
    })
    .attr('width', (d) => {
      return d * 5
    })
    .attr('height', '20')
    .attr('fill', 'purple');

  enter.merge(update)
    .transition()
    .duration(3000)
    .attr('width', (d) => {
      return d * 5
    })
}
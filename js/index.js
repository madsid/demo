
var jsonData = [{"salesperson":"Bob","sales":33},{"salesperson":"Robin","sales":12},{"salesperson":"Anne","sales":41},{"salesperson":"Mark","sales":16},{"salesperson":"Joe","sales":59},{"salesperson":"Eve","sales":38},{"salesperson":"Karen","sales":21},{"salesperson":"Kirsty","sales":25},{"salesperson":"Chris","sales":30},{"salesperson":"Lisa","sales":47},{"salesperson":"Tom","sales":5},{"salesperson":"Stacy","sales":20},{"salesperson":"Charles","sales":13},{"salesperson":"Mary","sales":29}];

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);

var y = d3.scaleLinear()
          .range([height, 0]);

// add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = jsonData;
  
data.forEach(function(d) {
    d.sales = +d.sales;
});

// Scale the range of the data in the domains
x.domain(data.map(function(d) { return d.salesperson; }));
y.domain([0, d3.max(data, function(d) { return d.sales; })]);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) { return 'Sales Today : '+d.sales; });

svg.call(tip);

// append the rectangles for the bar chart
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.salesperson); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.sales); })
    .attr("height", function(d) { return height - y(d.sales); })
    .on('mouseover', tip.show )
    .on('mouseout', tip.hide);

// add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
    .call(d3.axisLeft(y));

svg.append("text")
    .attr("x", (width / 2) )             
    .attr("y", 0 - (margin.top / 2) + 5)
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style("text-decoration", "underline")  
    .text("Sales Per Employee");

    
 
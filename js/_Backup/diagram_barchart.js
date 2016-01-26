  function draw(data) {

 //     var data = d3.csv.parse(d3.select('#csv').text());

      var margin = {top: 20, right: 20, bottom: 100, left: 40},
        width = 400 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;
    
      var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], .2);

      yScale = d3.scale.linear()
        .domain([0, 250])
        .range([height, 0])

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(function(d) {
      return d.Hausart;
    });

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickValues([100, 200, 250]);

  xScale.domain(data.map(function(d) {
    return d.Hausart;
  }));

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-50)");

  svg.append("g")
    .attr("class", "axis")
    .call(yAxis)

  svg.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d) {
      return xScale(d.Hausart);
    })
    .attr("y", function(d) {
      return d.Messwert < 6 ? yScale(6) : yScale(d.Messwert);
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function(d) {
       return Math.abs(yScale(d.Messwert) - yScale(6));
    })
    .style("fill", function(d) {
      if (d.Messwert < 5.5) {
        return "red";
      } else if (d.value > 5.5) {
        return "green";
      } else {
        return "lightgray";
      }
    });
}

var data =[{
  ID: 1,
  Hausart: 'Reihenhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 1,
  Stockwerk: 0,
  Messwert: 0,
  Nutzung: 'Keller'
},{
  ID: 2,
  Hausart: 'Reihenhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 2,
  Stockwerk: 0,
  Messwert: 0,
  Nutzung: 'Keller'
},{
  ID: 3,
  Hausart: 'Mehrfamilienhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 3,
  Stockwerk: 0,
  Messwert: 223,
  Nutzung: 'Keller'
},{
  ID: 4,
  Hausart: 'Einfamilienhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 4,
  Stockwerk: 0,
  Messwert: 56,
  Nutzung: 'Keller'
},{
  ID: 5,
  Hausart: 'Reihenhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 2,
  Stockwerk: 1,
  Messwert: 68,
  Nutzung: 'Wohn-/Esszimmer'
},{
  ID: 6,
  Hausart: 'Mehrfamilienhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 3,
  Stockwerk: 1,
  Messwert: 56,
  Nutzung: 'Kinderzimmer'
},{
  ID: 7,
  Hausart: 'Einfamilienhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 4,
  Stockwerk: 1,
  Messwert: 87,
  Nutzung: 'Kinderzimmer'
}]

/*
var data = [{
    value: Math.random() * 10,
    label: 'A'
  },{
    value: Math.random() * 10,
    label: 'B'
  },{
    value: Math.random() * 10,
    label: 'C'
  },{
    value: Math.random() * 10,
    label: 'D'
  },{
    value: Math.random() * 10,
    label: 'E'
  },{
    value: Math.random() * 10,
    label: 'f'
  },{
    value: Math.random() * 10,
    label: 'G'
  },{
    value: Math.random() * 10,
    label: 'H'
  },{
    value: Math.random() * 10,
    label: 'I'
  }];
  */
  draw(data);
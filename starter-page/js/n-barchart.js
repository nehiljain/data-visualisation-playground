

"use strict";

var data = [ {category_name : "Anaerobic Exercise", below:95},
             {category_name : "Power", below:60},
             {category_name : "Injury", below:75},
             {category_name : "Recovery", below:85},
             {category_name : "cat 5", below:95},
             {category_name : "cat 6", below:10},
             {category_name : "cat 7", below:55}
            
          ];

/* Visual Properties of the graph defined here */


var vizTotalWidth = parseInt(d3.select('#n-barchart').style('width'), 10), // can be set using js/jquery
    vizTotalHeight = (1/2) * vizTotalWidth ,
    vizOuterMargin = {
        top: 20, 
        right: 40, 
        bottom: 30, 
        left: 40
    },
    plottingWidth = vizTotalWidth - vizOuterMargin.left - vizOuterMargin.right,
    barHeight = vizTotalHeight - vizOuterMargin.top - vizOuterMargin.bottom;


// ordinal scale for x axis
var barDivPadding = Math.round(0.15 * plottingWidth / data.length);

var x = d3.scale.ordinal()
    .domain(data.map(function(d) {return d.category_name;}))
    .rangeRoundBands([0, plottingWidth], .2, .3);

// linear scale to map dataset heights 

//the max value of score is?
var maxPercentile = 100;

var y = d3.scale.linear()
    .domain([0, maxPercentile])
    .range([0, barHeight]);


//color mapping to 7 categories

var colorCategoryGen = d3.scale.ordinal()
                        .domain(data.map(function(d) {return d.category_name;}))
                        .range(colorbrewer.Set2[7]);


var chart = d3.select("#n-barchart");

var bar = chart.selectAll("div")
    .data(data)
  .enter().append("div")
    .attr("class", "bar")
    .style("width", ( x.rangeBand() + (2 * barDivPadding))  + "px");
    

bar.append("div")
    .attr("class", "above")
    .style("background-color","#e0e0e0")
    .style("height", function(d) {
      var barHeight = (100 - d.below);
      return y(barHeight) + "px";
    })
    .style("width", x.rangeBand() + "px")
    .style("margin-left", barDivPadding + "px")
    .style("margin-right", barDivPadding + "px");

bar.append("div")
    .attr("class", "below text-center")
    .style("background-color",function(d) { 
        return colorCategoryGen(d.category_name);
    })
    .style("height", function(d) {
      var barHeight = d.below;
      return y(barHeight) + "px";
    })
    .style("width", x.rangeBand() + "px")
    .style("margin-left", barDivPadding + "px")
    .style("margin-right", barDivPadding + "px")
    .text(function(d) {return d.below;});;

var categoryButtons = d3.select("#category-buttons")
                        .selectAll("divs")
                        .data(data)
                        .enter().append("div")
                        .attr("class", "category_description up-arrow bar")
                        .style("background-color","white")
                        .style("width", ( x.rangeBand() + (2 * barDivPadding))  + "px")
                        .html(function(d) {
                          return '<p class="text-center">' + d.category_name + '</p>';
                        });

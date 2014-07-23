

"use strict";

var percentileData = [ {category_name : "Anaerobic Exercise", below:95},
             {category_name : "Power", below:60},
             {category_name : "Injury", below:75},
             {category_name : "Recovery", below:85},
             {category_name : "cat 5", below:95},
             {category_name : "cat 6", below:10},
             {category_name : "cat 7", below:55}
            
          ];

/* Visual Properties of the graph defined here */


var vizTotalWidth = parseInt(d3.select('#n-barchart > div.panel-default > div.panel-body').style('width'), 10), // can be set using js/jquery
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
var barDivPadding = Math.round(0.15 * plottingWidth / percentileData.length);

var x = d3.scale.ordinal()
    .domain(percentileData.map(function(d) {return d.category_name;}))
    .rangeRoundBands([0, plottingWidth], .2, .3);

// linear scale to map percentileDataset heights 

//the max value of score is?
var maxPercentile = 100;

var y = d3.scale.linear()
    .domain([0, maxPercentile])
    .range([0, barHeight]);


//color mapping to 7 categories

var colorCategoryGen = d3.scale.ordinal()
                        .domain(percentileData.map(function(d) {return d.category_name;}))
                        .range(colorbrewer.Dark2[7]);


var chart = d3.select("#n-barchart > div.panel-default > div.panel-body");

var bar = chart.selectAll("div")
    .data(percentileData)
  .enter().append("div")
    .attr("class", function(d) { return convertToSafeCssName(d.category_name)
                            + " bar";})
    .style("width", ( x.rangeBand() + (2 * barDivPadding))  + "px");
    
// this adds the grey ##e0e0e0 bar to each bar
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

// this adds the  colored below you part of the bar to each bar
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

// this adds all the descriptions
var categoryButtons = d3.select(".category-label")
                        .selectAll("divs")
                        .data(percentileData)
                        .enter().append("div")
                        .attr("class", function(d) { return  "category_tile " 
                            + convertToSafeCssName(d.category_name)
                            + " up-arrow";
                        })
                        .style("background-color","white")
                        .style("width", ( x.rangeBand() + (2 * barDivPadding))  + "px")
                        .html(function(d) {
                          return '<p class="text-center">' + d.category_name + '</p>';
                        });


function convertToSafeCssName(name) {
    name =  name.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~] /g, '').toLowerCase();
    return name.replace(/ /g, '');
}




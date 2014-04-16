
var geneticData;

d3.csv("data/sm_chip.csv", function(error, csv_data) {
  
  console.log("Before:");
  console.log(csv_data);

  var treeData = {"key": "performance", 
                    "values": d3.nest()
                                .key(function (d) { return d.category; })
                                .key(function (d) { return d.sub_category; })
                                .entries(csv_data)
  };
  console.log("After:");
  console.log( JSON.stringify(treeData, null, '\t'));
  geneticData = treeData;

var w = 900 - 80,
    h = 600 - 180,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h]),
    root,
    node;

// Has the color mapping for different categories Using color brewer





var color = d3.scale.ordinal()
  .domain([1,2,3])
  .range(colorbrewer.YlOrRd[3]);
var enduranceColor = d3.scale.ordinal()
  .domain([1,2,3])
  .range(colorbrewer.Greens[3]);
var powerColor = d3.scale.ordinal()
  .domain([1,2,3])
  .range(colorbrewer.Purples[3]);
var metabolismColor = d3.scale.ordinal()
  .domain([1,2,3])
  .range(colorbrewer.YlOrRd[3]);
var recoveryColor = d3.scale.ordinal()
  .domain([1,2,3])
  .range(colorbrewer.Blues[3]);

// d3.csv("data/sm_chip.csv", function(error, csv_data) {
//     var treeData = {"key": "performance", 
//                     "values": d3.nest()
//                                 .key(function (d) { return d.category; })
//                                 .key(function (d) { return d.sub_category; })
//                                 .key(function (d) { return d.rs_id; })
//                                 .entries(csv_data)
//   };

// });

// console.log(treeData);


var treemap = d3.layout.treemap()
    .children(function(d, depth) { return depth ? null : d.values; })
    .round(true)
    .size([w, h])
    .sticky(true)
    .value(function (d) { return d.variant_score; });

var svg = d3.select(".viz").append("div")
    .attr("class", "chart")
    .style("width", w + "px")
    .style("height", h + "px")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .append("svg:g")
    .attr("transform", "translate(.5,.5)");




node = root = geneticData;

var nodes = treemap.nodes(root)
    .filter(function (d) {
    return !d.values;
});

var cell = svg.selectAll("g")
    .data(nodes)
    .enter().append("svg:g")
    .attr("class", "cell")
    .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
})
    .on("click", function (d) {
    return zoom(node == d.parent ? root : d.parent);
});

cell.append("svg:rect")
    .attr("width", function (d) {
    return d.dx - 1;
})
    .attr("height", function (d) {
    console.log("height" , d.rs_id);
    return d.dy - 1;
})
    .style("fill", function (d) {
      // if (d.className === 1) {
      //   return enduranceColor(d.value);
      // }
      // if (d.className == "power") {
      //   return powerColor(d.value);
      // }
      // if (d.className == "metabolism") {
      //   return metabolismColor(d.value);
      // }
      // if (d.className == "recovery") {
      //   return recoveryColor(d.value);
      // }
    
    return "#C0C0C0";
});

cell.append("svg:text")
    .attr("x", function (d) {
    return d.dx / 2;
})
    .attr("y", function (d) {
    return d.dy / 2;
})
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function (d) {
    return d.key;
})
    .style("opacity", function (d) {
    d.w = this.getComputedTextLength();
    return d.dx > d.w ? 1 : 0;
});

d3.select(window).on("click", function () {
    zoom(root);
});

d3.select("select").on("change", function () {
    treemap.value(this.value == "size" ? size : count).nodes(root);
    zoom(node);
});


});



// console.log(geneticData);

function size(d) {
    return d.variant_score;
}

function count(d) {
    return 1;
}

function zoom(d) {
    var kx = w / d.dx,
        ky = h / d.dy;
    x.domain([d.x, d.x + d.dx]);
    y.domain([d.y, d.y + d.dy]);

    var t = svg.selectAll("g.cell").transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .attr("transform", function (d) {
        return "translate(" + x(d.x) + "," + y(d.y) + ")";
    });

    t.select("rect")
        .attr("width", function (d) {
        return kx * d.dx - 1;
    })
        .attr("height", function (d) {
        return ky * d.dy - 1;
    })

    t.select("text")
        .attr("x", function (d) {
        return kx * d.dx / 2;
    })
        .attr("y", function (d) {
        return ky * d.dy / 2;
    })
        .style("opacity", function (d) {
        return kx * d.dx > d.w ? 1 : 0;
    });

    node = d;
    d3.event.stopPropagation();
}
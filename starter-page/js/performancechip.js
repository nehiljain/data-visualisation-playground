//weight is mapped to size in d3js


var geneticData = {
 "name": "Performance",
 "type": "root", 
 "children": [
  {
   "name": "Endurance",
   "type": "category",
   "linkcolor": "#00a65a",
   "className" : "endurance",
   "children": [
    {
     "name": "Heart Capacity",
     "type": "phenotype",
     "linkcolor": "#00a65a",
     "className" : "endurance",
     "children": [
      {
        "name": "snp112341",
        "type": "snp",
        "linkcolor": "#00a65a",
        "className" : "endurance", 
        "value": 0,
        "size": 8
      },
      {
        "name": "snp24234", 
        "type": "snp",
        "linkcolor": "#00a65a",
        "className" : "endurance", 
        "value": 1,
        "size": 4
      },
      {
        "name": "snp35243", 
        "type": "snp",
        "linkcolor": "#00a65a",
        "className" : "endurance", 
        "value": 2,
        "size": 9
      },
      {
        "name": "snp35243", 
        "type": "snp",
        "linkcolor": "#00a65a",
        "className" : "endurance", 
        "value": 2,
        "size": 9
      }
     ]
    },
    {
     "name": "Endurance",
     "type": "phenotype",
     "linkcolor": "#00a65a",
     "className" : "endurance",
     "children": [
      {
        "name": "snp673654",
        "type": "snp",
        "linkcolor": "#00a65a",
        "className" : "endurance", 
        "value": 2,
        "size": 2
      },
      {
        "name": "snp263462", 
        "type": "snp",
        "linkcolor": "#00a65a",
        "className" : "endurance", 
        "value": 2,
        "size": 4
      },
      {
        "name": "snp37777", 
        "type": "snp",
        "linkcolor": "#00a65a",
        "className" : "endurance", 
        "value": 1,
        "size": 9
      },
      {
        "name": "snp35243", 
        "type": "snp",
        "linkcolor": "#00a65a",
        "className" : "endurance", 
        "value": 2,
        "size": 9
      }
     ]
    }
   ]
  }
 ]
};


var w = 1280 - 80,
    h = 800 - 180,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h]),
    color = d3.scale.category20c(),
    root,
    node;

var treemap = d3.layout.treemap()
    .round(false)
    .size([w, h])
    .sticky(true)
    .value(function (d) {
    return d.size;
});

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
    return !d.children;
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
    return d.dy - 1;
})
    .style("fill", function (d) {
    return color(d.parent.name);
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
    return d.name;
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

function size(d) {
    return d.size;
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
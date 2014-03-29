/** 
Variable description

name is name

class is what category/class of node is it

type is intuitive-category, phenotype or variant/snp

linkcolor is the color of the link/path

value is mainly for snp to have values like 0,1,2 corresponding to no allele, 1 and 2 alleles

weight is out of 10. It might be the rank or the weight of the snp or phenptype or category

**/

var geneticData = {
 "name": "Performance",
 "type": "root", 
 "children": [
  {
   "name": "Endurance",
   "type": "category",
   "linkcolor": "red",
   "class" : "endurance",
   "children": [
    {
     "name": "Heart Capacity",
     "type": "phenotype",
     "linkcolor": "red",
     "class" : "endurance",
     "children": [
      {
        "name": "snp112341",
        "type": "snp",
        "linkcolor": "red",
        "class" : "endurance", 
        "value": 0,
        "weight": 8,
      },
      {
        "name": "snp24234", 
        "type": "snp",
        "linkcolor": "red",
        "class" : "endurance", 
        "value": 1,
        "weight": 4,
      },
      {
        "name": "snp35243", 
        "type": "snp",
        "linkcolor": "red",
        "class" : "endurance", 
        "value": 2,
        "weight": 9,
      },
      
     ]
    },
    {
     "name": "Endurance",
     "type": "phenotype",
     "linkcolor": "red",
     "class" : "endurance",
     "children": [
      {
        "name": "snp673654",
        "type": "snp",
        "linkcolor": "red",
        "class" : "endurance", 
        "value": 2,
        "weight": 2,
      },
      {
        "name": "snp263462", 
        "type": "snp",
        "linkcolor": "red",
        "class" : "endurance", 
        "value": 2,
        "weight": 4,
      },
      {
        "name": "snp37777", 
        "type": "snp",
        "linkcolor": "red",
        "class" : "endurance", 
        "value": 1,
        "weight": 9,
      },
     ]
    }
   ]
  },
  {
   "name": "Power",
   "type": "category",
   "linkcolor": "green",
   "class" : "power",
   "children": [
    {
     "name": "Strength",
     "type": "phenotype",
     "linkcolor": "green",
     "class" : "power",
     "children": [
      {
        "name": "snp112341",
        "type": "snp",
        "linkcolor": "green",
        "class" : "power", 
        "value": 0,
        "weight": 8,
      },
      {
        "name": "snp24234", 
        "type": "snp",
        "linkcolor": "green",
        "class" : "power", 
        "value": 1,
        "weight": 4,
      },
      {
        "name": "snp35243", 
        "type": "snp",
        "linkcolor": "green",
        "class" : "power", 
        "value": 2,
        "weight": 9,
      },
      
     ]
    },
    {
     "name": "Power Capacity",
     "type": "phenotype",
     "linkcolor": "green",
     "class" : "power",
     "children": [
      {
        "name": "snp673654",
        "type": "snp",
        "linkcolor": "green",
        "class" : "power", 
        "value": 2,
        "weight": 2,
      },
      {
        "name": "snp263462", 
        "type": "snp",
        "linkcolor": "green",
        "class" : "power", 
        "value": 2,
        "weight": 4,
      },
      {
        "name": "snp37777", 
        "type": "snp",
        "linkcolor": "green",
        "class" : "power", 
        "value": 1,
        "weight": 9,
      },
     ]
    }
   ]
  }
 ]
};
var colors = ["#D5252F", "#E96B38", "#F47337", "#B02D5D", "#9B2C67", "#982B9A", "#692DA7", "#5725AA", "#4823AF"];



    var i = 0,
        duration = 750,
        heightOfVizContainer = 400,
        widthOfVizContainer = 480,
        horizontalSpacingConstant = 100,
        root,
        maxDepth = 3; //global variable to hold the tree layout data 

    var margin = {
        top: 20,
        right: 120,
        bottom: 20,
        left: 120
    },
    width = widthOfVizContainer - margin.right - margin.left,
        height = heightOfVizContainer - margin.top - margin.bottom;


var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    return [d.y, d.x];
});

var svg = d3.select(".viz").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = geneticData; //assigning the section of the data to start the tree with.
  root.x0 = height / 2;
  root.y0 = 0;

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }
// to collapse the whole tree to first level uncomment the following.
  // root.children.forEach(collapse);
  update(root);
//@nehil why?
var nodes = tree.nodes(root).reverse();
//@nehil why?console.
d3.select(self.frameElement).style("height", heightOfVizContainer + "px");

//The update function draws oru tree by doing an array of things
function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    //trying to calculate the horizontal spacing
    nodes.forEach(function (d) {
        d.y = d.depth * horizontalSpacingConstant;

    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });
    console.log("node",node);
    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
        .on("click", click);

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });

    nodeEnter.append("text")
        .attr("x", function (d) {
        return d.children || d._children ? -10 : 10;
    })
        .attr("dy", ".35em")
        .attr("text-anchor", function (d) {
            //places the text in the left is the node has children and right if not
        return d.children || d._children ? "end" : "start";
    })
        .text(function (d) {
        return d.name;
    })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
    });

    nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + source.y + "," + source.x + ")";
    })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function (d) {
        return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("class", function(d) {  
          return d.target.class;
        })
        .style('stroke-opacity', function(d) {
          console.log(d.source.depth+1);
          return ((1/maxDepth) * (d.source.depth+1));
        })
        .attr("d", function (d) {
            console.log(d);
            var o = {
            x: source.x0,
            y: source.y0
        };
        return diagonal({
            source: o,
            target: o
        });
    });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
        var o = {
            x: source.x,
            y: source.y
        };
        return diagonal({
            source: o,
            target: o
        });
    })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

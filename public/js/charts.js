// let the editor know that `Chart` is defined by some code
// included in another file (in this case, `index.html`)
// Note: the code will still work without this line, but without it you
// will see an error in the editor
/* globals Chart, randomColor */
let bar = document.getElementById("barChart").getContext("2d");
let pie = document.getElementById("pieChart").getContext("2d");
let line = document.getElementById("lineChart").getContext("2d");
let density = document.getElementById("densityChart").getContext("2d");

//get some data that I formatted from AirTable in server.js
fetch("/union_data/")
  .then(res => res.json())
  .then(resJson => {
    if (resJson.error) {
      console.log(resJson);
    } else {
      makeBarChart(bar, resJson);
      makePie(pie, resJson);
      console.log(resJson);
    }
    return Promise.resolve();
  });

fetch("/density_over_time/")
  .then(res => res.json())
  .then(resJson => {
    if (resJson.error) {
      console.log(resJson);
    } else {
      makeLineChart(line, resJson, "union_members", "Union Members Over Time");
      makeLineChart(density, resJson, "density", "Union Density Over Time");
      console.log(resJson);
    }
    return Promise.resolve();
  });

function makeLineChart(dom, data, field, label) {
  records = data["records"];
  let output = {};
  records.forEach(record => {
    output[record["fields"]["Date"]] = record["fields"][field];
  });

  let lineChart = new Chart(dom, {
    type: "line",
    data: {
      labels: Object.keys(output),
      datasets: [
        {
          label: label,
          data: Object.values(output), // use the array of clothing to draw bars

          borderColor: "#000", //
          borderWidth: 1 // set the border width to 1 pixel
        }
      ]
    },
    options: {
      // the y-axis should start at 0
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              autoSkip: true,
              fontSize: 10
            }
          }
        ]
      }
    }
  });
}

function makeBarChart(dom, data) {
  let records = data["records"].slice(0, 12);
  let output = {};
  records.forEach(record => {
    output[record["fields"]["name"]] = record["fields"]["member_count"];
  });

  let barChart = new Chart(dom, {
    type: "bar", // make it a bar chart
    data: {
      labels: Object.keys(output), // use the array of colors as labels
      datasets: [
        {
          data: Object.values(output), // use the array of clothing to draw bars
          backgroundColor: randomColorLabels(Object.keys(output)), // make the bars my pretty colors
          borderColor: "#000", //
          borderWidth: 1 // set the border width to 1 pixel
        }
      ]
    },

    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Union Members in SDSA By Union"
      },

      // the y-axis should start at 0
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              fontSize: 10
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              fontSize: 10
            }
          }
        ]
      }
    }
  });
}

// initialize a chart and put it in the 'pieChart' div
function makePie(dom, data) {
  let output = {};
  var records = data["records"];
  records.forEach(record => {
    var fields = record["fields"];
    var sector = fields["sector"];
    var count = fields["member_count"];

    if (output[sector]) {
      output[sector] = output[sector] + count;
    } else {
      output[sector] = count;
    }
  });

  let colorLabels = randomColorLabels(Object.keys(output));

  let pieChart = new Chart(dom, {
    type: "pie", // make it a pie chart
    data: {
      labels: Object.keys(output), // use the array of continents to label each
      datasets: [
        {
          data: Object.values(output), // use the array of clothing to draw pie slices
          // set each pie slice to a pretty color
          backgroundColor: colorLabels,
          // set the border of each pie slice to the same color as the background
          // of the slice but opaque
          borderColor: colorLabels,
          borderWidth: 1 // set border width to 1 pixel
        }
      ]
    },
    options: {
      legend: {
        display: false
      },

      title: {
        display: true,
        text: "Union Members by Sector"
      }
    }
  });
}

// other data
const defunct = {
  fit: 45,
  style: 28,
  sweaty: 6,
  "wore out": 41,
  care: 6,
  lost: 2
};
const capsules = {
  victoriana: 28,
  "80s": 15,
  minimalist: 61,
  boho: 25,
  retro: 13
};
const total = { own: 142, rid: 128 };

//functions for making cool colors

// this takes colors from randomColor based on the name of the color
// it doesn't really work for black/white/grey/brown so I had to write this function
// see https://randomcolor.lllllllllllllllll.com/
function myPrettyColors(colorArray) {
  let prettyPalette = colorArray.map(function(color) {
    let newColor = "";
    switch (color) {
      case "black":
        newColor = "rgb(35, 35, 35)";
        break;
      case "white":
        newColor = "rgb(242, 242, 242)";
        break;
      case "grey":
        newColor = "rgb(170, 170, 170)";
        break;
      case "brown":
        newColor = "rgb(86, 56, 47)";
        break;
      default:
        newColor = randomColor({ hue: color, luminosity: "dark" });
    }

    return newColor;
  });

  return prettyPalette;
}

function randomColorLabels(labels) {
  let prettyPalette = labels.map(function(color) {
    return randomColor({ luminosity: "dark" });
  });
  return prettyPalette;
}

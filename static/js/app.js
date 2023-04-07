// set url
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Initialize the page
function init() {

// Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

// Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
    console.log(data);

// For loop to iterate through names
// Dropdown Menu    
let names = data.names
    for (let i = 0; i < names.length; i++){
      //console.log(countries[names[i]])
      dropdownMenu.append("option").text(names[i]).property("value", names[i]);
  }

  table(names[0])
  charts(names[0])

  });
}

function optionChanged(sampleId) {
  table(sampleId)
  charts(sampleId)
}

// Demographic Info Table using Metadata
function table(sampleId) {

  let demoInfo = d3.select("#sample-metadata");

  // Fetch the JSON data and console log it
  d3.json(url).then(function(data) {
    console.log(data);

let metadata = data.metadata
let metaResult = metadata.filter(x => x.id == sampleId)[0];
demoInfo.html("")

Object.entries(metaResult).forEach(entry => {
  const [key, value] = entry;
  console.log(key, value);
  demoInfo.append("h5").text(`${key}: ${value}`)

});
  });
}

function charts(sampleId) {

  // Fetch the JSON data and console log it
  d3.json(url).then(function(data) {
    console.log(data);

let samples = data.samples
let sample = samples.filter(x => x.id == sampleId)[0];

sample_values = sample.sample_values

otu_ids = sample.otu_ids

otu_labels = sample.otu_labels

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
var bar_trace = [{
  x: sample_values.slice(0, 10).reverse(),

  y: otu_ids.slice(0, 10).map(x =>`OTU ${x}`).reverse(),
  text: otu_labels.slice(0, 10).reverse(),
  orientation: 'h',
 
  type: 'bar'
}];

//Create a bubble chart that displays each sample
var bar_layout = {
  title: 'Top 10 OTUs',
};

Plotly.newPlot('bar', bar_trace, bar_layout);

var bubble_trace = [{
  x: otu_ids,
  y: sample_values,
  text: otu_labels,
  mode: 'markers',
  marker: {
    color: otu_ids,
    colorscale: 'Earth',
    size: sample_values,
  }
}];

var bubble_layout = {
  title: 'OTU ID',
};

Plotly.newPlot('bubble', bubble_trace,  bubble_layout);

  });
}

init()
//read in json file
function buildData(sample){
    d3.json("samples.json").then ((data)=>{
        var metaData = data.metaData;
        //filter for obj with requested sample id
        var wantedArray = metaData.filter(obj => obj.id == sample);
        var result = wantedArray[0];
        //select the panel "#sample-metadata"
        var panel = d3.select("#sample-metadata");

        //clear existing metadata with .html
        panel.html("");

        //append key value pairs to the panel (object.entries) with a for each loop
        Object.entries(result).forEach(([key,value])=>{
            panel.append("h4").text(`${key}:${value}`);
        });

    });
}
//build charts
function buildCharts(sample){
    d3.json("samples.json").then((data)=>{
        var samples = data.samples;
        var wantedArray = samples.filter(obj => obj.id == sample);
        var result = wantedArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values =result.sample_values;

    //bar chart
    var yticks = otu_ids.slice(0,10).map( id =>`OTU ${id}`).reverse(); 
    var barData =[{
        y:yticks,
        x:sample_values.slice(0,10).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type:"bar",
        orientation: "h"
    }];
    var barLayout ={
        title:"Greatest Quanities of Bacteria Cultures Found",
        margin: {t:50, l:150}
    }
    //plot bar chart
    Plotly.newPlot("bar", barData, barLayout)
    //bubble chart
    var bubbleData =[{
        
        x:otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker:{
            size: sample_values,
            color: otu_ids,
            colorscale: "Picnic" //found at https://plotly.com/javascript/colorscales/#picnic-colorscale 
        }
    }];
    var bubbleLayout ={
        title:"Cultures Per Sample",
        margin: {t:50},
        hovermode: "closest",
        xaxis:{title:"OTU ID"},
        };

    //plot bubble chart with plotly
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    });
}
function init(){
    //dropdown selector
    var selector = d3.selectAll("#selDataset");
    //dropdown options
    d3.json("samples.json").then((data)=>{
        var sNames = data.names;

        sNames.forEach((sample)=>{
            selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });

        //build default plots
        var sample1 = sNames[0];
        buildCharts(sample1);
        buildData(sample1);
    });
    

}

//get new data each time select different sample
function changePlot(changedSample){
    buildCharts(changedSample);
    buildData(changedSample);
}

//init app

init();
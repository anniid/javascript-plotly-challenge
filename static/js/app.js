//read in json file
function buildData(sample){
    d3.json("samples.json").then ((data)=>{
        var metaData = data.metaData;
        //filter for obj with requested sample id


        //select the panel "#sample-metadata"


        //clear existing metadata with .html


        //append key value pairs to the panel (object.entries) with a for each loop


    });
}
//build charts
function buildCharts(sample){
    d3.json("samples.json").then((data)=>{

    })
}
    //bubble chart


//plot bubble charts with plotly


//bar chart


//plot bar chart


function init(){
    //dropdown selector

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
var rowConverter = function(d) {
    return {
        label: d["Province/State"] + "-" + d["Country/Region"],
        day: parseInt(d["1/22/20"])
    }
  }
  d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv", rowConverter, function(error, data) {
    if (error) {
    console.log(error);
    }
    else {
        console.log(data);
      var dataset = data.filter(d => d.day >0);
      var margin = {top: 20, right: 20, bottom: 50, left: 120};
      var width = 1200 - margin.left - margin.right;
      var height = 600 - margin.top - margin.bottom;
  

      // set the ranges
      var yScale = d3.scaleBand()
            .range([height, 0])
            .padding(0.1)
            .domain(dataset.map(function(d) { return d.label; }));
            
      var xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(dataset, function(d){ return d.day; })]);
      
      var svg = d3.select("body")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top  + ")");

          svg.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("width", function(d) { return xScale(d.day); })
          .attr("y", function(d) { return yScale(d.label); })
          .attr("height", yScale.bandwidth() )
          .attr("fill", "lightseagreen")
          //label number on bar chart
          svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class", "textlabel")
            .style("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("x", function(d){ return xScale(d.day) - 114;  })
            .attr("y", function(d){ return yScale(d.label) - 10; })
            .text(function(d){ return (d.day); });
          //xaxis
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
          //yaxis    
          svg.append("g")
            .call(d3.axisLeft(yScale))
          //title for the xaxis
          svg.append("text")
          .attr("x", width - 450 )
          .attr("y", height + margin.top + 15)
          .text("COVID confirmed cases")
          .attr("text-anchor","end")
          .attr("font-family", "sans-serif")
          .attr("font-weight", "bold")
          .attr("font-size", "15px") 
          .attr("fill","lightseagreen");
          //title for the yaxis
          svg.append("text")
              .attr("transform","rotate(-90)")
              .attr("x", - margin.left - 110)
              .attr("y", - margin.top - 70)
              .attr("text-anchor","end")
              .text("Province-Country")
              .attr("font-family", "sans-serif")
              .attr("font-size", "15px") 
              .attr("font-weight", "bold")
              .attr("fill","lightseagreen"); 

}
})

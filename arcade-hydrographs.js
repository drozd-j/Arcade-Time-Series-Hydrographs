// date calculations
var currDate = Now()
var oneDay = DateAdd(currDate, -24, "hours")
var sevDays = DateAdd(currDate, -7, "days")
var thirDays = DateAdd(currDate, -30, "days")

// create empty dictionary + arrays for all charts
var attributess = {};
var oneFieldInfos = [];
var sevFieldInfos = [];
var thirFieldInfos = [];

// create fs for gages
// Gage_Readings = related table containing height readings for all gages in HFL
var fs = FeatureSetByRelationshipName($feature, "Gage_Readings");
var oneFs = Filter(fs, 'Time >= @oneDay')
var sevFs = Filter(fs, 'Time >= @sevDays')
var thirFs = Filter(fs, 'Time >= @thirDays')

// iterate through gages, pull stage and time, and create an associated fieldInfo to include it in the table

//////////////// past day

for (var item in oneFs) {

  var oneFlow = item["Stage_ft"];
  var oneTimex = Text(item["Time"], "M/DD/YYYY h:mm A");
  attributess[oneTimex] = oneFlow;
  Push(oneFieldInfos, oneTimex)
}

//////////////// 

//////////////// past seven days

for (var item in sevFs) {

  var sevFlow = item["Stage_ft"];
  var sevTimex = Text(item["Time"], "M/DD/YYYY h:mm A");
  attributess[sevTimex] = sevFlow;
  Push(sevFieldInfos, sevTimex)
}

//////////////// 

//////////////// past thirty days

for (var item in thirFs) {

  var thirFlow = item["Stage_ft"];
  var thirTimex = Text(item["Time"], "M/DD/YYYY h:mm A");
  attributess[thirTimex] = thirFlow;
  Push(thirFieldInfos, thirTimex)
}

////////////////

If (!IsEmpty(thirFlow)){
return {
  type: "media",
  attributes: attributess,
  title: "",
  mediaInfos: [
    {
      type: "linechart",
      altText: "Recorded height in feet over the last 24 hours.",
      title: "<p style='color:#2C486B;font-weight:300;margin:8px'>Last 24 Hours</p>",
      value: {
        fields: oneFieldInfos,
        "colors": [
          [
            44,
            72,
            107
          ]
        ]
      }
    },
    {
      type: "linechart",
      altText: "Recorded height in feet over the last 7 days.",
      title: "<p style='color:#2C486B;font-weight:300;margin:8px'>Last 7 Days</p>",
      value: {
        fields: sevFieldInfos,
        "colors": [
          [
            44,
            72,
            107
          ]
        ]
      }
    },
    {
      type: "linechart",
      altText: "Recorded height in feet over the last 30 days.",
      title: "<p style='color:#2C486B;font-weight:300;margin:8px'>Last 30 Days</p>",
      value: {
        fields: thirFieldInfos,
        "colors": [
          [
            44,
            72,
            107
          ]
        ]
      }
    }
  ]
}}
else {
  return ("")
}



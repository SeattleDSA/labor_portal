module.exports = {
  formatData: formatData
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Grouping_objects_by_a_property

function groupBy(objectArray, property) {
  return objectArray.reduce(function(acc, obj) {
    var key = obj["fields"][property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function formatData(data) {
  let records = data;
  console.log(records);
  let groupedClothing = groupBy(records, "Color");
  let niceResponse = {};
  for (let color in groupedClothing) {
    niceResponse[color] = groupedClothing[color].length;
  }
  return niceResponse;
}
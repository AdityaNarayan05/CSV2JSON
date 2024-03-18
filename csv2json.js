(function () {
  // Array of potential separators for CSV data
  var separators = [",", ";", "\t"];

  // Function to detect the most commonly used separator in the CSV data
  function detectSeparator(csv) {
    var counts = {},
      sepMax;
    separators.forEach(function (sep, i) {
      var re = new RegExp(sep, 'g');
      counts[sep] = (csv.match(re) || []).length;
      sepMax = !sepMax || counts[sep] > counts[sepMax] ? sep : sepMax;
    });
    return sepMax;
  }

  // Function to convert CSV data to JSON format
  function convert(csv) {
    var separator = detectSeparator(csv);
    if (!separator) throw "We could not detect the separator.";

    var rows = csv.split('\n').map(row => row.split(separator));
    var keys = rows.shift().map(key => key.trim());
    if (keys.length == 0) throw "Could not detect header.";

    var json = [];
    for (var row of rows) {
      var obj = {};
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = row[i] ? row[i].trim() : '';
        if (key.includes('.')) {
          var nestedKeys = key.split('.');
          var nestedObj = obj;
          for (var j = 0; j < nestedKeys.length - 1; j++) {
            var nestedKey = nestedKeys[j];
            nestedObj[nestedKey] = nestedObj[nestedKey] || {};
            nestedObj = nestedObj[nestedKey];
          }
          nestedObj[nestedKeys[nestedKeys.length - 1]] = value;
        } else {
          obj[key] = value;
        }
      }
      json.push(obj);
    }

    return json;
  };

  // Export the convert function for Node.js environment
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = convert;
    }
    exports.csv2json = convert;
  } else {
    // Export the convert function for browser environment
    this.CSVJSON || (this.CSVJSON = {});
    this.CSVJSON.csv2json = convert;
  }

}).call(this);
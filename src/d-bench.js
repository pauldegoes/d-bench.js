/*
  Copyright (c) <2011> <Paul M. De Goes : pauldegoes@hotmail.com>

  Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
*/

function DBench(name) {
	name    = name || "unknown";

	var start   = now(),
      end     = null,
      marks   = [],
      running = true,
      total   = null,
      klass   = "DBench";

  function DBReport(jsonArray) {
    return {
      json : jsonArray,
      toString : function() {
        var result = [];
        for (var i=0; i < jsonArray.length; i++) {
          var json = jsonArray[i];
          result.push("[" + klass + "][" + json.name + "]" + " completed in " + withSeconds(json.seconds) + " (" + json.percentage  + "%)");
        }
        return result;
      }
    };
  }

  function mark(s, f) {
    var start = now();
    f();
    marks.push({name : s, start : start, end : now()});
  }

  function normalizedMarks() {
    var result = [];
    for (var i=0; i < marks.length; i++) {
      var mark      = marks[i],
          markDiff  = difference(mark.start, mark.end);

      result.push({name : mark.name, seconds : markDiff, percentage : Math.round((markDiff / total) * 100) });
    }
    return result;
  }

  function stopBench() { if (running) { running = false; end = now(); total = difference(start, end); } }

  function difference(lesser, greater) { return ((greater - lesser) / (1000)); }

  function withSeconds(s) { return s + " seconds"; }

	function now() { return new Date().getTime(); }

  function report() {
    stopBench();
    return {
      name : "[" + klass + "]" + "[" + name + "]",
      total : DBReport([{name : "total", seconds : total, percentage : 100 }]),
      marks : DBReport(normalizedMarks())
    };
  }

  return {
    stop    : stopBench,
    report  : report,
    mark    : mark,
    name    : name
  };
}
function DBench(name) {
  var start   = now(),
      end     = null,
      name    = name || "unknown",
      marks   = [],
      running = true,
      total   = null,
      klass   = "DBench";

  function now() { return new Date().getTime(); }

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

      result.push("[" + klass + "][" + mark.name + "]" + " completed in " + seconds(markDiff) + " (" + Math.round((markDiff / total) * 100) + "%)");
    }
    return result;
  }

  function stopBench() { if (running) { running = false; end = now(); total = difference(start, end); } }


  function difference(lesser, greater) {
    return ((greater - lesser) / (1000));
  }
  function seconds(s) {
    return s + " seconds"
  }

  function report() {
    stopBench();
    return {
      name : "[" + klass + "]" + "[" + name + "]",
      total : seconds(total),
      marks : normalizedMarks()
    }
  }
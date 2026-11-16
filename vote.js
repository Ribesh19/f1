/* Live voting, shared by the lecture page (index.html) and the phone page (v/index.html).
   The key below is a publishable key: it can only call the four functions used here.
   If the service cannot be reached, every call resolves to null and the pages carry on without it. */
window.PPVote = (function () {
  'use strict';
  var API = 'https://cgvfqtygmiqdqtmfhqxd.supabase.co/rest/v1/rpc/';
  var KEY = 'sb_publishable_S8OivP16rcLBX6HvDnjh6Q_BdyGdlAJ';
  var SHORT = 'ribesh19.github.io/f1';
  var CHARTS = [['A', 'A  Bar chart'], ['B', 'B  Column chart'], ['C', 'C  Line chart'], ['D', 'D  Donut chart'], ['E', 'E  Table'], ['F', 'F  Treemap']];
  var FOUND = [['48', '48%'], ['55', '55%'], ['64', '64%'], ['88', '88%'], ['x', 'I could not find it']];
  var STEPS = [];
  for (var g = 0; g <= 100; g += 5) STEPS.push([String(g), g + '%']);
  // id: question, options as [key, label]. The keys must match the pp_polls table.
  var POLLS = {
    warm: { q: 'Have you used Power BI before?', o: [['never', 'Never'], ['little', 'A little'], ['often', 'Regularly']] },
    guess: { q: 'In the 1980s, how many F1 cars that started a race finished it?', type: 'slider', o: STEPS },
    find1: { q: 'From the plain report: how many F1 cars finish the race today?', o: FOUND },
    find2: { q: 'From the designed report: how many F1 cars finish the race today?', o: FOUND },
    chart1: { q: 'Who has won the most races? Pick the chart that answers it fastest.', o: CHARTS },
    chart2: { q: 'Has Formula 1 become more reliable? Pick the chart.', o: CHARTS },
    chart3: { q: 'How many races did Alain Prost win? Pick the chart.', o: CHARTS },
    steal: { q: 'Which of these will you use first?', o: [['theme', 'Theme files'], ['background', 'Canvas backgrounds'], ['bookmark', 'Bookmarks'],
      ['tooltip', 'Report page tooltips'], ['title', 'Dynamic titles'], ['colour', 'Colour by measure'], ['play', 'Play axis'], ['drill', 'Drill-through']] },
    colour: { q: 'Three bar charts, same numbers. Which shows who leads fastest?', o: [['A', 'A  A colour for every bar'], ['B', 'B  Every bar red'], ['C', 'C  Grey, the leader in red']] },
    title: { q: 'Same chart, four titles. Which would you ship?', o: [['A', 'A  Finish Rate by Decade'], ['B', 'B  F1 Reliability Analysis Overview'],
      ['C', 'C  Nine in ten cars now finish, up from half in the 1980s'], ['D', 'D  Is F1 more reliable?']] },
    trap: { q: 'The 2020s bar looks nearly three times as tall. What is going on?', o: [['A', 'A  Reliability nearly tripled'], ['B', 'B  The axis does not start at zero'],
      ['C', 'C  The data is wrong'], ['D', 'D  Nothing: it is a fair chart']] }
  };

  function rpc(fn, args) {
    var ctl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 7000);
    return fetch(API + fn, {
      method: 'POST', headers: { apikey: KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(args || {}), signal: ctl ? ctl.signal : undefined, cache: 'no-store'
    }).then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (v) { clearTimeout(timer); return v; });
  }

  return {
    POLLS: POLLS, SHORT: SHORT,
    get: function () { return rpc('pp_get'); },
    vote: function (poll, voter, choice) { return rpc('pp_vote', { p_poll: poll, p_voter: voter, p_choice: choice }); },
    tally: function (poll) { return rpc('pp_tally', { p_poll: poll }); },
    host: function (pin, action, poll) { return rpc('pp_host', { p_pin: pin, p_action: action, p_poll: poll || null }); }
  };
})();

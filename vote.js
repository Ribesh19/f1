/* Live voting, shared by the lecture page (index.html) and the phone page (v/index.html).
   The key below is a publishable key: it can only call the four functions used here.
   If the service cannot be reached, every call resolves to null and the pages carry on without it. */
window.PPVote = (function () {
  'use strict';
  var API = 'https://cgvfqtygmiqdqtmfhqxd.supabase.co/rest/v1/rpc/';
  var KEY = 'sb_publishable_S8OivP16rcLBX6HvDnjh6Q_BdyGdlAJ';
  var SHORT = 'ribesh19.github.io/f1';
  var CHARTS = [['A', 'A  Bar chart'], ['B', 'B  Column chart'], ['C', 'C  Line chart'], ['D', 'D  Donut chart'], ['E', 'E  Table'], ['F', 'F  Treemap']];
  var FOUND = [['yes', 'Yes, I found it'], ['no', 'No, not in time']];
  // id: question, options as [key, label]. The keys must match the pp_polls table.
  var POLLS = {
    warm: { q: 'Have you used Power BI before?', o: [['never', 'Never'], ['little', 'A little'], ['often', 'Regularly']] },
    guess: { q: 'In the 1980s, how many F1 cars that started a race finished it?', o: [['a', 'Under 40%'], ['b', '40 to 59%'], ['c', '60 to 79%'], ['d', '80% or more']] },
    find1: { q: 'The plain report: did you find how many cars finish today?', o: FOUND },
    find2: { q: 'The designed report: did you find how many cars finish today?', o: FOUND },
    chart1: { q: 'Who has won the most races? Pick the chart that answers it fastest.', o: CHARTS },
    chart2: { q: 'Has Formula 1 become more reliable? Pick the chart.', o: CHARTS },
    chart3: { q: 'How many races did Alain Prost win? Pick the chart.', o: CHARTS },
    steal: { q: 'Which of these will you use first?', o: [['theme', 'Theme files'], ['background', 'Canvas backgrounds'], ['bookmark', 'Bookmarks'],
      ['tooltip', 'Report page tooltips'], ['title', 'Dynamic titles'], ['colour', 'Colour by measure'], ['play', 'Play axis'], ['drill', 'Drill-through']] }
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

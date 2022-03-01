const sessions = require('../src/Sessions/index.json');

let results = {};
sessions.sessions.forEach((s) => {
  const session = require(`../src/Sessions/${s}`);
  results[session.t] = [];
  session.sections.forEach((section) => {
    if (section && section.payload && section.payload.video) {
      results[session.t].push({
        type: 'video',
        key: section.payload.video,
      });
    }

    if (section.parts) {
      section.parts.forEach((part) => {
        if (part && part.payload && part.payload.video) {
          results[session.t].push({
            type: 'video',
            key: part.payload.video,
          });
        }
      });
    }
  });
});

console.log(JSON.stringify(results));

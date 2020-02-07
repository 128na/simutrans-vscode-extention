const { snippets, extractDat, output } = require('./services');

const dats = extractDat(snippets).join("\n---\n");
output(dats, 'example.dat')

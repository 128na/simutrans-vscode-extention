const { snippets, extractDefinedKeys, output } = require('./services');

const keys = extractDefinedKeys(snippets);

output(keys.join("|"), 'defined_keys.txt');


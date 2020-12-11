#!/usr/bin/env node

import meow from 'meow';
import generator from './generator';

const help = `
  Usage
    $ create-magic-app <input>

  Options
    --version, -v    Show which version of \`create-magic-app\` is currently
                     in use.

    --help, -h       Show help (you're lookin' at it).

  Examples
    $ foo unicorns --rainbow
    🌈 unicorns 🌈
`;

const cli = meow({
  help,

  flags: {
    help: { type: 'boolean', default: false, alias: 'h' },
    version: { type: 'boolean', default: false, alias: 'v' },
  },
});

(async () => {
  if (cli.flags.help) cli.showHelp();
  if (cli.flags.version) cli.showVersion();

  console.log();
  await generator.run();
})();

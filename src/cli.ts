#!/usr/bin/env node

import meow from 'meow';
import execa from 'execa';
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
  console.log();

  // Start running the example app!

  // eslint-disable-next-line
  const isNext = !!require(`${process.cwd()}/package.json`).scripts?.dev;
  await execa.command(`yarn ${isNext ? 'dev' : 'start'}`, { stdio: 'inherit' });
})();

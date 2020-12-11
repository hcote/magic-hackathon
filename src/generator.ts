import { copy, zombi } from 'zombi';
import { resolve } from 'path';

const generator = zombi({
  templateRoot: resolve(__dirname, '..', 'templates'),
  destinationRoot: resolve(__dirname, 'foo'),
});

generator
  .prompt<{ framework: string; database: string; socialLogins: string[] }>([
    {
      name: 'framework',
      message: 'Choose a full-stack framework:',
      type: 'AutoComplete',
      choices: [
        { name: 'express', message: 'Express' },
        { name: 'nextjs', message: 'NextJS' },
      ],
    },

    {
      name: 'database',
      message: 'Choose a database:',
      type: 'Select',
      choices: [
        { name: 'none', message: 'None' },
        { name: 'fauna', message: 'FaunaDB' },
      ],
    },

    {
      name: 'socialLogins',
      message: 'Choose social login providers:',
      type: 'MultiSelect',
      choices: [
        { name: 'google', message: 'Sign in with Google' },
        { name: 'facebook', message: 'Sign in with Facebook' },
        { name: 'github', message: 'Sign in with GitHub' },
      ],
    },
  ])
  .prompt<{ magicPublicKey: string; magicSecretKey: string; faunaSecret?: string }>(({ props }) => [
    {
      name: 'magicPublicKey',
      message: `Paste your Magic public API key:`,
      type: 'Input',
    },

    {
      name: 'magicSecretKey',
      message: `Paste your Magic secret API key:`,
      type: 'Password',
    },

    props.database.includes('fauna') && {
      name: 'faunaSecret',
      message: `Paste your FaunaDB secret:`,
      type: 'Password',
    },
  ])
  .sequence(
    copy(
      ({ props }) =>
        [props.framework, props.database, props.socialLogins.length && 'withsocial'].filter(Boolean).join('-'),
      'my-magic-app',
    ),
  )
  .run();

import { copy, exec, sideEffect, yarnInstall, zombi } from 'zombi';
import { resolve } from 'path';

const generator = zombi({
  name: 'create-magic-app',
  templateRoot: resolve(__dirname, '..', 'templates'),
});

export default generator
  .prompt<{ framework: string; database: string; socialLogins: string[] }>([
    {
      name: 'framework',
      message: 'Choose a full-stack framework:',
      type: 'Select',
      choices: [
        { name: 'react-express', message: 'React + Express' },
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
  .prompt<{ magicPublishableKey: string; magicSecretKey: string; faunaSecretKey?: string }>(({ props }) => [
    {
      name: 'magicPublishableKey',
      message: `Paste your Magic public API key:`,
      type: 'Input',
    },

    {
      name: 'magicSecretKey',
      message: `Paste your Magic secret API key:`,
      type: 'Password',
    },

    props.database.includes('fauna') && {
      name: 'faunaSecretKey',
      message: `Paste your FaunaDB secret:`,
      type: 'Password',
    },
  ])
  .sequence(
    // sideEffect(({ props }) => {
    //   console.log(props);
    //   process.exit(1);
    // }),

    copy(
      ({ props }) =>
        [
          props.framework,
          props.database !== 'none' && props.database,
          props.socialLogins.length ? 'withsocial' : 'emailonly',
        ]
          .filter(Boolean)
          .join('-'),
      '.',
    ),

    yarnInstall(),
    exec('yarn dev'),
  );

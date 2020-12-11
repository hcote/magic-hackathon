import { copy, zombi } from 'zombi';
import { resolve } from 'path';

const generator = zombi({
  templateRoot: resolve(__dirname, '..', 'templates'),
  destinationRoot: resolve(__dirname, 'foo'),
});

generator
  .prompt<{ template: string; bar: string }>([
    {
      name: 'template',
      message: 'Choose a full-stack template:',
      type: 'AutoComplete',
      choices: [
        { name: 'express', message: 'Express' },
        { name: 'express-fauna', message: 'Express + FaunaDB' },
        { name: 'express-typescript', message: 'Express + TypeScript' },

        { name: 'nextjs', message: 'NextJS' },
        { name: 'nextjs-fauna', message: 'NextJS + FaunaDB' },
        { name: 'nextjs-typescript', message: 'NextJS + TypeScript' },

        { name: 'react', message: 'Vanilla React' },
        { name: 'react-typescript', message: 'Vanilla React + TypeScript' },
      ],
    },
  ])
  .prompt<{ magicPublicKey: string; magicSecretKey: string; faunaSecret?: string }>(
    ({ props }) =>
      [
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

        props.template.includes('fauna') && {
          name: 'faunaSecret',
          message: `Paste your FaunaDB secret:`,
          type: 'Password',
        },
      ].filter(Boolean) as any,
  )
  .sequence(
    copy(
      ({ props }) => props.template,
      ({ props }) => `${props.template}-magic-app`,
    ),
  )
  .run();

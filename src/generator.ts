import { zombi } from 'zombi';
import { resolve } from 'path';

interface Props {}

const generator = zombi<Props>({
  templateRoot: resolve(__dirname, '..', 'templates'),
});

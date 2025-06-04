
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { LibSQLStore } from '@mastra/libsql';

import { nikechan } from './agents';

export const mastra = new Mastra({
  agents: { nikechan },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});

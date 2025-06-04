import { Mastra } from '@mastra/core/mastra';
import { ConsoleLogger } from '@mastra/core/logger';
import { nikechan } from './agents';

const logger = new ConsoleLogger({
  name: 'Mastra',
  level: 'info',
});

export const mastra = new Mastra({
  agents: { nikechan },
  logger,
});

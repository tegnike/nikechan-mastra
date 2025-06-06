import { Mastra } from '@mastra/core/mastra';
import { ConsoleLogger } from '@mastra/core/logger';
import { nikechan } from './agents';
import { AISDKExporter } from "langsmith/vercel";

const logger = new ConsoleLogger({
  name: 'Mastra',
  level: 'info',
});

export const mastra = new Mastra({
  agents: { nikechan },
  logger,
  telemetry: {
    serviceName: "your-service-name",
    enabled: true,
    export: {
      type: "custom",
      exporter: new AISDKExporter(),
    },
  },
});

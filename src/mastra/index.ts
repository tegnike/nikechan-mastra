import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { nikechan } from './agents';
import { AISDKExporter } from "langsmith/vercel";

import { CloudflareDeployer } from "@mastra/deployer-cloudflare";

const logger = new PinoLogger({
  name: 'Mastra',
  level: 'debug',
});

export const mastra = new Mastra({
  agents: { nikechan },
  logger,
  telemetry: {
    serviceName: process.env.TELEMETRY_SERVICE_NAME || "your-service-name",
    enabled: true,
    export: {
      type: "custom",
      exporter: new AISDKExporter(),
    },
  },
  deployer: new CloudflareDeployer({
    scope: process.env.CLOUDFLARE_ACCOUNT_ID!,
    projectName: process.env.CLOUDFLARE_PROJECT_NAME!,
    routes: [],
    auth: {
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      apiEmail: process.env.CLOUDFLARE_API_EMAIL!,
    },
  }),
});

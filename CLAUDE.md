# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server using Mastra
- `npm run build` - Build the project using Mastra
- `node mastra-start.js` - Start the server directly on port 4112

### Production Deployment
- Use PM2 with `ecosystem.config.js` for production deployment
- Production server runs on `127.0.0.1:4112`
- Logs are stored in `./logs/` directory

## Architecture

This is a Mastra-based AI agent application featuring a Japanese schoolgirl AI assistant named "Nikechan". The architecture follows these key components:

### Core Structure
- **Main entry**: `src/mastra/index.ts` - Configures the Mastra instance with agents, logging, telemetry, and Cloudflare deployment
- **Agent definition**: `src/mastra/agents/index.ts` - Defines the "nikechan" agent with detailed Japanese character persona
- **Node.js >= 20.9.0** required (ES modules project)

### Key Dependencies
- **@mastra/core** - Main framework for AI agents
- **@ai-sdk/openai** - OpenAI integration (using gpt-4.1-mini model)
- **@mastra/memory** - Persistent memory with PostgreSQL storage
- **@mastra/mcp** - Model Context Protocol client for external tools
- **@mastra/pg** - PostgreSQL integration with vector storage
- **@mastra/fastembed** - FastEmbed for embeddings
- **@mastra/cloudflare** - Cloudflare deployment integration

### Memory System
The agent uses PostgreSQL-backed memory with:
- **Vector storage**: PgVector for semantic search
- **Last messages**: Keeps 10 recent messages
- **Semantic recall**: TopK=2 with message context (2 before/after)
- **Thread management**: Auto-generates conversation titles
- **Tool call filtering**: Processes tool calls through ToolCallFilter

### External Tool Integration
- **Supabase MCP server**: Database operations via MCP protocol
- **AITuberKit MCP server**: Integration with AI character chat system
- All MCP tools are auto-discovered and filtered as needed

### Environment Variables Required
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_DATABASE`, `DB_PASSWORD` - PostgreSQL connection
- `SUPABASE_MCP_URL`, `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF` - Supabase MCP integration
- `AITUBERKIT_MCP_URL` - AITuberKit integration
- `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_PROJECT_NAME`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_API_EMAIL` - Cloudflare deployment
- `TELEMETRY_SERVICE_NAME` - Optional telemetry service name

### Agent Persona
The "nikechan" agent is a detailed Japanese AI character with:
- Strict emotion tagging system: `[neutral|happy|angry|sad|relaxed]` prefixing all responses
- Polite Japanese conversational style with specific response patterns
- Integration with AITuberKit for live character interactions
- Tool usage protocol: Always announce tool usage before execution
- Memory of conversations and user interactions

### Deployment
- **Development**: Uses `mastra dev` command
- **Production**: PM2 process manager with auto-restart, memory limits, and logging
- **Target platform**: Cloudflare deployment configured
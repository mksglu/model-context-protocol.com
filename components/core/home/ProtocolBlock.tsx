import React from 'react';

import { AnimatedSpan, Terminal } from '@/components/magicui/terminal';

const ProtocolBlock = () => {
  return (
    <div className="flex justify-center py-5">
      <Terminal className="w-full max-w-2xl h-[400px] overflow-y-auto">
        <div className="flex flex-col space-y-1">
          <AnimatedSpan delay={1000} className="text-emerald-700">
            $ mcp init --project demo-app
          </AnimatedSpan>
          <AnimatedSpan delay={2000} className="text-slate-700">
            🚀 Initializing new MCP project: demo-app
          </AnimatedSpan>
          <AnimatedSpan delay={3000} className="text-slate-700">
            ✓ Created project structure
          </AnimatedSpan>
          <AnimatedSpan delay={4000} className="text-slate-700">
            ✓ Generated configuration files
          </AnimatedSpan>
          <AnimatedSpan delay={5000} className="text-emerald-700">
            $ mcp connect --list-providers
          </AnimatedSpan>
          <AnimatedSpan delay={6000} className="font-medium text-cyan-700">
            Available AI Providers:
          </AnimatedSpan>
          <AnimatedSpan delay={7000} className="text-slate-700 pl-2">
            ✓ OpenAI - GPT-4, GPT-3.5
          </AnimatedSpan>
          <AnimatedSpan delay={8000} className="text-slate-700 pl-2">
            ✓ Anthropic - Claude, Claude 2
          </AnimatedSpan>
          <AnimatedSpan delay={9000} className="text-slate-700 pl-2">
            ✓ Google - PaLM, Gemini
          </AnimatedSpan>
          <AnimatedSpan delay={10000} className="text-slate-700 pl-2">
            ✓ Mistral - Mixtral, Mistral-7B
          </AnimatedSpan>
          <AnimatedSpan delay={11000} className="text-emerald-700">
            $ mcp config set-provider openai
          </AnimatedSpan>
          <AnimatedSpan delay={12000} className="text-slate-700">
            ✓ Provider set to OpenAI
          </AnimatedSpan>
          <AnimatedSpan delay={13000} className="text-emerald-700">
            $ mcp status
          </AnimatedSpan>
          <AnimatedSpan delay={14000} className="text-amber-700">
            ⚡️ MCP Server: Running on port 3000
          </AnimatedSpan>
          <AnimatedSpan delay={15000} className="text-amber-700">
            🔒 Authentication: Enabled (JWT)
          </AnimatedSpan>
          <AnimatedSpan delay={16000} className="text-amber-700">
            🌐 API Gateway: Ready
          </AnimatedSpan>
          <AnimatedSpan delay={17000} className="text-emerald-700">
            $ mcp test connection
          </AnimatedSpan>
          <AnimatedSpan delay={18000} className="text-slate-700">
            Testing connection to OpenAI...
          </AnimatedSpan>
          <AnimatedSpan delay={19000} className="text-green-600">
            ✓ Connection successful! Latency: 120ms
          </AnimatedSpan>
          <AnimatedSpan delay={20000} className="text-emerald-700">
            $ mcp deploy
          </AnimatedSpan>
          <AnimatedSpan delay={21000} className="text-slate-700">
            Deploying MCP server...
          </AnimatedSpan>
          <AnimatedSpan delay={22000} className="text-slate-700 pl-2">
            ✓ Building container image
          </AnimatedSpan>
          <AnimatedSpan delay={23000} className="text-slate-700 pl-2">
            ✓ Pushing to registry
          </AnimatedSpan>
          <AnimatedSpan delay={24000} className="text-green-600">
            ✓ Deployment successful!
          </AnimatedSpan>
          <AnimatedSpan delay={25000} className="text-emerald-700">
            $ mcp logs --tail
          </AnimatedSpan>
          <AnimatedSpan delay={26000} className="text-blue-600">
            [INFO] Server health check passed
          </AnimatedSpan>
          <AnimatedSpan delay={27000} className="text-blue-600">
            [INFO] Processing requests...
          </AnimatedSpan>
          <AnimatedSpan delay={28000} className="text-emerald-700">
            $ _
          </AnimatedSpan>
        </div>
      </Terminal>
    </div>
  );
};

export default ProtocolBlock;

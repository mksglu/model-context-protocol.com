import { Database, Globe, HelpCircle, Server, Shield } from 'lucide-react';

export const faqs = [
  {
    question: 'What is MCP (Model Context Protocol)?',
    answer:
      'MCP is an open-source protocol developed by Anthropic that enables AI systems like Claude to securely connect with various data sources. It provides a universal standard for AI assistants to access external data, tools, and prompts through a client-server architecture.',
    icon: Globe,
  },
  {
    question: 'What are MCP Servers?',
    answer:
      'MCP Servers are systems that provide context, tools, and prompts to AI clients. They can expose data sources like files, documents, databases, and API integrations, allowing AI assistants to access real-time information in a secure way.',
    icon: Server,
  },
  {
    question: 'How do MCP Servers work?',
    answer:
      'MCP Servers work through a simple client-server architecture. They expose data and tools through a standardized protocol, maintaining secure 1:1 connections with clients inside host applications like Claude Desktop.',
    icon: Database,
  },
  {
    question: 'What can MCP Servers provide?',
    answer:
      'MCP Servers can share resources (files, docs, data), expose tools (API integrations, actions), and provide prompts (templated interactions). They control their own resources and maintain clear system boundaries for security.',
    icon: HelpCircle,
  },
  {
    question: 'How does Claude use MCP?',
    answer:
      'Claude can connect to MCP servers to access external data sources and tools, enhancing its capabilities with real-time information. Currently, this works with local MCP servers, with enterprise remote server support coming soon.',
    icon: Server,
  },
  {
    question: 'Are MCP Servers secure?',
    answer:
      "Yes, security is built into the MCP protocol. Servers control their own resources, there's no need to share API keys with LLM providers, and the system maintains clear boundaries. Each server manages its own authentication and access control.",
    icon: Shield,
  },
  {
    question: 'What is model-context-protocol.com?',
    answer:
      'model-context-protocol.com is a community-driven platform that collects and organizes third-party MCP Servers. It serves as a central directory where users can discover, share, and learn about various MCP Servers available for AI applications.',
    icon: Globe,
  },
  {
    question: 'How can I submit my MCP Server to m-c-p.com?',
    answer:
      "You can submit your MCP Server by creating a new issue in our GitHub repository. Click the 'Submit' button in the navigation bar or visit our GitHub issues page directly. Please provide details about your server including its name, description, features, and connection information.",
    icon: HelpCircle,
  },
];

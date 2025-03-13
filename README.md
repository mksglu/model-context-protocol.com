## Model Context Protocol (MCP)
Live Preview: https://model-context-protocol.com/

![image](https://github.com/user-attachments/assets/be0674fc-99c3-48bb-8d21-03b15f971ab8)

## Project Description

Model Context Protocol is a platform developed to discover and list high-performance MCP servers. As a leading platform for AI model deployment, MCP provides a comprehensive directory of MCP servers offering real-time accessibility, performance metrics, and seamless integration capabilities.

## Technology Stack

- **Frontend**: Next.js 14, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Supabase

## Setup

### Prerequisites

- npm, yarn, pnpm
- Supabase account

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```bash
NEXT_PUBLIC_SITE_URL=https://model-context-protocol.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GITHUB_TOKEN=your_github_token
```

### Development

1. Clone the repository:

   ```bash
   git clone https://github.com/mksglu/model-context-protocol.git
   cd model-context-protocol
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Commands

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run start`: Starts the compiled application
- `npm run lint`: Runs code quality checks
- `npm run format`: Formats the code
- `npm run format:check`: Checks formatting

## Contributing

We welcome your contributions! Please follow these steps before submitting a PR:

1. Create a new branch
2. Make and test your changes
3. Ensure it follows the existing coding style
4. Submit a PR

## Contact

For any questions or feedback, please reach out through [Mert Koseoglu's website](https://mksg.lu/).

------------ First create all tables

-- GitHub Repositories Schema
CREATE TABLE public.github_repos (
    -- Basic GitHub repository information
    id bigint primary key,
    name text not null,
    full_name text not null,
    html_url text not null,
    description text,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    language text,
    stars integer default 0,
    readme text,
    is_mcp boolean default false,
    categories text[],
    ai_analysis text,
    inserted_at timestamp with time zone default (current_timestamp AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Istanbul'),
    is_active boolean default true,
    type text check (type in ('Servers', 'Clients')),
    slug text not null,
    
    -- Constraints
    CONSTRAINT unique_github_repo_id UNIQUE (id),
    CONSTRAINT unique_github_repo_full_name UNIQUE (full_name),
    CONSTRAINT unique_github_repo_slug UNIQUE (slug)
);

-- Clients Schema
CREATE TABLE public.clients (
    -- Basic GitHub repository information
    id bigint primary key,
    name text not null,
    full_name text not null,
    html_url text not null,
    description text,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    language text,
    stars integer default 0,
    readme text,
    categories text[],
    ai_analysis text,
    inserted_at timestamp with time zone default (current_timestamp AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Istanbul'),
    slug text not null,
    is_active boolean default true,
    is_mcp boolean default true,
    
    -- Constraints
    CONSTRAINT unique_github_client_id UNIQUE (id),
    CONSTRAINT unique_github_client_full_name UNIQUE (full_name),
    CONSTRAINT unique_github_client_slug UNIQUE (slug)
);

-- Servers Schema
CREATE TABLE public.servers (
    -- Basic GitHub repository information
    id bigint primary key,
    name text not null,
    full_name text not null,
    html_url text not null,
    description text,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    language text,
    stars integer default 0,
    readme text,
    categories text[],
    ai_analysis text,
    inserted_at timestamp with time zone default (current_timestamp AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Istanbul'),
    slug text not null,
    is_active boolean default true,
    is_mcp boolean default true,
    
    -- Constraints
    CONSTRAINT unique_github_server_id UNIQUE (id),
    CONSTRAINT unique_github_server_full_name UNIQUE (full_name),
    CONSTRAINT unique_github_server_slug UNIQUE (slug)
);

------------ Create all indexes

-- Indexes for github_repos
CREATE INDEX idx_github_repos_updated_at ON public.github_repos(updated_at);
CREATE INDEX idx_github_repos_is_active ON public.github_repos(is_active);
CREATE INDEX idx_github_repos_type ON public.github_repos(type);

-- Indexes for clients
CREATE INDEX idx_clients_updated_at ON public.clients(updated_at);

-- Indexes for servers
CREATE INDEX idx_servers_updated_at ON public.servers(updated_at);

------------ Add table and column descriptions

-- Descriptions for github_repos
COMMENT ON TABLE public.github_repos IS 'Information about MCP repositories from GitHub';
COMMENT ON COLUMN public.github_repos.id IS 'GitHub repository ID';
COMMENT ON COLUMN public.github_repos.name IS 'Repository name';
COMMENT ON COLUMN public.github_repos.full_name IS 'Full repository name (owner/repo)';
COMMENT ON COLUMN public.github_repos.html_url IS 'GitHub repository URL';
COMMENT ON COLUMN public.github_repos.description IS 'Repository description';
COMMENT ON COLUMN public.github_repos.created_at IS 'Repository creation date';
COMMENT ON COLUMN public.github_repos.updated_at IS 'Repository last update date';
COMMENT ON COLUMN public.github_repos.language IS 'Primary programming language';
COMMENT ON COLUMN public.github_repos.stars IS 'Number of stars';
COMMENT ON COLUMN public.github_repos.readme IS 'Repository README content';
COMMENT ON COLUMN public.github_repos.inserted_at IS 'Database insertion date';
COMMENT ON COLUMN public.github_repos.is_active IS 'Repository active status';
COMMENT ON COLUMN public.github_repos.type IS 'Repository type (Clients/Servers)';
COMMENT ON COLUMN public.github_repos.is_mcp IS 'Related to MCP';
COMMENT ON COLUMN public.github_repos.categories IS 'Repository categories';
COMMENT ON COLUMN public.github_repos.ai_analysis IS 'AI analysis results';

-- Descriptions for clients
COMMENT ON TABLE public.clients IS 'Information about MCP client repositories from GitHub';
COMMENT ON COLUMN public.clients.id IS 'GitHub repository ID';
COMMENT ON COLUMN public.clients.name IS 'Repository name';
COMMENT ON COLUMN public.clients.full_name IS 'Full repository name (owner/repo)';
COMMENT ON COLUMN public.clients.html_url IS 'GitHub repository URL';
COMMENT ON COLUMN public.clients.description IS 'Repository description';
COMMENT ON COLUMN public.clients.created_at IS 'Repository creation date';
COMMENT ON COLUMN public.clients.updated_at IS 'Repository last update date';
COMMENT ON COLUMN public.clients.language IS 'Primary programming language';
COMMENT ON COLUMN public.clients.stars IS 'Number of stars';
COMMENT ON COLUMN public.clients.readme IS 'Repository README content';
COMMENT ON COLUMN public.clients.inserted_at IS 'Database insertion date';
COMMENT ON COLUMN public.clients.categories IS 'Repository categories';
COMMENT ON COLUMN public.clients.ai_analysis IS 'AI analysis results';

-- Descriptions for servers
COMMENT ON TABLE public.servers IS 'Information about MCP server repositories from GitHub';
COMMENT ON COLUMN public.servers.id IS 'GitHub repository ID';
COMMENT ON COLUMN public.servers.name IS 'Repository name';
COMMENT ON COLUMN public.servers.full_name IS 'Full repository name (owner/repo)';
COMMENT ON COLUMN public.servers.html_url IS 'GitHub repository URL';
COMMENT ON COLUMN public.servers.description IS 'Repository description';
COMMENT ON COLUMN public.servers.created_at IS 'Repository creation date';
COMMENT ON COLUMN public.servers.updated_at IS 'Repository last update date';
COMMENT ON COLUMN public.servers.language IS 'Primary programming language';
COMMENT ON COLUMN public.servers.stars IS 'Number of stars';
COMMENT ON COLUMN public.servers.readme IS 'Repository README content';
COMMENT ON COLUMN public.servers.inserted_at IS 'Database insertion date';
COMMENT ON COLUMN public.servers.categories IS 'Repository categories';
COMMENT ON COLUMN public.servers.ai_analysis IS 'AI analysis results';

------------ Setup basic permissions

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant table permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated; 
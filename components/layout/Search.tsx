import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';

import { LogIn, SendHorizontal, Server, Users } from 'lucide-react';

interface SearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Search = ({ open, onOpenChange }: SearchProps) => {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search servers or clients..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
            <Server className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/servers'))}>
            <Server className="mr-2 h-4 w-4" />
            <span>Servers</span>
            <CommandShortcut>S</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/clients'))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Clients</span>
            <CommandShortcut>C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => router.push('/add-server'))}>
            <SendHorizontal className="mr-2 h-4 w-4" />
            <span>Add Server</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/login'))}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>Sign In</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default Search;

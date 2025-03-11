import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface AddServerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const serverFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Server name must be at least 3 characters')
    .max(50, 'Server name must not exceed 50 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  githubUrl: z
    .string()
    .url('Please enter a valid GitHub URL')
    .includes('github.com', { message: 'Must be a GitHub URL' }),
});

type ServerFormValues = z.infer<typeof serverFormSchema>;

const AddServerModal = ({ open, onOpenChange }: AddServerModalProps) => {
  const form = useForm<ServerFormValues>({
    resolver: zodResolver(serverFormSchema),
    defaultValues: {
      name: '',
      description: '',
      githubUrl: '',
    },
  });

  const onSubmit = (data: ServerFormValues) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Server</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new server to your collection.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="mcp-playwright"
                      className="bg-background/50 text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="1-2 sentence description of what the MCP server is capable of."
                      className="bg-background/50 text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">GitHub URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://github.com/..."
                      className="bg-background/50 text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Add Server
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServerModal;

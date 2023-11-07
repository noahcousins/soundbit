'use client';

import PoliticianAvatarUpload from '@/components/forms/PoliticianAvatarUpload';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const politicianSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  party: z.string().min(1, 'Party is required'),
  position: z.string().min(1, 'Position is required'),
  state: z.string().min(1, 'State is required'),
  district: z.string().min(1, 'District is required'),
  committeeMemberships: z.string().optional(),
  email: z.string().email('Invalid email format').optional(),
  yearIn: z.string().min(1, 'State is required'),
  yearOut: z.string().min(1, 'State is required'),
  biography: z.string().optional(),
  facebook: z.string().optional(),
  pictureUrl: z.string().optional(),
  twitter: z.string().optional(),
  officialWebsite: z.string().optional()
});

const usStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

function PoliticianForm({ onSubmit }: { onSubmit: Function }) {
  const form = useForm({
    resolver: zodResolver(politicianSchema)
  });

  const handleYearInChange = (value: string) => {
    form.setValue('yearIn', value);
  };

  const handleYearOutChange = (value: string) => {
    form.setValue('yearOut', value);
  };

  const handleSubmit = (data: any) => {
    // Convert the name to lowercase and replace spaces with hyphens
    const handle = data.name.toLowerCase().replaceAll(' ', '-');
    // Add the URL prefix to the pictureUrl
    const modifiedData = {
      ...data,
      handle,
      pictureUrl: `https://wljbezmnwraxpdkkobxg.supabase.co/storage/v1/object/public/politician_avatars/${data.pictureUrl}`
    };

    const formData = new FormData();
    for (const key of Object.keys(modifiedData)) {
      formData.append(key, modifiedData[key]);
    }
    onSubmit(formData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Politician's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="party"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Party</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {field.value ? field.value : 'Select Party'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuCheckboxItem
                      checked={field.value === 'Democrat'}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue('party', 'Democrat');
                        }
                      }}
                    >
                      Democrat
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={field.value === 'Republican'}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue('party', 'Republican');
                        }
                      }}
                    >
                      Republican
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="committeeMemberships"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Committee Memberships</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter committee memberships (comma-separated)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Politician's email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year In</FormLabel>
              <FormControl>
                <Input
                  placeholder="Year in"
                  {...field}
                  onChange={(e) => handleYearInChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearOut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year Out</FormLabel>
              <FormControl>
                <Input
                  placeholder="Year out"
                  {...field}
                  onChange={(e) => handleYearOutChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input placeholder="Politician's district" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {field.value ? field.value : 'Select state'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {usStates.map((state) => (
                      <DropdownMenuCheckboxItem
                        key={state}
                        checked={field.value === state}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            form.setValue('state', state);
                          }
                        }}
                      >
                        {state}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {field.value ? field.value : 'Select position'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuCheckboxItem
                      checked={field.value === 'Senator'}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue('position', 'Senator');
                        }
                      }}
                    >
                      Senator
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={field.value === 'Representative'}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue('position', 'Representative');
                        }
                      }}
                    >
                      Representative
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea placeholder="Politician's biography" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook</FormLabel>
              <FormControl>
                <Input placeholder="Politician's Facebook link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input placeholder="Politician's Twitter link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="officialWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Official Website</FormLabel>
              <FormControl>
                <Input
                  placeholder="Politician's official website link"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pictureUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture URL</FormLabel>
              <FormControl>
                <Input placeholder="Profile Picture URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PoliticianAvatarUpload
          onUpload={(url) => form.setValue('pictureUrl', url)}
          size={150}
        />

        <Button type="submit">Add Politician</Button>
      </form>
    </Form>
  );
}

export default PoliticianForm;

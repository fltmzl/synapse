"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { H4 } from "@/components/typography/h4";
import { P } from "@/components/typography/paragraph";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z.string().min(1, "Prénom is required"),
  lastName: z.string().min(1, "Nom is required"),
  email: z.string().email("Invalid email address"),
  serviceType: z.string().min(1, "Please select a service type"),
  description: z.string().min(1, "Description is required")
});

export default function BusinessForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      serviceType: "",
      description: ""
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
  };

  return (
      

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* 🧩 First Name + Last Name (Responsive Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">Nom</FormLabel>

                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label-required">Email</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Service Type */}
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormLabel className="label-required">
                    Type de service souhaité
                  </FormLabel>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a service you want" />
                    </SelectTrigger>
                    <SelectContent className="select-content-width-full">
                      <SelectItem value="data">Data report</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="research">Research request</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label-required">Description</FormLabel>

                <FormControl>
                  <Textarea
                    placeholder="Décrivez votre demande pour l'obtention d'un chiffrage"
                    className="min-h-[120px] resize-none text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="pt-2 flex justify-end">
            <Button type="submit" size="sm" variant="default">
              Envoyer
            </Button>
          </div>
        </form>
      </Form>
  );
}

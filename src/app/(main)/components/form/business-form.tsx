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
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FormValues } from "@/types/business";

export default function BusinessForm() {
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      serviceType: "",
      description: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("✅ Submitted:", data);
  };

  return (
    <div className="p-6 border border-gray-100 rounded-xl shadow-sm bg-white">
      <h3 className="text-lg font-semibold text-gray-900">
Services complémentaires     </h3>
      <p className="text-sm text-gray-500 mt-1 mb-6">
      Je souhaite un chiffrage pour la réalisation d'une prestation par Synapse
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email address is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
            rules={{ required: "Please select a service type" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de service souhaité</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full h-10 rounded-md border border-gray-200 px-3">
                      <SelectValue placeholder="Select a service you want" />
                    </SelectTrigger>
                    <SelectContent>
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
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Décrivez votre demande pour l'obtention d'un chiffrage"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              disabled={!form.formState.isValid}
            >
              Submit request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

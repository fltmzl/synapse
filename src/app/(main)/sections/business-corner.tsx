"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import SectionTitle from "@/components/typography/section-title";
import { H4 } from "@/components/typography/h4";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { H1 } from "@/components/typography/h1";

type FormValues = {
  fullName: string;
  email: string;
  serviceType: string | null;
  description: string;
};

export default function BusinessCorner() {
  const businessPosts = [
    {
      title: "Call for Investment: Green Energy in Réunion",
      date: "Sep 3, 2025",
      desc: "The government has officially announced the opening of tenders for exciting new solar and wind projects.",
      img: "/images/bo-1.png"
    },
    {
      title: "Startup Grant Program in Guadeloupe",
      date: "Aug 28, 2025",
      desc: "",
      img: "/images/bo-2.png"
    },
    {
      title: "Export Channel for Martinique Agro Products",
      date: "Aug 22, 2025",
      desc: "",
      img: "/images/bo-3.png"
    }
  ];

  const forecastPosts = [
    {
      title: "Unemployment Projection in Martinique: 10% by 2026",
      date: "Sep 2, 2025",
      desc: "The job market is anticipated to see significant improvements as a result of the ongoing expansion.",
      img: "/images/forecast-1.png"
    },
    {
      title: "GDP Forecast for Guyane Q1 2026: +4.2%",
      date: "Aug 30, 2025",
      desc: "",
      img: "/images/forecast-2.png"
    },
    {
      title: "Export Growth in Mayotte Seafood Sector: +8% YoY",
      date: "Aug 25, 2025",
      desc: "",
      img: "/images/forecast-3.png"
    }
  ];

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      serviceType: "",
      description: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log("✅ Submitted:", data);
  };

  return (
    <section className="max-w-7xl mx-auto w-full px-6 py-12 lg:py-25 flex flex-col gap-10 lg:gap-16">
      {/* Header */}
      <div className="text-center lg:text-leeft">
        <SectionTitle>Le coin des affaires</SectionTitle>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-10">
        {/* LEFT 2 columns */}
        <div className="lg:col-span-2 flex flex-col">
          {/* top link */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Featured Business Card */}

            <div>
              <H4 className="text-primary underline mb-6 inline-block">
                Les opportunités de reprises
              </H4>
              <article>
                <div>
                  <Image
                    src={businessPosts[0].img}
                    alt={businessPosts[0].title}
                    width={1200}
                    height={600}
                    className="w-full mb-4 h-56 object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base text-muted-foreground">
                      {businessPosts[0].date}
                    </h3>
                    <H1>{businessPosts[0].title}</H1>
                    <h3 className="line-clamp-3 mb-5 text-base text-muted-foreground">
                      {businessPosts[0].desc}
                    </h3>
                  </div>
                </div>

                {/* small list under featured */}
                <div>
                  {businessPosts.slice(1).map((post, i) => (
                    <div
                      key={i}
                      className="border-t border-gray-200 py-5 flex items-center gap-4"
                    >
                      <Image
                        src={post.img}
                        alt={post.title}
                        width={96}
                        height={64}
                        className="rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex flex-col justify-center gap-2">
                        <p className="text-xs ">{post.date}</p>
                        <h4 className="text-lg font-medium leading-snug tracking-tight">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            {/* Forecast column */}
            <div>
              <H4 className=" mb-6 inline-block">Les prévisions économiques</H4>

              <article>
                <div>
                  <Image
                    src={businessPosts[0].img}
                    alt={businessPosts[0].title}
                    width={1200}
                    height={600}
                    className="w-full mb-4 h-56 object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base text-muted-foreground">
                      {businessPosts[0].date}
                    </h3>
                    <H1>{businessPosts[0].title}</H1>
                    <h3 className="line-clamp-3 mb-5 text-base text-muted-foreground">
                      {businessPosts[0].desc}
                    </h3>
                  </div>
                </div>

                {/* small list under featured */}
                <div>
                  {businessPosts.slice(1).map((post, i) => (
                    <div
                      key={i}
                      className="border-t border-gray-200 py-5 flex items-center gap-4"
                    >
                      <Image
                        src={post.img}
                        alt={post.title}
                        width={96}
                        height={64}
                        className="rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex flex-col justify-center gap-2">
                        <p className="text-xs ">{post.date}</p>
                        <h4 className="text-lg font-medium leading-snug tracking-tight">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM (single column) */}
        <aside className="lg:col-span-1">
          <Card className=" rounded-xl border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Request a Service from Synapse
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Tell us what you need and our team will provide tailored
                insights, reports, or consulting services.
              </p>
            </CardHeader>

            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    rules={{ required: "Full name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="label-required">
                          Full name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
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
                        message: "Enter a valid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="label-required">
                          Email address
                        </FormLabel>
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
                        <FormLabel className="label-required">
                          Service type
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full h-10 rounded-md border border-gray-200 px-3">
                              <SelectValue placeholder="Select a service you want" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="data">Data report</SelectItem>
                              <SelectItem value="consulting">
                                Consulting
                              </SelectItem>
                              <SelectItem value="research">
                                Research request
                              </SelectItem>
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
                        <FormLabel className="label-required">
                          Description of request
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the service you want"
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
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  );
}

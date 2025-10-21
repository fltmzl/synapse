"use client";

import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SectionTitle from "@/components/typography/section-title";

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
      img: "/images/bo-1.png",
    },
    {
      title: "Startup Grant Program in Guadeloupe",
      date: "Aug 28, 2025",
      desc: "",
      img: "/images/bo-2.png",
    },
    {
      title: "Export Channel for Martinique Agro Products",
      date: "Aug 22, 2025",
      desc: "",
      img: "/images/bo-3.png",
    },
  ];

  const forecastPosts = [
    {
      title: "Unemployment Projection in Martinique: 10% by 2026",
      date: "Sep 2, 2025",
      desc: "The job market is anticipated to see significant improvements as a result of the ongoing expansion.",
      img: "/images/forecast-1.png",
    },
    {
      title: "GDP Forecast for Guyane Q1 2026: +4.2%",
      date: "Aug 30, 2025",
      desc: "",
      img: "/images/forecast-2.png",
    },
    {
      title: "Export Growth in Mayotte Seafood Sector: +8% YoY",
      date: "Aug 25, 2025",
      desc: "",
      img: "/images/forecast-3.png",
    },
  ];

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      serviceType: null,
      description: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <section className="max-w-7xl mx-auto w-full px-6 py-25 flex flex-col gap-16">
      {/* Header */}
      <div >
        <SectionTitle>The Business Corner</SectionTitle>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-10">
        {/* LEFT 2 columns */}
        <div className="lg:col-span-2 flex flex-col">
          {/* top link */}
          <a className="text-sm text-blue-600 hover:underline mb-5 inline-block">Business Opportunities</a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Business Card */}
            <div>
              <article className="space-y-4">
                <div className="rounded-md overflow-hidden border border-gray-100 shadow-sm">
                  <Image
                    src={businessPosts[0].img}
                    alt={businessPosts[0].title}
                    width={1200}
                    height={600}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <p className="text-xs text-gray-500">{businessPosts[0].date}</p>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-tight">{businessPosts[0].title}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">{businessPosts[0].desc}</p>
                  </div>
                </div>

                {/* small list under featured */}
                <div className="space-y-4">
                  {businessPosts.slice(1).map((post, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <Image src={post.img} alt={post.title} width={96} height={64} className="rounded-md object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{post.date}</p>
                        <h4 className="text-sm font-medium text-gray-900">{post.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            {/* Forecast column */}
            <div>
                          <a className="text-sm text-blue-600 hover:underline mb-5 inline-block">Business Opportunities</a>

              <article className="space-y-4">
                <div className="rounded-md overflow-hidden border border-gray-100 shadow-sm">
                  <Image
                    src={forecastPosts[0].img}
                    alt={forecastPosts[0].title}
                    width={1200}
                    height={600}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <p className="text-xs text-gray-500">{forecastPosts[0].date}</p>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-tight">{forecastPosts[0].title}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">{forecastPosts[0].desc}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {forecastPosts.slice(1).map((post, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <Image src={post.img} alt={post.title} width={96} height={64} className="rounded-md object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{post.date}</p>
                        <h4 className="text-sm font-medium text-gray-900">{post.title}</h4>
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
          <Card className="rounded-xl border border-gray-100 shadow-sm">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-lg font-semibold text-gray-900">Request a Service from Synapse</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Tell us what you need and our team will provide tailored insights, reports, or consulting services.</p>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Full name <span className="text-red-500">*</span></label>
                  <Input placeholder="Enter your full name" {...register("fullName", { required: true })} />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Email address <span className="text-red-500">*</span></label>
                  <Input type="email" placeholder="Enter your email address" {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Service type <span className="text-red-500">*</span></label>
                  <Controller
                    control={control}
                    name="serviceType"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select value={field.value ?? undefined} onValueChange={(v) => field.onChange(v)}>
                        <SelectTrigger className="w-full h-10 rounded-md border border-gray-200 px-3">
                          <SelectValue placeholder="Select a service do you want" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="data">Data report</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="research">Research request</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Description of request <span className="text-red-500">*</span></label>
                  <Textarea placeholder="Describe your service do you want" {...register("description", { required: true })} className="min-h-[120px]" />
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md">Submit request</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  );
}

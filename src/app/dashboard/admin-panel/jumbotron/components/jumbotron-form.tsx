"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, MonitorPlay } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";
import { DashboardHeader } from "@/components/dashboard-header";
import { Spinner } from "@/components/spinner";
import { ImageUpload } from "@/components/ui/image-upload";
import { VideoUpload } from "@/components/ui/video-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const jumbotronFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  mediaType: z.enum(["video", "image"]),
  mediaUrl: z.string().min(1, "Media is required"),
  thumbnailUrl: z.string().optional(),
  isActive: z.boolean()
});

export type JumbotronFormValues = z.infer<typeof jumbotronFormSchema>;

type JumbotronFormProps = {
  initialValues?: JumbotronFormValues;
  isMutationLoading?: boolean;
  onSubmit: (data: JumbotronFormValues) => void | Promise<void>;
  pageTitle: string;
  pageDescription: string;
};

export function JumbotronForm({
  initialValues,
  isMutationLoading,
  onSubmit,
  pageTitle,
  pageDescription
}: JumbotronFormProps) {
  const form = useForm<JumbotronFormValues>({
    resolver: zodResolver(jumbotronFormSchema),
    defaultValues: initialValues || {
      title: "",
      mediaType: "video",
      mediaUrl: "",
      thumbnailUrl: "",
      isActive: false
    },
    mode: "all"
  });

  useUnsavedChanges(form.formState.isDirty);

  const mediaType = form.watch("mediaType");

  return (
    <>
      <DashboardHeader
        title={pageTitle}
        description={pageDescription}
        actions={
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isMutationLoading}
          >
            {isMutationLoading ? <Spinner /> : <Save className="size-4 mr-2" />}
            Save Jumbotron
          </Button>
        }
      />

      <div className="flex flex-1 flex-col p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-2xl mx-auto"
          >
            <Link
              href="/dashboard/admin-panel/jumbotron"
              className="flex items-center text-secondary text-sm w-fit hover:underline"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to jumbotrons
            </Link>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MonitorPlay className="size-5 text-primary" />
                  <CardTitle>Jumbotron Details</CardTitle>
                </div>
                <CardDescription className="mt-1">
                  Configure the hero media for the landing page
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required">Title</FormLabel>
                      <FormDescription>
                        Internal label to identify this jumbotron
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="e.g. Main Landing Video"
                          {...field}
                          disabled={isMutationLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mediaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="label-required">
                          Media Type
                        </FormLabel>
                        <Select
                          onValueChange={(val) => {
                            field.onChange(val);
                            // Clear media when switching types
                            form.setValue("mediaUrl", "");
                            form.setValue("thumbnailUrl", "");
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select media type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Active</FormLabel>
                          <FormDescription>
                            Show on landing page
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isMutationLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="mediaUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required">
                        {mediaType === "video" ? "Video File" : "Image"}
                      </FormLabel>
                      <FormDescription>
                        {mediaType === "video"
                          ? "Upload the hero video for the landing page."
                          : "Upload the hero image for the landing page."}
                      </FormDescription>
                      <FormControl>
                        {mediaType === "video" ? (
                          <VideoUpload
                            value={field.value}
                            onChange={field.onChange}
                          />
                        ) : (
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {mediaType === "video" && (
                  <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video Thumbnail</FormLabel>
                        <FormDescription>
                          Poster image shown before video plays (optional)
                        </FormDescription>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
}

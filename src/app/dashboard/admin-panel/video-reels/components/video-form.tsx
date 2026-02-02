"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { VideoUpload } from "@/components/ui/video-upload";
import { TagsInput } from "@/components/ui/tags-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";
import { UnsavedChangesDialog } from "@/components/ui/unsaved-changes-dialog";
import { ComboboxCreate } from "@/components/ui/combobox-create";
import useCategories from "@/queries/use-categories";
import useCategoryMutation from "@/mutations/use-category-mutation";
import useTerritories from "@/queries/use-territories";
import useTerritoryMutation from "@/mutations/use-territory-mutation";
import usePlaces from "@/queries/use-places";
import usePlaceMutation from "@/mutations/use-place-mutation";
import usePublishers from "@/queries/use-publishers";
import usePublisherMutation from "@/mutations/use-publisher-mutation";
import { Category } from "@/services/category.api";
import { Territory } from "@/services/territory.api";
import { Place } from "@/services/place.api";
import { Publisher } from "@/services/publisher.api";
import { ImageUpload } from "@/components/ui/image-upload";
import usePersons from "@/queries/use-persons";
import usePersonMutation from "@/mutations/use-person-mutation";
import { Person } from "@/types/person-relation.type";

// ... existing imports

const TITLE_MAX_LENGTH = 150;
const DESCRIPTION_MAX_LENGTH = 500;

export const videoFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(
      TITLE_MAX_LENGTH,
      `Title must not exceed ${TITLE_MAX_LENGTH} characters`
    ),
  description: z
    .string()
    .min(1, "Description is required")
    .max(
      DESCRIPTION_MAX_LENGTH,
      `Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters`
    ),
  videoUrl: z.string().min(1, "Video is required"),
  thumbnailUrl: z.string().optional(),
  territory: z.string().optional(),
  place: z.string().optional(),
  person: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export type VideoFormValues = z.infer<typeof videoFormSchema>;

type VideoFormProps = {
  initialValues?: VideoFormValues;
  isMutationLoading?: boolean;
  onSubmit: (data: VideoFormValues) => void;
  pageTitle: string;
  pageDescription: string;
};

export function VideoForm({
  initialValues,
  isMutationLoading,
  onSubmit,
  pageTitle,
  pageDescription
}: VideoFormProps) {
  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: initialValues || {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      territory: "",
      place: "",
      person: "",
      category: "",
      tags: []
    },
    mode: "all"
  });

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const { createCategoryMutation } = useCategoryMutation();

  const { data: territories = [], isLoading: isTerritoriesLoading } =
    useTerritories();
  const { createTerritoryMutation } = useTerritoryMutation();

  const { data: places = [], isLoading: isPlacesLoading } = usePlaces();
  const { createPlaceMutation } = usePlaceMutation();

  const { data: persons = [], isLoading: isPersonsLoading } = usePersons();
  const { createPersonMutation } = usePersonMutation();

  const categoryOptions = React.useMemo(
    () =>
      categories.map((cat: Category) => ({ value: cat.name, label: cat.name })),
    [categories]
  );

  const territoryOptions = React.useMemo(
    () => territories.map((t: Territory) => ({ value: t.name, label: t.name })),
    [territories]
  );

  const placeOptions = React.useMemo(
    () => places.map((p: Place) => ({ value: p.name, label: p.name })),
    [places]
  );

  const personOptions = React.useMemo(
    () => persons.map((p: Person) => ({ value: p.name, label: p.name })),
    [persons]
  );

  const { showPrompt, confirmNavigation, cancelNavigation } = useUnsavedChanges(
    form.formState.isDirty
  );

  return (
    <>
      <UnsavedChangesDialog
        open={showPrompt}
        onConfirm={confirmNavigation}
        onCancel={cancelNavigation}
      />
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
            Save Video
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
              href="/dashboard/admin-panel/video-reels"
              className="flex items-center text-secondary text-sm w-fit"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to videos
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required font-medium">
                        Title
                      </FormLabel>
                      <FormDescription>
                        The title of the video reel.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Enter video title"
                          {...field}
                          maxLength={TITLE_MAX_LENGTH}
                        />
                      </FormControl>
                      <div className="flex items-center justify-between">
                        <FormMessage />
                        <span className="text-xs text-muted-foreground">
                          {field.value.length}/{TITLE_MAX_LENGTH} characters
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required font-medium">
                        Description
                      </FormLabel>
                      <FormDescription>
                        A brief description of the video.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Enter video description"
                          className="resize-none"
                          rows={4}
                          {...field}
                          maxLength={DESCRIPTION_MAX_LENGTH}
                        />
                      </FormControl>
                      <div className="flex items-center justify-between">
                        <FormMessage />
                        <span className="text-xs text-muted-foreground">
                          {field.value.length}/{DESCRIPTION_MAX_LENGTH}{" "}
                          characters
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="territory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Territory</FormLabel>
                        <FormControl>
                          <ComboboxCreate
                            options={territoryOptions}
                            value={field.value}
                            onValueChange={field.onChange}
                            onCreate={(name) => {
                              createTerritoryMutation.mutate(name, {
                                onSuccess: (newTerritory: { name: string }) => {
                                  if (newTerritory) {
                                    field.onChange(newTerritory.name);
                                  }
                                }
                              });
                            }}
                            placeholder="Select territory..."
                            searchPlaceholder="Search territories or create new"
                            emptyText="No territory found."
                            createText="Create territory"
                            isCreating={createTerritoryMutation.isPending}
                            disabled={isTerritoriesLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="place"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Place</FormLabel>
                        <FormControl>
                          <ComboboxCreate
                            options={placeOptions}
                            value={field.value}
                            onValueChange={field.onChange}
                            onCreate={(name) => {
                              createPlaceMutation.mutate(name, {
                                onSuccess: (newPlace: { name: string }) => {
                                  if (newPlace) {
                                    field.onChange(newPlace.name);
                                  }
                                }
                              });
                            }}
                            placeholder="Select place..."
                            searchPlaceholder="Search places or create new"
                            emptyText="No place found."
                            createText="Create place"
                            isCreating={createPlaceMutation.isPending}
                            disabled={isPlacesLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="person"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Person</FormLabel>
                        <FormControl>
                          <ComboboxCreate
                            options={personOptions}
                            value={field.value}
                            onValueChange={field.onChange}
                            onCreate={(name) => {
                              createPersonMutation.mutate(
                                { name },
                                {
                                  onSuccess: (newPerson: { name: string }) => {
                                    if (newPerson) {
                                      field.onChange(newPerson.name);
                                    }
                                  }
                                }
                              );
                            }}
                            placeholder="Select person..."
                            searchPlaceholder="Search persons or create new"
                            emptyText="No person found."
                            createText="Create person"
                            isCreating={createPersonMutation.isPending}
                            disabled={isPersonsLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Category</FormLabel>
                        <FormControl>
                          <ComboboxCreate
                            options={categoryOptions}
                            value={field.value}
                            onValueChange={field.onChange}
                            onCreate={(name) => {
                              createCategoryMutation.mutate(name, {
                                onSuccess: (newCat: { name: string }) => {
                                  if (newCat) {
                                    field.onChange(newCat.name);
                                  }
                                }
                              });
                            }}
                            placeholder="Select category..."
                            searchPlaceholder="Search categories or create new"
                            emptyText="No category found."
                            createText="Create category"
                            isCreating={createCategoryMutation.isPending}
                            disabled={isCategoriesLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Tags</FormLabel>
                      <FormDescription>
                        Add tags to your video to make it easier to find.
                      </FormDescription>
                      <FormControl>
                        <TagsInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required font-medium">
                        Video File
                      </FormLabel>
                      <FormDescription>
                        Upload the video reel file.
                      </FormDescription>
                      <FormControl>
                        <VideoUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Thumbnail</FormLabel>
                      <FormDescription>
                        Upload a thumbnail for the video (optional).
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
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

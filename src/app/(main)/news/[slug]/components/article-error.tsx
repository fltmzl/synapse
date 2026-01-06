import SectionContainer from "@/components/container/section-container";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ArticleError({
  message = "We couldn't load the article you're looking for.",
  onRetry
}: Props) {
  return (
    <SectionContainer className="py-20 lg:py-32 flex flex-col items-center justify-center text-center">
      <div className="bg-destructive/10 p-6 rounded-full mb-8">
        <AlertCircle className="size-12 lg:size-16 text-destructive" />
      </div>

      <h1 className="text-2xl lg:text-4xl font-medium tracking-tight mb-4">
        Oops! Something went wrong
      </h1>

      <p className="text-muted-foreground text-lg max-w-md mb-10">{message}</p>

      <div className="flex flex-col sm:flex-row gap-4">
        {onRetry && (
          <Button onClick={onRetry} size="lg" className="gap-2">
            <RefreshCcw className="size-4" />
            Try Again
          </Button>
        )}

        <Button variant="outline" size="lg" asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </SectionContainer>
  );
}

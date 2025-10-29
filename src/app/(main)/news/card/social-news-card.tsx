"use client";

import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Instagram,
  ArrowUpRight
} from "lucide-react";
import { SocialPost } from "@/types/news.type";
import { JSX } from "react";
import { TwitterIcon } from "@/icons/twitter-icon";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { RefreshIcon } from "@/icons/refresh-icon";
import Link from "next/link";
import { InstagramIcon } from "@/icons/instagram-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";

const platformIcons: Record<SocialPost["platform"], JSX.Element> = {
  Instagram: <InstagramIconFlat className="w-4 h-4 text-muted-foreground" />,
  "X (Twitter)": <TwitterIcon className="w-4 h-4 text-muted-foreground" />
};

type Props = {
  platform: SocialPost["platform"];
  username: string;
  contentMain: string;
  contentHighlight?: string;
  image: string;
  likes: number;
  comments?: number;
  retweets?: number;
};

export default function SocialPostCard({
  platform,
  username,
  contentMain,
  contentHighlight,
  image,
  likes,
  comments,
  retweets
}: Props) {
  return (
    <Link href="#" className="group block">
      <article className="flex flex-col gap-3 h-full">
        <div className="flex gap-5 lg:items-center lg:flex-row flex-col w-full">
          <div
            className="
    relative
    w-full h-[150px]
    lg:w-[200px] lg:h-[150px]
    mx-auto lg:mx-0
    rounded-md overflow-hidden flex-shrink-0
  "
          >
            <Image
              src={image}
              alt={`${platform} post by ${username}`}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex flex-col gap-5 lg:gap-0 lg:justify-between h-[150px] w-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-[6px] text-sm text-muted-foreground font-regular ">
                {platformIcons[platform]}
                <span className="text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-regular pr-[6px]">
                  {platform}
                </span>
                <span className=" w-[1.5px] h-[14px] bg-border" />
                <span className="text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-regular pl-[6px]">
                  {username}
                </span>
              </div>

              <p className="text-lg font-regular tracking-[-0.01em] leading-[140%] text-foreground group-hover:text-primary  transition-colors duration-200">
                {contentMain}{" "}
                {contentHighlight && (
                  <span className="text-muted-foreground font-regular">
                    {contentHighlight}
                  </span>
                )}
              </p>
            </div>
            <div className="flex text-muted-foreground justify-between items-center">
              <div className="flex gap-3">
                <div className="flex items-center gap-[6px]">
                  <Heart className="w-4 h-4 text-muted-foreground/70 " />
                  <span className="text-sm font-regular leading-[140%] tracking-tighter">
                    {likes.toLocaleString("en-US")} Likes
                  </span>
                </div>

                {comments !== undefined && (
                  <div className="flex items-center gap-[6px]">
                    <MessageCircle className="w-4 h-4 text-muted-foreground/70" />
                    <span className="text-sm tracking-[-0.01em] leading-[140%]  font-regular">
                      {comments} Comments
                    </span>
                  </div>
                )}

                {retweets !== undefined && (
                  <div className="flex items-center gap-2">
                    <RefreshIcon className="w-4 h-4" />
                    <span className="text-sm tracking-[-0.01em] leading-[140%] text-muted-foreground font-regular">
                      {retweets} Retweets
                    </span>
                  </div>
                )}
              </div>
              <div>
                <ArrowUpRightIcon className="w-5 h-5 text-primary transition-all duration-200 group-hover:text-primary group-hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

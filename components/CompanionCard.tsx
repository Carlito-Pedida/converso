"use client";

import { removeBookmark } from "@/lib/actions/companions.";
import { addBookmark } from "@/lib/actions/companions.";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color
}: CompanionCardProps) => {
  const pathname = usePathname();

  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (bookmarked) {
        await removeBookmark(id, pathname);
        setBookmarked(false);
      } else {
        await addBookmark(id, pathname);
        setBookmarked(true);
      }
    } catch (error) {
      console.error("Bookmark action failed:", error);
    } finally {
      setLoading(false);
    }
  };
  // const handleBookmark = async () => {
  //   if (bookmarked) {
  //     await removeBookmark(id, pathname);
  //   } else {
  //     await addBookmark(id, pathname);
  //   }
  // };

  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2 className="text-2xl">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duraion"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;

import React from "react";
import { formatDate } from "@/utils/formatDate.ts";

interface DiaryCardProps {
  title: string;
  created: Date;
  body: string;
}

const DiaryCard = ({ title, created, body }: DiaryCardProps) => {
  return (
    <div className="my-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-500">{formatDate(created)}</p>
      </div>

      <div className="px-4 pb-4 sm:px-6">
        <p className="text-sm whitespace-pre-line text-gray-700">{body}</p>
      </div>
    </div>
  );
};

export default DiaryCard;

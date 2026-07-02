"use client";

import UpsertPostForm from "@/components/ui/upsertPostForm";
import React, { useState } from "react";

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  published: boolean;
  thumbnail: File | null;
}

interface CreatePostFormProps {
  onSubmit?: (data: FormData) => Promise<void> | void;
  className?: string;
}

export default function CreatePostForm({ onSubmit, className = "" }: CreatePostFormProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    slug: "",
    content: "",
    published: false,
    thumbnail: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  return (
    <div className={`w-full max-w-3xl mx-auto px-4 py-8 ${className}`}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        
        {/* Title Header */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
          Create a new post !
        </h2>

        <UpsertPostForm />

      </div>
    </div>
  );
}
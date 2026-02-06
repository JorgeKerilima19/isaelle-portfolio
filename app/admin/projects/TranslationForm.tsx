// app/admin/projects/TranslationForm.tsx
"use client";

import { createTranslation } from "@/actions/translations";
import { useFormState } from "react-dom";

export default function TranslationForm({
  sourceProjectId,
  targetLocale,
  label,
  colorClass,
}: {
  sourceProjectId: string;
  targetLocale: string;
  label: string;
  colorClass: string;
}) {
  const [state, formAction] = useFormState(createTranslation, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="sourceProjectId" value={sourceProjectId} />
      <input type="hidden" name="targetLocale" value={targetLocale} />
      <button
        type="submit"
        className={`px-2 py-1 ${colorClass} text-white text-xs rounded hover:bg-opacity-90`}
      >
        {label}
      </button>
    </form>
  );
}

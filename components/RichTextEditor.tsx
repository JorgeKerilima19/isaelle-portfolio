// components/RichTextEditor.tsx
"use client";

import { useState, useRef, useEffect } from "react";

type RichTextEditorProps = {
  name: string;
  initialValue?: string;
};

export default function RichTextEditor({
  name,
  initialValue = "",
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialValue);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize content
  useEffect(() => {
    if (initialValue && editorRef.current) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string = "") => {
    if (editorRef.current) {
      document.execCommand(command, false, value);
      editorRef.current.focus();
      handleInput();
    }
  };

  const formatBlock = (tag: string) => {
    execCommand("formatBlock", `<${tag}>`);
  };

  const insertImageFromFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Por favor, seleccione un archivo de imagen válido");
      return;
    }

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append("image", file);

      // Upload to your server endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      const data = await response.json();

      if (data.url) {
        // Insert image into editor
        execCommand("insertImage", data.url);

        // Optional: Add alt text
        const imgElements =
          editorRef.current?.getElementsByTagName("img") || [];
        const lastImg = imgElements[imgElements.length - 1];
        if (lastImg) {
          lastImg.alt = file.name.replace(/\.[^/.]+$/, "");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error al subir la imagen. Por favor, inténtelo de nuevo.");
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-gray-300 rounded-t-md">
        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => execCommand("bold")}
          title="Negrita"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => execCommand("italic")}
          title="Cursiva"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => execCommand("underline")}
          title="Subrayado"
        >
          <u>U</u>
        </button>

        <div className="border-l border-gray-300 h-6 mx-1"></div>

        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => formatBlock("h1")}
          title="Encabezado 1"
        >
          H1
        </button>
        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => formatBlock("h2")}
          title="Encabezado 2"
        >
          H2
        </button>
        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => formatBlock("h3")}
          title="Encabezado 3"
        >
          H3
        </button>

        <div className="border-l border-gray-300 h-6 mx-1"></div>

        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => execCommand("insertUnorderedList")}
          title="Lista desordenada"
        >
          •
        </button>
        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => execCommand("insertOrderedList")}
          title="Lista ordenada"
        >
          1.
        </button>

        <div className="border-l border-gray-300 h-6 mx-1"></div>

        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => {
            const url = prompt("URL del enlace:");
            if (url) execCommand("createLink", url);
          }}
          title="Enlace"
        >
          🔗
        </button>
        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={insertImageFromFile}
          title="Subir imagen desde archivo"
        >
          🖼️
        </button>

        <div className="border-l border-gray-300 h-6 mx-1"></div>

        <button
          type="button"
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => execCommand("removeFormat")}
          title="Eliminar formato"
        >
          ⓧ
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-75 p-4 border border-t-0 border-gray-300 rounded-b-md outline-none prose prose-amber max-w-none"
        onInput={handleInput}
      />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={content} />
    </>
  );
}

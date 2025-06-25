import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";

// Lucide icons
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

export default function RTE({ content = "", onChange, label, defaultValue = "" }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      CodeBlock,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: defaultValue || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none w-full min-h-[200px]",
      },
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  const Button = ({ icon: Icon, active, onClick, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-200 ${
        active ? "bg-blue-600 text-white" : "text-gray-800"
      }`}
    >
      <Icon size={16} />
    </button>
  );

  const MenuBar = () => {
    if (!editor) return null;

    return (
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-100 rounded-t-md">
        {/* Formatting */}
        <Button icon={Bold} title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
        <Button icon={Italic} title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <Button icon={UnderlineIcon} title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <Button icon={Strikethrough} title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} />
      

        {/* Alignment */}
        <Button icon={AlignLeft} title="Align Left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} />
        <Button icon={AlignCenter} title="Align Center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} />
        <Button icon={AlignRight} title="Align Right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} />

        {/* Undo/Redo */}
        <Button icon={Undo2} title="Undo" onClick={() => editor.chain().focus().undo().run()} />
        <Button icon={Redo2} title="Redo" onClick={() => editor.chain().focus().redo().run()} />
      </div>
    );
  };

  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <div className="rounded border bg-white overflow-hidden">
        <MenuBar />
        <div className="p-3">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
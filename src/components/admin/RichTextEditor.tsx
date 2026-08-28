'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import { useState, useCallback, useEffect } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Superscript as SuperIcon,
  Subscript as SubIcon,
  Heading2,
  Heading3,
  Heading4,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link2,
  Unlink,
  Highlighter,
  Quote,
  Code,
  Undo,
  Redo,
  Minus,
} from 'lucide-react'

interface RichTextEditorProps {
  name: string
  defaultValue?: string | null
  placeholder?: string
  onChange?: (html: string) => void
}

export function RichTextEditor({
  name,
  defaultValue = '',
  onChange,
}: RichTextEditorProps) {
  const [content, setContent] = useState(defaultValue ?? '')

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#8B1A1A] underline font-semibold hover:text-[#6B1414]',
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Superscript,
      Subscript,
    ],
    content: defaultValue ?? '',
    editorProps: {
      attributes: {
        class:
          'prose prose-stone max-w-none min-h-[500px] p-6 focus:outline-none leading-relaxed text-[#1A0A0A]',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setContent(html)
      onChange?.(html)
    },
  })

  // Synchronize defaultValue if it changes from outside
  useEffect(() => {
    if (editor && defaultValue !== undefined && defaultValue !== null) {
      if (editor.getHTML() !== defaultValue) {
        editor.commands.setContent(defaultValue)
      }
    }
  }, [defaultValue, editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Masukkan URL link:', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return (
      <div className="min-h-[550px] w-full rounded-2xl border border-[#E8E5E0] bg-white p-6 animate-pulse flex items-center justify-center text-gray-400">
        Memuat editor...
      </div>
    )
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled = false,
    title,
    children,
  }: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    title: string
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
        isActive
          ? 'bg-[#8B1A1A] text-white'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200'
      } disabled:opacity-30 disabled:pointer-events-none`}
    >
      {children}
    </button>
  )

  const Divider = () => <div className="h-5 w-[1px] bg-gray-200 mx-1 self-center" />

  return (
    <div className="flex flex-col rounded-2xl border border-[#E8E5E0] bg-white overflow-hidden shadow-sm">
      {/* Hidden input for standard Next.js form submission */}
      <input type="hidden" name={name} value={content} />

      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 border-b border-[#E8E5E0] bg-white/95 px-3 py-2 backdrop-blur-sm">
        {/* History */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          isActive={editor.isActive('heading', { level: 4 })}
          title="Heading 4"
        >
          <Heading4 className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Basic Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Script & Highlights */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          isActive={editor.isActive('superscript')}
          title="Superscript"
        >
          <SuperIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          isActive={editor.isActive('subscript')}
          title="Subscript"
        >
          <SubIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          title="Highlight Text"
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Text Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Rata Kiri"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Rata Tengah"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Rata Kantor/Kanan"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Rata Kanan Kiri (Justify)"
        >
          <AlignJustify className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Lists & Quotes */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Links */}
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          title="Tambah Link"
        >
          <Link2 className="h-4 w-4" />
        </ToolbarButton>
        {editor.isActive('link') && (
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Hapus Link"
          >
            <Unlink className="h-4 w-4" />
          </ToolbarButton>
        )}
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 bg-white cursor-text min-h-[500px]">
        <EditorContent editor={editor} />
      </div>

      {/* Footer Word Count / Help */}
      <div className="border-t border-[#E8E5E0] bg-[#FAF9F7] px-4 py-2 text-xs text-gray-500 flex items-center justify-between">
        <span>Rich Text Editor (Tiptap)</span>
        <span>Gunakan toolbar di atas untuk format teks</span>
      </div>
    </div>
  )
}

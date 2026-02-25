import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';

const lowlight = createLowlight(common);

export const getTiptapExtensions = () => [
    StarterKit.configure({
        codeBlock: false,
    }),
    Underline,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Link.configure({
        defaultProtocol: 'https',
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
    }),
    Highlight.configure({
        multicolor: true,
    }),
    Image,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    CodeBlockLowlight.configure({
        lowlight,
    }),
];

import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: [
    "source", "fullsize", "print", "about", "bold", "italic", "underline", "strikethrough",
    "eraser", "superscript", "subscript", "ul", "ol", "outdent", "indent", "font", "fontsize",
    "brush", "paragraph", "image", "video", "file", "table", "link", "align", "undo", "redo",
    "cut", "copy", "paste", "copyformat", "hr", "symbol", "selectall", "preview", "find",
    "replace", "code", "preview", "visual", "fullscreen", "dots", "emoji", "paragraph"
  ],
  toolbarSticky: false,  // Makes the toolbar sticky on scroll, set to true if desired
  showXPathInStatusbar: false, // Optional: shows the full path of selected text element
  askBeforePasteFromWord: false, // Skip the confirmation before pasting from MS Word
  askBeforePasteHTML: false, // Skip the confirmation before pasting HTML
  enableDragAndDropFileToEditor: true, // Allows drag-and-drop file uploads
  uploader: {
    insertImageAsBase64URI: true, // Directly insert images as Base64 in the editor content
  },
  controls: {
    font: {
      list: {
        'Arial': 'Arial',
        'Comic Sans MS': 'Comic Sans MS',
        'Courier New': 'Courier New',
        'Georgia': 'Georgia',
        'Lucida Sans Unicode': 'Lucida Sans Unicode',
        'Tahoma': 'Tahoma',
        'Times New Roman': 'Times New Roman',
        'Verdana': 'Verdana'
      }
    },
    fontsize: {
      list: [
        '8px', '10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '28px', '32px', '36px', '48px', '60px', '72px', '96px'
      ]
    },
    paragraph: {
      options: [
        { value: 'Normal', text: 'Normal' },
        { value: 'h1', text: 'Header 1' },
        { value: 'h2', text: 'Header 2' },
        { value: 'h3', text: 'Header 3' },
        { value: 'h4', text: 'Header 4' },
        { value: 'h5', text: 'Header 5' },
        { value: 'h6', text: 'Header 6' }
      ]
    }
  },
  style: {
    buttons: [
      'paragraph'
    ]
  },
  paragraphButton: true // Enable the paragraph dropdown
};

const RichTextEditor = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      onChange={(newContent) => getValue(newContent)}
    />
  );
};

export default RichTextEditor;

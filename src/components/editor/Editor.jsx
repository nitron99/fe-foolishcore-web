import React from 'react';
import { createReactEditorJS } from 'react-editor-js';

import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';

import "./styles.scss";

const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  paragraph: Paragraph,
  simpleImage: SimpleImage,
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
}

const ReactEditorJS = createReactEditorJS();

const Editor = ({blocks, readOnly, autofocus, handleInitialize}) => {
  return (
    <ReactEditorJS
      onInitialize={handleInitialize}
      defaultValue={blocks} 
      placeholder={"Write article"}
      readOnly={readOnly}
      autofocus={autofocus}
      tools={EDITOR_JS_TOOLS} />
  )
}

export default Editor;
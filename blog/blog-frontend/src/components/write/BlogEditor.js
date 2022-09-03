import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import palette from '../../lib/styles/palette';

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const EditorWrapper = styled.div`
  .wrapper-class {
    width: 50%;
    margin: 0 auto;
    margin-bottom: 4rem;
  }
  .editor {
    height: 500px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }

  button {
    border: none;
    background-color: white;
    padding: 0.5rem 1rem;
  }

  button:hover {
    background: ${palette.gray[4]};
    cursor: pointer;
  }
`;

export const getToolbarType = (name, className, isToggle) => {
  return {
    name,
    className,
    isToggle,
  };
};

const BlogEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const types = [
    getToolbarType('H1', 'header-one', false),
    getToolbarType('H2', 'header-two', false),
    getToolbarType('H3', 'header-three', false),
    getToolbarType('N', 'normal', false),
    getToolbarType('B', 'bold', true),
    getToolbarType('I', 'italic', true),
    getToolbarType('S', 'strike', true),
    getToolbarType('ol', 'ordered-list-item', false),
    getToolbarType('ul', 'unordered-list-item', false),
  ];

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const handleBlockClick = (e, blockType) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType()));
  };

  const handleTogggleClick = (e, inlineStyle) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <EditorBlock>
      <EditorWrapper>
        {types.map((type) =>
          type.isToggle ? (
            <button
              onMouseDown={(e) => handleBlockClick(e, `${type.className}`)}
              key={type.className}
            >
              {type.name}
            </button>
          ) : (
            <button
              onMouseDown={(e) => handleTogggleClick(e, `${type.className}`)}
              key={type.className}
            >
              {type.name}
            </button>
          ),
        )}
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </EditorWrapper>
    </EditorBlock>
  );
};

export default BlogEditor;

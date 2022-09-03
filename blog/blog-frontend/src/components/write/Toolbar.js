import { RichUtils } from 'draft-js';

const BLogEditorToolbar = ({ editorState, setEditorState }) => {
  const types = [
    getToolbarType('H1', 'header-one', false),
    getToolbarType('H2', 'header-two', false),
    getToolbarType('H3', 'h3', false),
    getToolbarType('N', 'normal', false),
    getToolbarType('B', 'bold', true),
    getToolbarType('I', 'italic', true),
    getToolbarType('S', 'strike', true),
    getToolbarType('ol', 'ordered-list-item', false),
    getToolbarType('ul', 'unodered-list-item', false),
  ];

  const handleBlockClick = (e, blockType) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType()));
  };

  const handleTogggleClick = (e, inlineStyle) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return types.map((type) =>
    type.isToggle ? (
      <button
        onMouseDown={(e) => handleBlockClick(e, `${type.className}`)}
        className={type.className}
        key={type.className}
      >
        {type.name}
      </button>
    ) : (
      <button
        onMouseDown={(e) => handleTogggleClick(e, `${type.className}`)}
        className={type.className}
        key={type.className}
      >
        {type.name}
      </button>
    ),
  );
};

export const getToolbarType = (name, className, isToggle) => {
  return {
    name,
    className,
    isToggle,
  };
};

export default BLogEditorToolbar;

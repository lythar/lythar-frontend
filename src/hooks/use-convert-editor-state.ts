import React, { useState, useEffect } from "react";
import { EditorState, convertFromRaw } from "draft-js";

export const useConvertEditorState = (value: any) => {
  const [editorState, setEditorState] = useState(calcState(value));

  useEffect(() => {
    setEditorState(calcState(value));
  }, [value]);

  return [editorState, setEditorState];
};

const calcState = (value: any) => {
  return value
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
    : EditorState.createEmpty();
};

import React from 'react'
import { useState, useContext, createContext } from 'react'

const DnDContext = createContext([null, (_) => { }])

export const DndProvider = ({ children }) => {
  const [type, setType] = useState(null)
  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

//custom hook to access states
export const useDnD = () => {
  return useContext(DnDContext)
};
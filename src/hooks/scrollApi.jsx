import { createContext, useContext, useReducer } from "react";

const ScrollContext = createContext();
const initialState = {
  position: {},
  element: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "change": {
      const { el, pos } = action.payload;
      return {
        ...state,
        position: pos,
        element: el,
      };
    }

    case "scroll":
      return {
        ...state,
        position: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}
function ScrollProvider({ children }) {
  const [{ position, element }, dispatch] = useReducer(reducer, initialState);

  return (
    <ScrollContext.Provider
      value={{
        position,
        element,
        dispatch,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) throw new Error("Context out of scope");
  return context;
}

export { ScrollProvider, useScroll };

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useScroll } from "../hooks/scrollApi";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();
function Menus({ children }) {
  const [openMenu, setOpenMenu] = useState("");
  const close = () => setOpenMenu("");
  const open = setOpenMenu;

  const elRef = useRef();
  const { dispatch, element } = useScroll();

  useEffect(() => {
    function handleScroll() {
      const rect = element.getBoundingClientRect();

      dispatch({
        type: "scroll",
        payload: {
          x: window.innerWidth - rect.width - rect.x,
          y: rect.y + rect.height + 8,
        },
      });
    }
    document.querySelector("main").addEventListener("scroll", handleScroll);
    return () =>
      document
        .querySelector("main")
        .removeEventListener("scroll", handleScroll);
  }, [dispatch, element]);

  return (
    <MenusContext.Provider value={{ open, close, openMenu, dispatch, elRef }}>
      {children}
    </MenusContext.Provider>
  );
}
function Toggle({ id }) {
  const { open, close, openMenu, dispatch, elRef } = useContext(MenusContext);

  function handleToggle(e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    // set elemet id in the dom
    const newId =
      Array.from(e.target.closest("button").classList).at(0) + `${id}`;
    e.target.closest("button").id = newId;

    dispatch({
      type: "change",
      payload: {
        pos: {
          x: window.innerWidth - rect.width - rect.x,
          y: rect.y + rect.height + 8,
        },
        el: document.getElementById(newId),
      },
    });

    openMenu === "" || openMenu !== id ? open(id) : close();
  }

  return (
    <StyledToggle ref={elRef} onClick={(e) => handleToggle(e)}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ children, id }) {
  const { openMenu } = useContext(MenusContext);
  const { position } = useScroll();

  if (id !== openMenu) return null;
  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body
  );
}
function Button({ children }) {
  return (
    <li>
      <StyledButton>{children}</StyledButton>
    </li>
  );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;

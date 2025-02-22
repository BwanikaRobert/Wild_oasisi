import styled from "styled-components";
import Logo from "../ui/Logo";
import MainNav from "../ui/MainNav";
const StyledSideBar = styled.aside`
  background-color: var(--color-grey-100);
  padding: 2rem;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function SideBar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
    </StyledSideBar>
  );
}

export default SideBar;

import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-100);
  padding: 2rem;
`;
function Header() {
  return <StyledHeader>Heading</StyledHeader>;
}

export default Header;

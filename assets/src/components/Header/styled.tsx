import styled from "styled-components";

export const Navbar = styled.ul`
  border: 1px solid black;

  display: inline-flex;
  width: 100%;

  li {
    list-style: none;
    margin: 2%;
  }
`

export const Auth = styled.div`
  width: 20%;
  display: inline-flex;
  margin-left: auto;
  margin-right: 2%;
  margin-top: auto;
  margin-bottom: auto;

  li {
    margin-left: auto;
    margin-right: 0;
  }
`;

import styled from "styled-components";

export const Navbar = styled.ul`
  background: #33A5FF;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 95%;

  li {
    list-style: none;
    margin: 1%;
    font-weight: bold;
  }

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    color: black;
  }

  #usrname {
    font-weight: normal;
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

  #usrname: {
    font-weight: normal;
  }
`;

import styled from "styled-components";

export const FormBlock = styled.div`
  border: 2px solid red;
  margin-left: auto;
  margin-right: auto;

  width: 50%;

  text-align: center;
`;

export const Form = styled.form`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid blue;
  padding-top: 3%;
  padding-bottom: 2%;
  input {
    width: 80%;
    height: 3vh;
    margin-bottom: 2%;
  }

  button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 22px;
    text-decoration: none;
    font-size: 16px;
    display: inline-block;
  }

  a {
    display: inline-block;
    text-decoration: none;

  }
`;

import styled from "styled-components";

export const FormBlock = styled.div`
  margin-left: auto;
  margin-right: auto;          
  width: 50%;
  text-align: center;          
`;  

export const Form = styled.form`
  width: 60%;
  margin-left: auto;           
  margin-right: auto;          
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
  }   

  a { 
    text-decoration: none;     

  }

  textarea {
    width: 80%;
  }
`; 

export const PostBlock = styled.div`
  height: 40vh;
  width: 80%;
  margin: auto;
  align-items: center;
  border: 1px solid black;
  display: block;

  button {
    background-color: red; 
    border: none;
    color: white;
    padding: 10px 22px;        
    text-decoration: none;     
    font-size: 16px;
    float: right;
  }     

  a {
    text-decoration: none;
  }
`;

export const EditTitleBlock = styled.div`
  display: block;
  font-weight: bold;
  background: #EBF0F5;
  height: 5vh;
  line-height: 5vh;
  text-align: center;
  
`;

export const EditPostBody = styled.div`
  display: block;
  text-align: center;
  height: 29vh;
  line-height: 10vh;
`;

export const EditBtnBlock = styled.div`
  height: 6vh;
  line-height: 6vh;
  align-items: center;
  display: block;
  
  a {
    font-size: 16px;
    padding: 10px 10px 10px 10px;
  }
`;

export const TitleBlock = styled.div`
  display: block;
  font-weight: bold;
  background: #EBF0F5;
  height: 5vh;
  line-height: 5vh;
  text-align: center;
  
`;

export const PostBody = styled.div`
  display: block;
  text-align: center;
  height: 29vh;
  line-height: 10vh;
`;

export const BtnBlock = styled.div`
  height: 6vh;
  line-height: 6vh;
  align-items: center;
  display: block;
  a {
    font-size: 16px;
    padding: 10px 10px 10px 10px;
  }
`;

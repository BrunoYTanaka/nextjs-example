import { shade } from 'polished'
import styled from 'styled-components'


export const Container = styled.header`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 30px 40px 20px 40px;


  > img {
    border-radius:50%
  }

`

export const LoginContainer = styled.div`
  border: 2px solid #000;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.2s background-color;

  > a {
    color: #000;
    text-decoration:none;
  }

  &:hover{
    background: ${shade(0.2, '#fff')};
  }
`

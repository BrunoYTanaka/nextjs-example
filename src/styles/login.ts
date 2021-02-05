import { shade } from 'polished'
import styled, { css } from 'styled-components'

interface ContainerProps {
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;

  form {
    margin: 0 auto;
    min-width: 500px;
    h1 {
      margin-bottom: 24px;
      text-align: center;
    }

    input {
      border: 2px solid #000;
      color: #666360;
      padding: 16px;
      border-radius: 10px;
      width: 100%;
      margin-bottom: 14px;
      &::placeholder {
        color: #666360;
      }
      ${props =>
        props.isErrored &&
        css`
          border-color: #c53030;
        `}
    }
    button {
      background: #8c8cb5;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      margin-top: 16px;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#8c8cb5')};
      }
    }
  }
`

export const Error = styled.span`
  height: 20px;
  color: #c53030;
`

export const Loading = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  background: #8c8cb5;
  height: 56px;
  border-radius: 10px;
  border: 0;
  color: #312e38;
  width: 100%;
  margin-top: 16px;
  font-weight: 500;
`

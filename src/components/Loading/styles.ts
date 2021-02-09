import styled, { keyframes } from 'styled-components'

export const LoadingContainer = styled.div`
  height: 100vh;
  max-width: 960px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 0 auto;
  text-align: center;
`

const dots = keyframes`
 0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);
  }
  40% {
    color: black;
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .25em 0 0 black,
      .5em 0 0 rgba(0,0,0,0);}
  80%, 100% {
    text-shadow:
      .25em 0 0 black,
      .5em 0 0 black;
  }
`
export const DotsLoading = styled.div`
  font: 300 8em/150% Impact;
  color: black;

  &::after {
    content: '.';
    animation: ${dots} 1s steps(5, end) infinite;
  }
`

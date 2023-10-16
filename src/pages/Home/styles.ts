import { styled } from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    /* height: 0.5rem; */

    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseCountdownbutton = styled.button`
  flex: 1;
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme['gray-100']};

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownbutton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled)&:hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownbutton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled)&:hover {
    background: ${(props) => props.theme['red-700']};
  }
`
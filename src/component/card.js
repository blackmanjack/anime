import styled from "@emotion/styled";

const Card = styled.div`
  height: 350px;
  padding: 10px;
  border-radius: 8px;
  background-color: rgb(31, 31, 31);
  display: grid;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    background-color: #3e3e3e;
  }
`;

export default Card;

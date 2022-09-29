import React, { useState } from 'react';
import './App.css';
import styled from "styled-components";

const OuterDiv = styled.div`
  display: flex;
  position: relative;
`;

const Number = styled.div<{selected: boolean, index: number}>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  left: ${props => props.index * -20}px;
  z-index: ${props => props.index}; // Not strictly necessary

  height: 120px;
  width: 80px;
  border-radius: 20%;

  font-size: 80px;

  color: ${props => props.selected ? "red" : "black"};
  border: 4px solid ${props => props.selected ? "red" : "black"};

  background-color: white;

`
function App() {
  const [selected, setSelected] = useState<boolean[]>([]);

  const toggleSelected = (index: number) => {
     const newSelected = [...selected];
     newSelected[index] = !newSelected[index];
     setSelected(newSelected);
  }

  const elems : JSX.Element[] = [];

  for (let i = 0; i < 10; ++i) {
    elems.push(<Number 
      selected={selected[i]} 
      index={i}

      key={i}
      onClick={()=>toggleSelected(i)}>
      {i}
    </Number>);
  }

  return <OuterDiv>{elems}</OuterDiv>
}

export default App;

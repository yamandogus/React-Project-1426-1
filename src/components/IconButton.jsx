/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa6";
import styled from "styled-components";

const ButtonIcons=styled.button`
cursor: pointer;
border: none;
background: transparent;
`
const IconButton = ({deleteClick}) => {
  return (
    <ButtonIcons
    onClick={(e)=>{
        e.stopPropagation()
        deleteClick()
    }}
    >
        <FaTrash/>
    </ButtonIcons>
  )
}

export default IconButton
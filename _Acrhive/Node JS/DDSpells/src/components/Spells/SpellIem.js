import { useState } from "react"
import { useEffect } from "react/cjs/react.production.min"
import Backdrop from "../Backdrop"
import DescriptionToolTip from "../DescriptionTooltip"
import PopUpWindow from "../PopUpWindow"

import './Spelltem.css'

const SpellItem = (props) => {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    //open pop when delete is open
    const OpenPopUp = () => {
       setModalIsOpen(true)
    }

    //if no
    //close pop up
    const closePopUp = () =>{
        setModalIsOpen(false)
    }

    //if yes this
    //then close pop up
    const DeleteSpells = async (event) => {
        let id = props.id;
        console.log(id);
    
        //delete from database
        let getDelete = await fetch("https://s6u6rjds0m.execute-api.us-east-1.amazonaws.com/dev/spells/delete", 
        {
            method: 'POST',
            body: JSON.stringify({
             id: id
            }),
            headers: {
                'Content-Type': 'application/json'
              }
        });
        //Update Table
        if(props.updateTable){
            console.log("Update Table")
            await props.updateTable();
        } else {
            alert("Table Needs to Update")
        }

        closePopUp()
        
        
    }

    return(
        <>
            <tr className="tooltip">
                    <td className='SpellTH'>{props.name}</td>
                    <td>{props.castingTime}</td>
                    <td>{props.spell_range}</td>
                    <td>{props.components}</td>
                    <td>{props.duration}</td>
                    <td><button onClick={OpenPopUp}>Delete</button></td>
                    {modalIsOpen ? <PopUpWindow onCancel={closePopUp} onConfirm={DeleteSpells}></PopUpWindow> : null}
                    {modalIsOpen ? <Backdrop onCancel={closePopUp}></Backdrop> : null}
                    <DescriptionToolTip spellId={props.id}> </DescriptionToolTip>
            </tr>
        </>
    );
}

export default SpellItem;
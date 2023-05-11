import react, {useState, useEffect, useContext} from 'react'

import './DescriptionTooltip.css'

const DescriptionToolTip = (props) => {

    const [spellDesc, getDescription] = useState('')

    const getDesc = async () => {
        console.log(props.spellId)
        var getSpellDesc = await fetch("https://s6u6rjds0m.execute-api.us-east-1.amazonaws.com/dev/spells/getDesc", 
        {
           method: 'POST',
           body: JSON.stringify({id: props.spellId}),
           headers: {
             'Content-Type': 'application/json'
           }
        });
        var spellDesc = await getSpellDesc.json();
        console.log(spellDesc);
        getDescription(spellDesc[0]);
     }
     useEffect(() => {
        getDesc()

     }, [])



    return (
      <div className='tooltip'>
          <span className='tooltiptext'>{spellDesc ? spellDesc.Description : ""}</span>
        </div>  
    );
}

export default DescriptionToolTip;
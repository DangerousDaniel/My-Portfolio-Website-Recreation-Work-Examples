import react, {useState, useEffect, useContext} from 'react'
import SpellForm from './components/SpellForm/SpellForm'
import SpellItem from './components/Spells/SpellIem'
import SpellRows from './components/Spells/SpellRows'
const testData_spellData = [
  {
    "name": "Acid Arrow",
    "castingTime": "1 action",
    "range": "90 feet",
    "components": "VSM",
    "duration": "Instantaneous",
    "description": "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.",
    "higherLevel": "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.",
    "material": "Powdered rhubarb leaf and an adder's stomach.",
    "ritual": "Ritual: false",
    "id": 1
  },
  {
    "name": "Irresistible Dance",
    "castingTime": "1 action",
    "range": "30 feet",
    "components": "V",
    "duration": "Up to 1 minute",
    "description": "Choose one creature that you can see within range. The target begins a comic dance in place: shuffling, tapping its feet, and capering for the duration. Creatures that can't be charmed are immune to this spell.A dancing creature must use all its movement to dance without leaving its space and has disadvantage on dexterity saving throws and attack rolls. While the target is affected by this spell, other creatures have advantage on attack rolls against it. As an action, a dancing creature makes a wisdom saving throw to regain control of itself. On a successful save, the spell ends.",
    "higherLevel": "undefined",
    "ritual": "Ritual: false",
    "id": 2
  },
  {
    "name": "Mass Cure Wounds",
    "castingTime": "1 action",
    "range": "60 feet",
    "components": "VS",
    "duration": "Instantaneous",
    "description": "A wave of healing energy washes out from a point of your choice within range. Choose up to six creatures in a 30-foot-radius sphere centered on that point. Each target regains hit points equal to 3d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.",
    "higherLevel": "When you cast this spell using a spell slot of 6th level or higher, the healing increases by 1d8 for each slot level above 5th.",
    "ritual": "Ritual: false",
    "id": 3
  }
]

const App = () => {

  const [spells, setSpell] = useState(testData_spellData)

  useEffect(() => {
    const Test = async () => {
      var _fetchSpells = await GetSpells();
      //console.log(_fetchSpells);
      //setSpell(_fetchSpells);
    }

    Test();
  }, [])

  useEffect(() => {
    console.log(spells);
  }, [spells]);

  const GetSpells = () => {
    return new Promise(async (resolve) => {
      let request =  await fetch("https://s6u6rjds0m.execute-api.us-east-1.amazonaws.com/dev/spells/getAll",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    
      let json = await request.json();
      setSpell(json)
      resolve(json)
    });
  }

  const addSpellDataHandler = (spell) => {
    console.log(spell);

    const addSpell = async () => {
     var addSpellResult = await fetch("https://s6u6rjds0m.execute-api.us-east-1.amazonaws.com/dev/spells/add", 
     {
        method: 'POST',
        body: JSON.stringify(spell),
        headers: {
          'Content-Type': 'application/json'
        }
     });
     var spells = await addSpellResult.json();
     setSpell(spells);
    //  setSpell(prevSpellData => {
    //   return[spell, ...prevSpellData]
    // })
    }
    addSpell();
  }


  return (
    <div>
      <SpellForm onAddSpell={addSpellDataHandler}></SpellForm>
      <table>
        <SpellRows></SpellRows>
        {/* Get all ddSpells from a objects */}
        {spells.map((s) => {
          return(
            <SpellItem
            updateTable={GetSpells}
            key={s.id}
            name={s.name}
            castingTime={s.castingTime}
            spell_range={s.spell_range}
            components={s.components}
            duration={s.duration}
            id={s.id}
            ></SpellItem>
          );
        })}       
      </table>
    </div>
  );
}

export default App;

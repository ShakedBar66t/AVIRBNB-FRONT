
import { TbBuildingCastle } from "react-icons/tb";
import { FaMountain, FaSwimmingPool, FaFortAwesome, FaSkiing } from "react-icons/fa"
export function LabelsFilter() {

    const stayLabels = [{ name: 'Amazing views', icon: <FaMountain /> }, { name: 'Castles', icon: <TbBuildingCastle /> },
    { name: 'Amzaing pools', icon: <FaSwimmingPool /> }, { name: 'Ski-in/out', icon: <FaSkiing /> },
    { name: '', icon: '' }, { name: '', icon: '' }, { name: '', icon: '' }, { name: '', icon: '' },
    { name: '', icon: '' }, { name: '', icon: '' }, { name: '', icon: '' }, { name: '', icon: '' },
    { name: '', icon: '' }, { name: '', icon: '' }, { name: '', icon: '' }, { name: '', icon: '' },
    { name: '', icon: '' }, { name: '', icon: '' }, { name: '', icon: '' }, { name: '', icon: '' },
    ]

    return (
        <div>
            {stayLabels[0].icon}
            {/* {stayLabels.map((label, index) => {
                return < button key={index} > <span>{label}</span></button>

            })} */}

        </div >

    )

}

// {name: Castles}, {name:  Amzaing pools}, {name: Mansions},
// {name: Ski-in/out}, {name: Luxe}, {name: OMG!}, {name: Grand pianos}, {name: Houserboats},
// {name: Top of the world}, {name: Islands}, {name: New}, {name: Tranding}, {name: Cabins}, {name: Boats}, {name: Tiny homes}, {name: Tropical},
// {name: Bed & breakfasts}, {name: Design}, {name: Beachfront}, {name: Farms}, {name: Arctic}, {name: Caves}, {name: Play}, {name: Iconic cities}]
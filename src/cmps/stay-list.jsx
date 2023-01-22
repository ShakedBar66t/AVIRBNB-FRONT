import { StayPreview } from "./stay-preview"

export function StayList({stays,onToggleLike}){
    return <section className="stay-list">

        {stays.map(stay=>{
            return <StayPreview key={stay._id} stay={stay} onToggleLike={onToggleLike}/>
        })}
    </section>
}
import { TripPreview } from "./trip-preview"

export function TripList({ trips, }) {

    console.log('trips!!!!!!!!!!!!', trips)

    return <section className="trip-list-container">

        <h3 className="trip-list-title">Upcoming resarvations</h3>

        <section className="trip-list">

            {trips.map(trip => {

                return <TripPreview trip={trip} key={trip._id} />
            })}
        </section>

    </section>


}
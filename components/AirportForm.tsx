'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Place {
    coordinates: {
        lat: number,
        lng: number
    },
    entityId: number,
    iata: string,
    name: string,
    parentId: number,
    type: string
}

interface Quote {
    inboundLeg: Leg,
    outboundLeg: Leg,
    minPrice: Price,
    isDirect: boolean,
}

interface Price {
    amount: number,
    unit: string,
    updateStatus: string,
}
interface Leg {
    departureDateTime: {
        year: number,
        month: number,
        day: number,
        hour: number,
    }
    destinationPlaceId: string,
    marketingCarrierId: string,
    originPlaceId: string,
    quoteCreationTimestamp: string,
}

export default function AirportForm() {
    const router = useRouter()
    const [quotes, setQuotes] = useState<{[key: string]: Quote}>({})
    const [places, setPlaces] = useState<{[key: string]: Place}>({})

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'U fucking'}),
        }).then((res) => res.json());

        console.log("Res: ", response)
        let quotesInOrder = response.content.results.quotes;
        
        setQuotes(response.content.results.quotes)
        setPlaces(response.content.results.places)
    }

    const checkPriceForPlace = async (iata: string) => {
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ iata: iata}),
        }).then((res) => res.json());

        console.log("PLACE RESULT: ", response)
    }

    const sortedQuotes = Object.entries(quotes).sort((a, b) => {
        return a[1].minPrice.amount - b[1].minPrice.amount;
    });

    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="p-1 outline-none focus-within:outline-indigo-600 focus-within:outline-offset-2 focus-within:outline-2 overflow-hidden bg-white h-12 max-w-full w-80 rounded-lg flex items-center">
                <input className="block w-full outline-none border-0 px-2 bg-transparent py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" type="text" placeholder="Departure airport" />
                <button className="h-full px-5 bg-indigo-500 rounded-md" type="submit">Search</button>
            </form>
            <div className="w-full max-w-3xl p-5 flex flex-row flex-wrap justify-center items-center gap-6">
                {sortedQuotes.map(([key, quote]) => (
                    <div key={key} className="px-3 py-6 w-full flex flex-row justify-between items-center bg-white rounded-md text-black">
                        <div className="flex flex-col justify-start items-start">
                            {/* <div>Direct: {quote.isDirect ? 'Yes' : 'No'}</div> */}
                            <div>Destination: <b>{places[quote.outboundLeg.destinationPlaceId]?.name}</b></div>
                            <div>Price: <b>{quote.minPrice.amount}</b></div>
                        </div>
                        <button onClick={() => checkPriceForPlace(places[quote.outboundLeg.destinationPlaceId]?.iata)} className=" bg-indigo-700 px-8 py-3 rounded-md text-white font-bold">Update price</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { iata } = await req.json();
    if (!iata) {
        return new NextResponse("Missing iata", {
            status: 400,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }

    const queryLegs = [
        {
            "originPlaceId": {
                "iata": "HEL",
            },
            "destinationPlaceId": {
                "iata": iata,
            },
            "date": {
                "year": 2024,
                "month": 3,
                "day": 11
            }
        }
    ];

    const requestBody = JSON.stringify({
        query: {
            market: 'UK',
            locale: 'en-GB',
            currency: 'GBP',
            queryLegs: queryLegs,
            adults: '2',
            cabinClass: 'CABIN_CLASS_ECONOMY'
        }
    });

    const response = await fetch('https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create', {
        method: 'POST',
        headers: {
            'x-api-key': 'sh428739766321522266746152871799',
            'Content-Type': 'application/json',
        },
        body: requestBody,
    }).then((res) => res.json());

    return new NextResponse(JSON.stringify(response), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}
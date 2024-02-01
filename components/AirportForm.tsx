'use client'
import { useRouter } from "next/navigation"
export default function AirportForm() {
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'U fucking'}),
        }).then((res) => res.json());

        console.log("Res: ", response)
    }
    return (
        <form onSubmit={handleSubmit} className="p-1 outline-none focus-within:outline-indigo-600 focus-within:outline-offset-2 focus-within:outline-2 overflow-hidden bg-white h-12 max-w-full w-80 rounded-lg flex items-center">
            <input className="block w-full outline-none border-0 px-2 bg-transparent py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" type="text" placeholder="Departure airport" />
            <button className="h-full px-5 bg-indigo-500 rounded-md" type="submit">Search</button>
        </form>
    )
}
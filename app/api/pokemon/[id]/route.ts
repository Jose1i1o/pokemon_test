import { NextRequest } from "next/server";
import { POKEMON_API } from "../../../utils/constants";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;

	try {
		const response = await fetch(`${POKEMON_API}/${id}`);

		if (!response.ok) {
			return Response.json({ error: "Pokemon not found" }, { status: 404 });
		}

		const pokemon = await response.json();
		return Response.json(pokemon);
	} catch {
		return Response.json({ error: "Failed to fetch pokemon" }, { status: 500 });
	}
}

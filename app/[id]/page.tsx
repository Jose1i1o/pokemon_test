import Image from "next/image";
import { WeightConverter } from "../components";
import { MY_PUBLIC_API } from "../utils";

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ unit?: string }>;
}) {
	const { id } = await params;
	const { unit = "kg" } = await searchParams;

	const response = await fetch(`${MY_PUBLIC_API}/api/pokemon/${id}`);
	const pokemon = await response.json();

	return (
		<div>
			<h1>{pokemon.name}</h1>
			<div>
				<Image
					src={pokemon.sprites.front_default}
					alt={pokemon.name}
					width={200}
					height={200}
					loading="lazy"
				/>
			</div>
			<div>
				<p>
					<strong>ID:</strong> {pokemon.id}
				</p>
				<p>
					<strong>Height:</strong> {(pokemon.height / 10).toFixed(1)} m
				</p>
			</div>
			<WeightConverter
				weight={pokemon.weight}
				currentUnit={unit}
				pokemonId={id}
			/>

			<div>
				<p>
					<strong>Base Experience:</strong> {pokemon.base_experience}
				</p>
			</div>
			<div>
				<p>
					<strong>Type(s):</strong>{" "}
					{pokemon.types
						.map((typeObj: { type: { name: string } }) => typeObj.type.name)
						.join(", ")}
				</p>
			</div>
			<div>
				<p>
					<strong>Abilities:</strong>{" "}
					{pokemon.abilities
						.map(
							(ability: { ability: { name: string } }) => ability.ability.name
						)
						.join(", ")}
				</p>
			</div>
		</div>
	);
}

"use client";

import React, { useState, useEffect } from "react";
import { data } from "@/app/utils";
import Link from "next/link";

const Pokemon = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	const filteredPokemon = data?.filter((pokemon) =>
		pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
	);

	return (
		<section>
			<article>
				<h1>Pokemon List</h1>
				<input
					type="text"
					placeholder="Search Pokemon..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</article>
			<ul>
				{filteredPokemon?.map(({ id, name }) => (
					<li key={id}>
						<Link href={`${id}`}>{name}</Link>
					</li>
				))}
			</ul>
			{debouncedSearchTerm && filteredPokemon?.length === 0 && (
				<p>{`No Pokemon found matching "${debouncedSearchTerm}"`}</p>
			)}
		</section>
	);
};

export default Pokemon;

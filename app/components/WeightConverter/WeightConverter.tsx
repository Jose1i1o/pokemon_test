"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { WeightConverterProps } from "./WeightConverter.types";

const WeightConverter = ({
	weight,
	currentUnit,
	pokemonId,
}: WeightConverterProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const convertWeight = (weightInHectograms: number, unit: string) => {
		switch (unit) {
			case "kg":
				return (weightInHectograms / 10).toFixed(1);
			case "lbs":
				return ((weightInHectograms / 10) * 2.20462).toFixed(1);
			default:
				return weightInHectograms.toString();
		}
	};

	const handleUnitChange = (newUnit: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("unit", newUnit);
		router.push(`/${pokemonId}?${params.toString()}`);
	};

	return (
		<div>
			<p>
				<strong>Weight:</strong> {convertWeight(weight, currentUnit)}{" "}
				{currentUnit}
				<select
					value={currentUnit}
					onChange={(e) => handleUnitChange(e.target.value)}
				>
					<option value="kg">kg</option>
					<option value="lbs">lbs</option>
				</select>
			</p>
		</div>
	);
};

export default WeightConverter;

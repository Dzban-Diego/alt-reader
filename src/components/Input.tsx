"use client";
import { handleGetAlt } from "@/app/actions/getAlt";
import { useState } from "react";

export function Input() {
	const [imgs, setImgs] = useState<{ src: string, alt: string }[]>([])

	async function handleInput(url: string) {
		if (url.length < 15) return

		handleGetAlt(url).then(setImgs)
	}

	return (
		<>
			<input
				className="text-center rounded-md text-xl text-black outline-0 p-3 shadow-xl border-neutral-200 border"
				type="text"
				onChange={(e) => handleInput(e.target.value)}
				placeholder="Url"
			/>
			{imgs.map(img => (
				<div key={img.alt} className="w-full lg:w-[50vw]">{img.src === "" || img.alt === "" ? <></>
					:
					<>
						<img src={img.src.substring(0, 4) === "http" ? img.src : `https://wol.jw.org/${img.src}`} alt={img.alt} className="my-3" />
						<span className="text-xl text-black ">{img.alt}</span>
					</>
				}</div>

			))}
		</>
	);
}

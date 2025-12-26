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
		<div className="flex flex-col gap-3">
			<input
				className="text-center rounded-md text-xl text-black outline-0 p-3 w-full shadow-xl border-neutral-200 border"
				type="text"
				onChange={(e) => handleInput(e.target.value)}
				placeholder="Url"
			/>
			{imgs.map(img => (
				<>{img.src === "" || img.alt === "" ? <></>
					:
					<div key={img.alt} className="w-full">
						<img src={img.src.substring(0, 4) === "http" ? img.src : `https://wol.jw.org/${img.src}`} alt={img.alt} className="w-full m-3" />
						<span className="text-xl text-black ">{img.alt}</span>
					</div>
				}</>

			))}
		</div >
	);
}

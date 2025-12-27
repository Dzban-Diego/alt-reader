"use client";
import { handleGetAlt } from "@/app/actions/getAlt";
import { useState } from "react";
import Image from "next/image";

export function Input() {
	const [value, setValue] = useState("")
	const [imgs, setImgs] = useState<{ src: string, alt: string }[]>([])

	async function handleInput(url: string) {
		setValue(url)
		if (url.length < 15) return

		handleGetAlt(url).then(setImgs)
	}

	async function handlePaste() {
		const fromClip = await navigator.clipboard.readText()
		handleInput(fromClip)
	}

	return (
		<>
			<div className="relative">
				<input
					className="text-center rounded-md text-xl text-black outline-0 p-3 shadow-xl border-neutral-200 border w-full"
					type="text"
					value={value}
					onChange={(e) => handleInput(e.target.value)}
					placeholder="Url"
				></input>

				<button onClick={handlePaste} className="absolute right-3 top-1/2 -translate-y-1/2">
					<Image src="/paste.svg" alt="paste" width={30} height={30} />
				</button>
			</div>

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

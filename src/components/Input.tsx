"use client";
import { handleGetAlt } from "@/app/actions/getAlt";
import { useState } from "react";
import Image from "next/image";

export function Input() {
	const [value, setValue] = useState("")
	const [imgs, setImgs] = useState<{ src: string, alt: string }[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	async function handleInput(url: string) {
		setValue(url)
		if (url.length < 15) return
		setError(false)
		setLoading(true)


		try {
			const params = new URL(url).searchParams;
			const docid = params.get("docid");

			if (docid !== null) {
				handleGetAlt(`https://wol.jw.org/pl/wol/d/r12/lp-p/${docid}`).then(setImgs).then(
					() => setLoading(false)
				).catch(e => {
					setLoading(false)
					setError(true)
					console.error(e)
				})

				return
			}
		} catch {
			setLoading(false)
		}

		handleGetAlt(url).then(setImgs).then(
			() => setLoading(false)
		).catch(e => {
			setLoading(false)
			setError(true)
			console.error(e)
		})
	}

	async function handlePaste() {
		const fromClip = await navigator.clipboard.readText()
		handleInput(fromClip)
	}

	return (
		<>
			<div className="relative">
				<input
					className={`text-center rounded-md text-xl text-black outline-0 p-3 shadow-xl ${error ? "border-red" : "border-neutral-200"} border w-full`}
					type="text"
					value={value}
					onChange={(e) => handleInput(e.target.value)}
					placeholder="Url"
				></input>

				{/*
				<button onClick={handlePaste} className="absolute right-3 top-1/2 -translate-y-1/2">
					<Image src="/paste.svg" alt="paste" width={30} height={30} />
				</button>
				*/}
			</div>

			{
				loading ? <div className="flex items-center justify-center">
					<div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
				</div> : <></>
			}

			{imgs.map(img => (
				<div key={img.alt + img.src} className="w-full lg:w-[50vw]">{img.src === "" || img.alt === "" ? <></>
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

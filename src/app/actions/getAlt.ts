"use server"

export async function handleGetAlt(url: string) {
	return fetch(url).then(data => data.text()).then(data => {

		const regex = /<img[^>]*\b src="([^"]+)"[^>]*\balt="([^"]*)"[^>]*>/g;

		const results: { src: string; alt: string }[] = [];
		let match;
		while ((match = regex.exec(data)) !== null) {
			results.push({ src: match[1], alt: match[2] });
		}

		return results;
	})
}

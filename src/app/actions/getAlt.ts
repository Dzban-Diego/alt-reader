"use server"

import https from "https";

const agent = new https.Agent({ keepAlive: true, maxSockets: 50 });

export async function handleGetAlt(url: string) {
	return fetch(url, {
		...agent,
		headers: {
			"User-Agent": "Mozilla/5.0",
			"Accept-Encoding": "gzip, deflate, br",
		},
		keepalive: true
	}).then(data => data.text()).then(data => {
		const regex = /<img[^>]*\b src="([^"]+)"[^>]*\balt="([^"]*)"[^>]*>/g;

		const results: { src: string; alt: string }[] = [];
		let match;
		while ((match = regex.exec(data)) !== null) {
			results.push({ src: match[1], alt: match[2] });
		}

		return results;
	})
}

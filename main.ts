import { route, type Route } from "@std/http/unstable-route"
import { fetchEntries } from "./src/firebase.ts"

const routes: Route[] = [
	{
		method: "GET",
		pattern: new URLPattern({ pathname: "/" }),
		handler: () => new Response("The interface"),
	},
	{
		method: "POST",
		pattern: new URLPattern({ pathname: "/add" }),
		handler: () => new Response("add a new entry")
	},
	{
		method: "GET",
		pattern: new URLPattern({ pathname: "/entries" }),
		handler: async () => {
			const entries = await fetchEntries()
			return new Response(`entries: ${ JSON.stringify(entries) }`)
		}
	},
]

function defaultHandler(_request: Request) {
	return new Response("Not found", { status: 404 })
}

Deno.serve(route(routes, defaultHandler))

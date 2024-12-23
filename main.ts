import { route, type Route } from "@std/http/unstable-route"
import { createNewEntry } from "./src/firebase.ts"

const routes: Route[] = [
	{
		method: "GET",
		pattern: new URLPattern({ pathname: "/" }),
		handler: () => new Response("The interface"),
	},
	{
		method: "POST",
		pattern: new URLPattern({ pathname: "add" }),
		handler: () => new Response("add new")
	}
]

function defaultHandler(_request: Request) {
	return new Response("Not found", { status: 404 })
}

Deno.serve(route(routes, defaultHandler))

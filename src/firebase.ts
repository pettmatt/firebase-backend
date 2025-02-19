import "jsr:@std/dotenv/load"
import { initializeApp } from "npm:firebase/app"
import { getDatabase, ref, set } from "npm:firebase/database"
import { getFirestore, collection, getDocs } from "npm:firebase/firestore/lite"

const firebaseConfig = {
    apiKey: Deno.env.get("firebase_API_key"),
    authDomain: Deno.env.get("firebase_auth_domain"),
    projectId: Deno.env.get("firebase_project_id"),
    storageBucket: Deno.env.get("storage_bucket"),
    messagingSenderId: Deno.env.get("messaging_sender_id"),
    appId: Deno.env.get("app_id"),
}

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const database = getDatabase(app)

export async function fetchEntryStructure() {
    const entries = collection(firestore, Deno.env.get("collection") ?? "")
    const entrySnapshot = await getDocs(entries)
    const structure = entrySnapshot.docs.map(doc => {
		const data = doc.data()
		const entries = Object.entries(data)
		const structure: Record<string, any> = {}

		for (const [key, value] of entries) {
			structure[key] = typeof value
		}

		return structure
	})
    return structure
}

export async function fetchEntries() {
    const entries = collection(firestore, Deno.env.get("collection") ?? "")
    const entrySnapshot = await getDocs(entries)
    const entryList = entrySnapshot.docs.map(doc => doc.data())
    return entryList
}

export function createNewEntry(id: string, data: any) {
    const collection = Deno.env.get("collection")
    set(ref(database, collection + `/${id}`), data)
        .then(() => 
            console.log("Data saved")
        )
        .catch(error =>
            console.log("Error occured while saving new entry:", error)
        )
}
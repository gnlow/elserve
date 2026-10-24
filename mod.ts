import { parseArgs } from "https://esm.sh/jsr/@std/cli@1.0.32"
import { createServer } from "npm:vite@8.3.5"
import { plugin } from "./src/plugin.ts"
import template from "./index.html" with { type: "text" }
import { resolve } from "https://esm.sh/jsr/@std/path@1.1.6"

const { _: [fileName] } = parseArgs(Deno.args)

const server = await createServer({
    root: Deno.cwd(),
    plugins: [plugin(template.replace("%src%", resolve(""+fileName)))],
})

await server.listen()

server.printUrls()

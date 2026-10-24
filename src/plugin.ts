import type { Plugin, ViteDevServer } from "npm:vite@8.3.5"

export const plugin =
(template: string): Plugin => ({
    name: "vite-plugin-elserve",
    configureServer(server: ViteDevServer) {
        return () => {
            server.middlewares.use(async (req, res, next) => {
                if (req.url == "/" || req.url == "/index.html") {
                    const rawHtml = template

                    try {
                        const html = await server.transformIndexHtml(req.url, rawHtml)
                        res.setHeader("Content-Type", "text/html")
                        res.statusCode = 200
                        res.end(html)
                    } catch (e) {
                        next(e)
                    }
                    return
                }
                next()
            })
        }
    },
})

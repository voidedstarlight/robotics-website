import { createReadStream } from "fs";
import type { FastifyInstance } from "fastify";
import { join } from "path";

function attachPageRoutes(server: FastifyInstance) {
	server.get("/", (_, reply) => {
		const stream = createReadStream(join(__dirname, "web/public/index.html"));
		reply.type("type/html").send(stream);
	});
}

export default attachPageRoutes;

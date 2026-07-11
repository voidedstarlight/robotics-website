import {
	fastify, type FastifyInstance,
	type FastifyReply, type FastifyRequest
} from "fastify";

import fastifyStatic from "@fastify/static";
import { join } from "path";

function defineRoutes(server: FastifyInstance) {
	server.post("/a/contact", (request, reply) => {
		reply.send("Email functionality");
	});
}

function webserver() {
	const server = fastify({
		logger: {
			level: "warn"
		}
	});

	server.register(fastifyStatic, {
		prefix: "/",
		root: join(__dirname, "public")
	});

	defineRoutes(server);

	return server;
}

const server = webserver();

async function serverlessHandler(request: FastifyRequest, reply: FastifyReply) {
	await server.ready();
	server.server.emit("request", request, reply);
}

export default serverlessHandler;

if (process.env.NODE_ENV !== "production") {
	server.listen({
		host: "0.0.0.0",
		port: 5100
	}, err => {
		if (err) {
			console.warn("[server] failed to start fastify");
			console.warn(err);
			process.exit(1);
		} else {
			console.log("[server] http://0.0.0.0:5100");
		}
	});
}

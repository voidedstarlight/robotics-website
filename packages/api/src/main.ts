import {
	fastify, type FastifyInstance,
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
			level: "warn",
			transport: {
				target: "pino-pretty"
			}
		}
	});

	server.register(fastifyStatic, {
		prefix: "/",
		root: join(__dirname, "public")
	});

	defineRoutes(server);

	server.listen({
		host: "0.0.0.0",
		port: 5100
	}, err => {
		if (err) {
			server.log.warn("[server] failed to start fastify");
			server.log.warn(err);
			process.exit(1);
		} else {
			server.log.info("[server] http://0.0.0.0:5100");
		}
	});
}

webserver();

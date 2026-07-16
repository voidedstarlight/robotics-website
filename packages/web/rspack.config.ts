import { resolve } from "path";
import { rspack } from "@rspack/core";

export default {
	module: {
		rules: [
			{
				test: /.*/,
				type: "asset/resource"
			}
		]
	},
	plugins: [
		new rspack.CopyRspackPlugin({
			patterns: [
				{
					from: "src"
				},
			],
		})
	],
	output: {
		path: resolve(process.cwd(), "../../dist/public")
	},
	resolve: {
		extensions: [".html", ".js", ".json", ".ts"]
	},
	watchOptions: {
		poll: 1000
	}
}

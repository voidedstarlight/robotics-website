import { globalIgnores } from "eslint/config";
import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
	globalIgnores(["**/dist", "**/node_modules"]),
	{
		plugins: {
			"@stylistic": stylistic
		},
		rules: {
			"@stylistic/array-bracket-spacing": ["warn", "never"],
			"@stylistic/arrow-parens": ["warn", "as-needed"],
			"@stylistic/arrow-spacing": ["warn", {
				after: true, before: true
			}],
			"@stylistic/block-spacing": ["warn", "always"],
			"@stylistic/brace-style": ["warn", "1tbs", {
				allowSingleLine: true
			}],
			"@stylistic/comma-dangle": ["warn", "never"],
			"@stylistic/comma-spacing": ["warn", {
				after: true, before: false
			}],
			"@stylistic/comma-style": ["warn", "last"],
			"@stylistic/computed-property-spacing": ["warn", "never", {
				enforceForClassMembers: true
			}],
			"@stylistic/dot-location": ["warn", "property"],
			"@stylistic/eol-last":"warn",
			"@stylistic/generator-star-spacing": ["warn", {
				after: true, before: false
			}],
			"@stylistic/indent": ["warn", "tab"],
			"@stylistic/keyword-spacing": ["warn", {
				after: true, before: true
			}],
			"@stylistic/lines-between-class-members": ["warn", "always"],
			"@stylistic/max-statements-per-line": ["warn", { max: 1 }],
			"@stylistic/member-delimiter-style": ["warn", {
				multiline: {
					delimiter: "semi",
					requireLast: true
				},
				multilineDetection: "brackets",
				overrides: {
					interface: {
						multiline: {
							delimiter: "semi",
							requireLast: true
						}
					}
				},
				singleline: {
					delimiter: "semi"
				}
			}],
			"@stylistic/multiline-ternary": ["warn", "always-multiline"],
			"@stylistic/new-parens":"warn",
			"@stylistic/no-extra-parens": ["warn", "functions"],
			"@stylistic/no-floating-decimal":"warn",
			"@stylistic/no-mixed-operators": ["warn", {
				allowSamePrecedence: true,
				groups: [
					["==", "!=", "===", "!==", ">", ">=", "<", "<="],
					["&&", "||"],
					["in", "instanceof"]
				]
			}],
			"@stylistic/no-mixed-spaces-and-tabs":"warn",
			"@stylistic/no-multi-spaces":"warn",
			"@stylistic/no-multiple-empty-lines": ["warn", {
				max: 1, maxBOF: 0, maxEOF: 0
			}],
			"@stylistic/no-tabs":"off",
			"@stylistic/no-trailing-spaces":"warn",
			"@stylistic/no-whitespace-before-property": "warn",
			"@stylistic/object-curly-spacing": ["warn", "always"],
			"@stylistic/operator-linebreak": ["warn", "before"],
			"@stylistic/padded-blocks": ["warn", {
				blocks: "never", classes: "never", switches: "never"
			}],
			"@stylistic/quote-props": ["warn", "consistent-as-needed"],
			"@stylistic/quotes": ["warn", "double", {
				allowTemplateLiterals: "always", avoidEscape: false
			}],
			"@stylistic/rest-spread-spacing": ["warn", "never"],
			"@stylistic/semi": ["warn", "always"],
			"@stylistic/semi-spacing": ["warn", {
				after: true, before: false
			}],
			"@stylistic/space-before-blocks": ["warn", "always"],
			"@stylistic/space-before-function-paren": ["warn", {
				anonymous: "always", asyncArrow: "always", named: "never"
			}],
			"@stylistic/space-in-parens": ["warn", "never"],
			"@stylistic/space-infix-ops":"warn",
			"@stylistic/space-unary-ops": ["warn", {
				nonwords: false, words: true
			}],
			"@stylistic/spaced-comment": ["warn", "always", {
				block: {
					balanced: true,
					exceptions: ["*"],
					markers: ["!"]
				},
				line: {
					exceptions: ["/", "#"],
					markers: ["/"]
				}
			}],
			"@stylistic/template-curly-spacing":"warn",
			"@stylistic/template-tag-spacing": ["warn", "never"],
			"@stylistic/type-annotation-spacing": ["warn", { }],
			"@stylistic/type-generic-spacing":"warn",
			"@stylistic/type-named-tuple-spacing":"warn",
			"@stylistic/wrap-iife": ["warn", "any", {
				functionPrototypeMethods: true
			}],
			"@stylistic/yield-star-spacing": ["warn", {
				after: true, before: false
			}]
		}
	},
	{
		extends: [
			tseslint.configs.recommendedTypeChecked,
			tseslint.configs.stylisticTypeChecked
		],
		files: ["packages/api/src/**/*.ts"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		extends: [js.configs.recommended],
		files: ["packages/web/src/**/*.js"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: { ...globals.browser },
			sourceType: "script"
		}
	}
);

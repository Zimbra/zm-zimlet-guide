const fs = require('fs');
const path = require('path');

module.exports = {
	"extends": [
		"eslint-config-synacor",
		"plugin:prettier/recommended"
	],
	"plugins": [
		"prettier",
		"preact-i18n"
	],
	"rules": {
		"brace-style": ["error", "1tbs"],
		"eqeqeq": ["error", "smart"],
		"react/jsx-wrap-multilines": "warn",
		"no-shadow": "error",
		"no-unused-vars": [
			"error",
			{
				"vars": "all",
				"args": "after-used",
				"ignoreRestSiblings": true
			}
		],
		"prefer-const": ["error", {
			"destructuring": "all"
		}],

		"preact-i18n/no-missing-template-field": "error",
		"preact-i18n/no-text-as-attribute": "error",
		// Ignore some characters, possibly surrounded by whitespace
		"preact-i18n/no-text-as-children": ["error", { "ignoreTextRegex": "^(?:\\s*[()🚩.\":<>\\-/]\\s*)*$" }],
		"preact-i18n/no-unknown-key": "error",

		"prettier/prettier": ["error", {
			"singleQuote": true,
			"printWidth": 100
		}]
	},
	"settings": {
		"react": {
			"pragma": "createElement",
			"version": "15.0"
		},
		"preact-i18n": {
			"languageFiles": [
				{
					"name": "en_US",
					"path": "src/intl/en_US.json"
				}
			],
			"textComponents": [
				{ "nameRegex": "^Text$" },
				{ "nameRegex": "^TextInput$", "id": "placeholderId" },
				{ "nameRegex": "^AlignedLabel$", "id": "textId" },
				{ "nameRegex": "^(?:Inline)?Modal(?:Dialog|Drawer)", "id": "title" },
				{ "nameRegex": "^ContactSuggestion$", "id": "previouslySelectedLabel"}
			],

		}
	}
}
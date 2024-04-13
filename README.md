A plugin for ESLint, to force use paths aliases according to `paths` options in `tsconfig.json` or `jsconfig.json`, instead of relative imports.

Zero config, plug and play design.

# Setup

Install package with `npm install -D eslint-plugin-paths`, then update eslint config

```json
{
	"plugins": [
		"eslint-plugin-paths",
	],
	"rules": {
		"paths/alias": "error"
	}
}
```

# Examples

If you have `tsconfig.json` with config below

```json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@foo/*": ["src/foo/*"],
			"@bar/*": ["src/bar/*"]
		}
	}
}
```

then code below will be valid

```ts
// src/index.ts

import foo from '@foo';
import barZ from '@bar/x/y/z';
import bazZ from './baz/x/y/z';
```

and this code will be invalid

```ts
// src/index.ts

import foo from './foo';
import barZ from './bar/x/y/z';
```

# Options

## configFilePath

Provide path to json file with a compiler config.

When not set, used `tsconfig.json` from root directory if exists or `jsconfig.json` if not.
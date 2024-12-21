import { resolve } from 'path'

import { stringReplaceOpenAndWrite, viteStringReplace } from '@mlnop/string-replace'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// Temporary fix see pull requests below
// https://github.com/cmalven/vite-plugin-sass-glob-import/pull/20
// https://github.com/cmalven/vite-plugin-sass-glob-import/pull/20
import sassGlobImports from './vite-glob-import'

const chore = process.env.npm_config_chore

/*
 |--------------------------------------------------------------------------
 | Global config
 |--------------------------------------------------------------------------
 |
 | Assets path
 | Destination path
 |
 */
const assetsPath = './src'
const distPath = './build'


/*
 |--------------------------------------------------------------------------
 | Assets Config
 |--------------------------------------------------------------------------
 | JS = [
 |    {
 |     - File name
 |     - File input
 |    }
 |  ]
 |
 | SCSS = [
 |    {
 |     - File name
 |     - File input
 |    }
 |  ]
 |
 */
const entryFiles = [
	{
		scripts: [
			{
				name: 'app',
				input: `${assetsPath}/scripts`
			}
		],
		styles: [
			{
				name: 'app',
				input: `${assetsPath}/styles`
			}
		]
	}
]

/*
 |--------------------------------------------------------------------------
 | Files to edit
 |--------------------------------------------------------------------------
 |  [
 |    {
 |     - File path array/string
 |     - regex or string to be replaced
 |     - string to replace with
 |    }
 |  ]
 |
 */
const filesToEdit = []

/*
 |--------------------------------------------------------------------------
 | Copy config
 |--------------------------------------------------------------------------
 |
 | Files to copy from smwh to smwh else
 |
 | {
 |   - File input
 |   - File output
 | }
 |
 |
 */
const filesToCopy = [
	// {
	// 	src: 'index.php',
	// 	dest: 'build/../'
	// },
	// {
	// 	src: 'favicon.ico',
	// 	dest: 'build/../'
	// },
	// {
	// 	src: 'robots.txt',
	// 	dest: 'build/../'
	// },
	// {
	// 	src: `${assetsPath}/img/`,
	// 	dest: 'assets/img/'
	// },
	// {
	// 	src: `${assetsPath}/inc`,
	// 	dest: 'inc'
	// },
]

/*
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 | That's all, stop editing, happy development
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 */


/*
 |--------------------------------------------------------------------------
 | Global Vite config
 |--------------------------------------------------------------------------
 |
 | Plugins :
 |  - Replace in file
 |  - Live reload :
 |    - Files to refresh
 |  - Run :
 |    - execute scss lint command
 |    - execute scss prettier command
 |    - execute js lint command
 |    - execute js prettier command
 |    - execute php lint command
 | Options :
 |  - Build
 |    - minify when production build
 |    - terser options
 |    - define build directory
 |    - empty out dir ?
 |  - Server
 |    - hot reload config
 |  - CSS
 |    - autoprefixer when production build
 |
 */
export default defineConfig(async ({ command, isPreview, isSsrBuild, mode }) => {
	const isProduction = command === 'build'

	const entriesToCompile = []
	if (entryFiles.length) {
		entryFiles.forEach((group) => {
			if (group) {
				/*
				|--------------------------------------------------------------------------
				| Javascript Compilation
				|--------------------------------------------------------------------------
				|
				| Create array of files to compile
				|
				*/
				if (group.scripts?.length) {
					group.scripts.forEach((file) => {
						if (!entriesToCompile.includes(`${file.input}/${file.name}.js`)) {
							entriesToCompile.push(`${file.input}/${file.name}.js`)
						}
					})
				}

				/*
				|--------------------------------------------------------------------------
				| SCSS Compilation
				|--------------------------------------------------------------------------
				|
				| Create array of files to compile
				|
				*/
				if (group.styles?.length) {
					group.styles.forEach((file) => {
						if (chore === undefined || chore === 'all' || chore.includes('scss')) {
							if (!entriesToCompile.includes(`${file.input}/${file.name}.scss`)) {
								entriesToCompile.push(`${file.input}/${file.name}.scss`)
							}
						}
					})
				}
			}
		})
	}

	/*
 |--------------------------------------------------------------------------
 | Replace in file
 |--------------------------------------------------------------------------
 |
 | Replace string in file
 | Change vite constant in watch
 | Change vite constant in build
 |
 */
	if (chore !== 'ci') {
		if (isProduction) {
			// await stringReplaceOpenAndWrite(resolve(__dirname, `${distPath}/assets/includes/common/variables.inc.php`), [
			// 	{
			// 		from: /\bdefine\([ ]?'IS_VITE_DEVELOPMENT',[ ]?false[ ]?\);/g,
			// 		to: ''
			// 	},
			// 	{
			// 		from: /\bdefine\('DIST_PATH',[ ]?DIST_FOLDER\);/g,
			// 		to: "define('DIST_PATH', '.');"
			// 	}
			// ])
			await stringReplaceOpenAndWrite(resolve(__dirname, './inc/config/env.php'), [
				{
					from: /\bdefine\([ ]?'IS_VITE_DEVELOPMENT',[ ]?true[ ]?\);/g,
					to: "define('IS_VITE_DEVELOPMENT', false);"
				}
			])
		} else {
			await stringReplaceOpenAndWrite(resolve(__dirname, './inc/config/env.php'), [
				{
					from: /\bdefine\([ ]?'IS_VITE_DEVELOPMENT',[ ]?false[ ]?\);/g,
					to: "define('IS_VITE_DEVELOPMENT', true);"
				}
			])
		}
	}

	return {
		base: './', // Url to apply refresh
		// root: themePath,
		plugins: [
			{
				...sassGlobImports({
					namespace(filepath, index) {
						const fileParts = filepath.replace('.scss', '').split('/')
						return `${fileParts.at(-4)}-${fileParts.at(-3)}`
					}
				}),
				enforce: 'pre'
			},
			{
				...viteStringReplace(filesToEdit),
				apply: 'build',
				enforce: 'pre'
			},
			viteStaticCopy({
				targets: filesToCopy
			})
		].filter(Boolean),

		esbuild: isProduction
			? {
				minifyIdentifiers: false,
				keepNames: true,
				pure: ['console.log'],
				reserveProps: /^__\(*$/
			}
			: null,

		build: {
			rollupOptions: {
				input: entriesToCompile,
				output: {
					entryFileNames: 'assets/[name].js',
					chunkFileNames: 'assets/[name].js',
					assetFileNames: 'assets/[name].[ext]'
				}
			},
			write: true,
			minify: isProduction ? 'esbuild' : false,
			outDir: distPath,
			emptyOutDir: true,
			manifest: true,
			// ssrManifest: true,
			sourcemap: !isProduction,
			target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
			cssCodeSplit: true,
			cssTarget: ['edge88', 'firefox78', 'chrome87', 'safari14']
			// cssMinify: 'lightningcss'
		},

		server: {
			cors: true,
			strictPort: true,
			port: 5171,
			https: false,
			open: false,
			hmr: {
				host: 'localhost'
			},
			watch: {
				usePolling: true
			}
		},

		css: {
			devSourcemap: !isProduction,
			postcss: {
				plugins: [autoprefixer]
			},
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler'
				}
			}
		},

		clearScreen: false,
		appType: 'custom'
	}
})

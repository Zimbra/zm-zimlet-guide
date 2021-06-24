import path from 'path';

export default function configure(config, env) {
	//use this function to optionally mutate the webpack configuration created by zimlet-cli

	//EXAMPLES

	// Add a new directory Resolve "packages" as a modules directory
	// config.resolve.modules.unshift(path.resolve(__dirname, '../../../packages'));

	// Create an alias FOO to be replaced by webpack at build time from the environment variable BAR
	// config.resolve.alias.FOO = process.env.BAR;
}

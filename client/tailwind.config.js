module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				ipn: "#6c1d45",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	important: true,
};

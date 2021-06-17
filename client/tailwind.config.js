module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./layout/**/*.{js,ts,jsx,tsx}"],
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

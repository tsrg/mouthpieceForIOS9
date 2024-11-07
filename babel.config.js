// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }

module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        [
            "@babel/preset-env",
            {
                "targets": {
                    "edge": "2",
                    "firefox": "30",
                    "chrome": "40",
                    "safari": "9.0"
                },
                "useBuiltIns": "usage",
                "corejs": "3.6.5"
            }
        ]
    ],
};

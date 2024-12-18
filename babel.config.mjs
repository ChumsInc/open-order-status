const presets = [
    [
        "@babel/preset-env",
        {
            "targets": {
                "browsers": [
                    ">0.25%",
                    "not ie 11",
                    "not op_mini all"
                ]
            }
        }
    ],
    "@babel/preset-react"
];

const plugins = [
    "@babel/plugin-proposal-class-properties",
    // "@babel/plugin-transform-runtime",
];


export default {
    presets,
    plugins,
};

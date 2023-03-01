module.exports = {
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        requireConfigFile: false,
        "babelOptions": {
            "presets": ["@babel/preset-react"]
         },
    },
    "plugins": [
        "import"
    ],
    "rules": {
        'import/order': [
            'error',
                {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                    pattern: '{react,react-dom/**}',
                    group: 'external',
                    position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    }
};

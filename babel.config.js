module.exports = {
    env: {
        development: {
            plugins: ['@babel/plugin-transform-modules-commonjs']
        },
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs']
        }
    },
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                debug: false,
                targets: {
                    node: 'current',
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
                },
                modules: false
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        'react-hot-loader/babel',
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3
            }
        ],
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true
            }
        ],
        '@babel/plugin-proposal-do-expressions',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-function-bind',
        '@babel/plugin-proposal-function-sent',
        '@babel/plugin-proposal-json-strings',
        '@babel/plugin-proposal-logical-assignment-operators',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-transform-arrow-functions',
        '@babel/plugin-proposal-optional-chaining',
        [
            '@babel/plugin-proposal-pipeline-operator',
            {
                proposal: 'minimal'
            }
        ],
        '@babel/plugin-proposal-throw-expressions',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        [
            'import',
            {
                libraryName: 'antd',
                style: true
            }
        ]
    ],
    sourceMaps: true
};

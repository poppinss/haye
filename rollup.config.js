import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'

const plugins = [
  terser(),
  babel({
    babelHelpers: 'bundled',
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [
      [
        'env',
        {
          modules: false,
          targets: {
            browsers: ['last 2 versions', 'ie 8']
          }
        }
      ]
    ]
  })
]

export default [
  {
    input: './index',
    output: [
      {
        file: 'dist/haye.js',
        exports: 'default',
        format: 'cjs',
        name: 'haye'
      },
      {
        file: 'dist/haye.es.js',
        exports: 'default',
        format: 'es',
        name: 'haye'
      },
    ],
    plugins: plugins
  },
  {
    input: './src/Parsers/Qs',
    output: [
      {
        file: 'dist/haye-qs.js',
        exports: 'default',
        format: 'cjs',
        name: 'hayeQs'
      },
      {
        file: 'dist/haye-qs.es.js',
        exports: 'default',
        format: 'es',
        name: 'hayeQs'
      },
    ],
    plugins: plugins
  },
  {
    input: './src/Parsers/Pipe',
    output: [
      {
        file: 'dist/haye-pipe.js',
        exports: 'default',
        format: 'cjs',
        name: 'hayePipe'
      },
      {
        file: 'dist/haye-pipe.es.js',
        exports: 'default',
        format: 'es',
        name: 'hayePipe'
      },
    ],
    plugins: plugins
  },
  {
    input: './src/Presenters/ArrayPresenter',
    output: [
      {
        file: 'dist/haye-array-presenter.js',
        exports: 'default',
        format: 'cjs',
        name: 'hayeArrayPresenter'
      },
      {
        file: 'dist/haye-array-presenter.es.js',
        exports: 'default',
        format: 'es',
        name: 'hayeArrayPresenter'
      },
    ],
    plugins: plugins
  },
  {
    input: './src/Presenters/JsonPresenter',
    output: [
      {
        file: 'dist/haye-json-presenter.js',
        exports: 'default',
        format: 'cjs',
        name: 'hayeJsonPresenter'
      },
      {
        file: 'dist/haye-json-presenter.es.js',
        exports: 'default',
        format: 'es',
        name: 'hayeJsonPresenter'
      },
    ],
    plugins: plugins
  }
]

import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const plugins = [
  uglify({}, minify)
]

export default [
  {
    input: './index',
    output: [
      {
        file: 'dist/haye.js',
        format: 'cjs',
        name: 'haye'
      },
      {
        file: 'dist/haye.es.js',
        format: 'es',
        name: 'haye'
      },
      {
        file: 'dist/haye.browser.js',
        format: 'iife',
        name: 'haye'
      }
    ],
    plugins: plugins
  },
  {
    input: './src/Parsers/Qs',
    output: [
      {
        file: 'dist/haye-qs.js',
        format: 'cjs',
        name: 'hayeQs'
      },
      {
        file: 'dist/haye-qs.es.js',
        format: 'es',
        name: 'hayeQs'
      },
      {
        file: 'dist/haye-qs.browser.js',
        format: 'iife',
        name: 'hayeQs'
      }
    ],
    plugins: plugins
  },
  {
    input: './src/Parsers/Pipe',
    output: [
      {
        file: 'dist/haye-pipe.js',
        format: 'cjs',
        name: 'hayePipe'
      },
      {
        file: 'dist/haye-pipe.es.js',
        format: 'es',
        name: 'hayePipe'
      },
      {
        file: 'dist/haye-pipe.browser.js',
        format: 'iife',
        name: 'hayePipe'
      }
    ],
    plugins: plugins
  },
  {
    input: './src/Presenters/ArrayPresenter',
    output: [
      {
        file: 'dist/haye-array-presenter.js',
        format: 'cjs',
        name: 'hayeArrayPresenter'
      },
      {
        file: 'dist/haye-array-presenter.es.js',
        format: 'es',
        name: 'hayeArrayPresenter'
      },
      {
        file: 'dist/haye-array-presenter.browser.js',
        format: 'iife',
        name: 'hayeArrayPresenter'
      }
    ],
    plugins: plugins
  },
  {
    input: './src/Presenters/JsonPresenter',
    output: [
      {
        file: 'dist/haye-json-presenter.js',
        format: 'cjs',
        name: 'hayeJsonPresenter'
      },
      {
        file: 'dist/haye-json-presenter.es.js',
        format: 'es',
        name: 'hayeJsonPresenter'
      },
      {
        file: 'dist/haye-json-presenter.browser.js',
        format: 'iife',
        name: 'hayeJsonPresenter'
      }
    ],
    plugins: plugins
  }
]

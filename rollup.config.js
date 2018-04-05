import buble from 'rollup-plugin-buble'

export default {
  input: 'src/index.js',
  plugins: [ buble() ],
  output: {
    banner: '/*!\n' +
            ' * bqliu\n' +
            ' * simple logger for isfe usage\n' +
            ' * aim to build a simpler and customizable logger\n' +
            ' * but customizable log format is not meaningful at the time\n' +
            ' */',
    footer: '\n',
    file: 'dist/logger.umd.js',
    format: 'umd',
    name: '$$logger',
    sourcemap: true
  },
  watch: {
    include: 'src/**'
  }
}

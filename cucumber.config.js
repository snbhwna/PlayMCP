module.exports = {
  default: {
    require: ['features/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:cucumber-report.html',
      'json:cucumber-report.json',
      'junit:cucumber-report.xml'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    paths: ['features/**/*.feature']
  },
  smoke: {
    require: ['features/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    tags: '@smoke'
  },
  positive: {
    require: ['features/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar'],
    tags: '@positive'
  },
  negative: {
    require: ['features/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar'],
    tags: '@negative'
  }
};

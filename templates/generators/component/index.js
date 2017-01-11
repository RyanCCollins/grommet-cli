const path = require('path');

module.exports = {
  description: 'Generate a component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['ES6 Class', 'Stateless Function']
    },
    {
      type: 'input',
      name: 'path',
      message: 'Where should we put the components (relative to root)?',
      default: './src/js/components',
      validate: (value) => {
        return true;
      }
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component?',
      default: 'Button',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'The name is required.';
      }
    },
    {
      type: 'confirm',
      name: 'wantPropTypes',
      default: true,
      message: 'Should the component have PropTypes?'
    },
    {
      type: 'confirm',
      name: 'wantFlowTypes',
      default: false,
      message: 'Should the component have FlowTypes?'
    },
    {
      type: 'confirm',
      name: 'wantJestTests',
      default: true,
      message: 'Should the component have an accompanying jest test file?'
    }
  ],
  actions: (data) => {
    const componentPath = path.resolve(process.cwd(), `${data.path}/{{properCase name}}/`);
    const actions = [{
      type: 'add',
      path: `${componentPath}/index.js`,
      templateFile: data.type === 'ES6 Class' ?
        './component/es6class.js.hbs' : './component/stateless.js.hbs',
      abortOnFail: true
    }];
    if (data.wantJestTests) {
      actions.push({
        type: 'add',
        path: `${componentPath}/index.test.js`,
        templateFile: './component/test.js.hbs',
        abortOnFail: true
      });
    }
    return actions;
  }
};

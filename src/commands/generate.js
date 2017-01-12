import plop from 'node-plop';
import cli from '../../templates/generators/cli';

export default function (vorpal) {
  vorpal.command(
    'generator',
    'Run the component generator to generate React components and containers'
  ).action((args, cb) => {
    const generator = cli(plop);
    generator.runActions().then(() => {
      cb();
    });
  });
};

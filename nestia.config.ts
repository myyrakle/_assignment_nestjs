// nestia configuration file
import type sdk from '@nestia/sdk';

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: ['src/*.controller.ts', 'src/**/*.controller.ts'],
  output: 'api',
  swagger: {
    output: 'swagger/swagger.json',
  },
  primitive: false,
};
export default NESTIA_CONFIG;

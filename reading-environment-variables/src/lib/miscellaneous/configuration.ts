import { EnvironmentUtils } from '@lib/utils';
import * as _package from '@topdir/package.json';
import dotenv from 'dotenv';
import path from 'path';

const pkg: any = _package as any;

dotenv.config({
  path: path.join(process.cwd(), `.env.${EnvironmentUtils.getRunningEnvironment()}`)
});

export const configuration = {
  environment: EnvironmentUtils.getRunningEnvironment(),
  isDevelopment: EnvironmentUtils.isDevelopment(),
  isLocal: EnvironmentUtils.isLocal(),
  isProduction: EnvironmentUtils.isProduction(),
  isTest: EnvironmentUtils.isTest(),

  application: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    port: EnvironmentUtils.getApplicationPort()
  }
};
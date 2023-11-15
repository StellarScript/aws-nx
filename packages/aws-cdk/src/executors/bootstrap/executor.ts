import { ExecutorContext } from '@nx/devkit';
import { runCommand, ArgumentMap, normalizeOptions } from '@aws-nx/utils';

import { createCommand } from '../../util/executor';
import { BootstrapExecutorSchema } from './schema';

export function normalizeArguments(
  schema: BootstrapExecutorSchema
): Record<string, string> {
  const argsMap = new ArgumentMap<Record<string, string>>();

  const stack = Array.isArray(schema.profile)
    ? schema.profile.join(' ')
    : schema.profile;

  argsMap.register('_', stack);
  return argsMap.toJson();
}

export default async function runExecutor(
  schema: BootstrapExecutorSchema,
  context: ExecutorContext
) {
  const args = normalizeArguments(schema);
  const options = normalizeOptions(args, context);

  const command = createCommand('bootstrap', options);
  return await runCommand(command, context.root);
}
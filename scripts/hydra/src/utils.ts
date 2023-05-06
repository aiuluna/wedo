import os from 'os'
import { Projects } from "./projects";
import inquirer from 'inquirer'
import { Package } from "./package";
import chalk from 'chalk';
import TreeNode from '../object/TreeNode';

export async function chooseRunnablesProject(projects: Projects, message: string): Promise<Package | null> {
  const choices = projects.getRunnables().map(p => p.getName());
  if (!choices.length) return Promise.resolve(null);
  const ret = await inquirer.prompt({
    type: 'list',
    name: 'project',
    message: message,
    choices
  })
  return projects.findPackage(ret['project'])
}

export function notice(message: string, dir?: string) {
  if (!dir) {
    console.log(chalk.yellow(message));
  } else {
    const dirSeparator = os.platform() === 'win32' ? '\\' : '/';
    const pathArr = dir.split(dirSeparator);
    const currentDir = pathArr[pathArr.length - 1];
    console.log(chalk.yellow("《" + currentDir + "》--> ") + chalk.green(message));
  }
}

export function error(err: string) {
  console.log(chalk.bold(chalk.red('Error:')) + err);
}

export function hasCycle(node: TreeNode<Package>, visited: Set<TreeNode<Package>> = new Set()): boolean {
  if (visited.has(node)) {
    return true
  }

  for (let child of (node.getChildren() || [])) {
    if (hasCycle(child, visited)) {
      return true
    }
  }

  return false;
}
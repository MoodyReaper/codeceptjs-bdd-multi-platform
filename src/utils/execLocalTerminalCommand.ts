import { type ChildProcess, exec } from 'child_process';

export default async function execLocalTerminalCommand(command: string): Promise<{
  execCommand: ChildProcess;
}> {
  return await new Promise<{ execCommand: ChildProcess }>((resolve, reject) => {
    console.log(`Local command was launched:
  Command:
    ${command}`);
    const execCommand = exec(command, (error, stdout, stderr) => {
      if (error != null) {
        console.error(
          `Local command execution failed:
  Command:
    ${command}
  Error:
    ${JSON.stringify(error)}
  Stderr:
    ${stderr.toString()}`
        );
        reject(error);
        return;
      }
      console.log(`Local command was successfully executed:
  Command:
    ${command}
  Stdout:
    ${stdout}`);
      resolve({ execCommand });
      return true;
    });
  });
}

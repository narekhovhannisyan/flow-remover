# flow-remover
This package is for removing flow types from node.js projects. Flow-remover plugin supports VS Code tasks via Gulp.



## Get Started!

Use the command line:

```
npm install flow-remover
```
1) In the root of your project create "src" folder and drop your project in that folder.

`(instructions for VSCode)`

2) Create in root of your project ".vscode" folder, then create tasks.json in that folder with following content:

```
{
    "version": "2.0.0",
    "command": "gulp",
    "type": "shell",
    "options": {
        "cwd": "${workspaceRoot}/node_modules/flow-remover"
    },
    "tasks": [
        {
            "label": "flow-remover",
            "task": "flow-remover",
            "type": "gulp"
        }
    ],
    "problemMatchers": []
}
```
Or get it from "node_modules/flow-remover/.vscode/tasks.json" directory and copy it to your project's root.

3) Run gulp from tasks list

After running flow-remover task you will get clean project in "dist" folder ("dist" folder is generated automatically).
Works on save.
Also you can run task via command line.

If finding some issues please report them in https://github.com/narekhovhannisyan/flow-remover/issues

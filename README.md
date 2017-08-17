# flow-remover
This package is for removing flow types from node.js projects. Flow-remover plugin supports VS Code tasks via Gulp. 



## Get Started!

Use the command line:

```
npm install flow-remover
```
1) In the root of your project create "src" folder and drop your project in "src" folder.

`(istructions for vscode)`

2) Create in root of your project ".vscode" folder, after that create tasks.json file in ".vscode" folder with following content:

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
Or you can get ".vscode/tasks.json" from node_modules/flow-remover directory and copy it to your projects root.

3) Run gulp from tasks

After running flow-remover task you will get flow removed project in "dist" folder("dist" folder is generated automatically). Works on save.
Also you can run task via command line.

If finding some issues please report them in https://github.com/narekhovhannisyan/flow-remover/issues
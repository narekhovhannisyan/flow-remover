# flow-remover
This package is for removing flow types from node.js projects. Flow-remover plugin supports VS Code tasks via Gulp. 
***Installing***

npm install flow-remover

In the root of your project create "src" folder and drop your project in "src" folder.
After running flow-remover you will get flow removed project in "dist" folder("dist" folder is generated automatically).
Also works on save :). 

This plugin works with VSCode Tasks. To use flow-remover with tasks create in root of your project ".vscode" folder, after that create tasks.json file in ".vscode" folder
with this content (just copy it). Also you can get ".vscode/tasks.json" from node_modules/flow-remover directory and copy it to your projects root.

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

If finding some issues please report them in https://github.com/narekhovhannisyan/flow-remover/issues
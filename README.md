# flow-remover
Unflow plugin is for removing flow types from node.js projects. Unflow plugin written with gulp.js. 
For applying this module you must move your project to "src" folder, and at the same level create "dist" folder

In the root of your project create "src" and "dist" folders and drop your project in "src" folder.
After running flow-remover you will get flow removed project in "dist" folder. 

This plugin works with VSCode Tasks. To use flow-remover with tasks create in root of your project ".vscode" folder, after that create tasks.json file in ".vscode" folder
with this content (just copy it). Also you can get ".vscode/tasks.json" from node_modules/flow-remover firectory and copy it to your projects root.

{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "command": "gulp",
    "type": "shell",
    "options": {
        "cwd": "${workspaceRoot}/node_modules/flow-remover"
    },
    "tasks": [
        {
            "label": "flow-remover",
            "task" : "flow-remover",
            "type": "gulp"
        }
    ]
    
}

If finding some issues please write them in https://github.com/narekhovhannisyan/flow-remover/issues
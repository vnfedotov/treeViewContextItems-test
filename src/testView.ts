import * as vscode from 'vscode';

export class TestView {
    constructor(context: vscode.ExtensionContext) {
        const dataProvider = new TestTasksDataProvider();
        const view = vscode.window.createTreeView('testView', { treeDataProvider: dataProvider, showCollapseAll: true });

        context.subscriptions.push(
            vscode.commands.registerCommand('testView.runTask', dataProvider.runTask, dataProvider)
        );
    }
}

class TestTaskItem extends vscode.TreeItem {
    children: TestTaskItem[];

    constructor(properties?: {
        label: string;
        description?: string;
        tooltip?: string;
        iconPath?: string;
        collapsibleState?: vscode.TreeItemCollapsibleState;
        command?: vscode.Command;
        contextValue?: string;
        children?: TestTaskItem[];
    }) {
        if (properties) {
            super(properties.label, properties.collapsibleState);
            Object.assign(this, properties);
        }
        else {
            super("none", vscode.TreeItemCollapsibleState.None);
        }
    }

    getChildren(id?: string): TestTaskItem[] {
        return this.children;
    }
}

class TestTasksDataProvider implements vscode.TreeDataProvider<TestTaskItem> {

    private viewItems = new TestTaskItem({
        label: "root",
        children: [
            new TestTaskItem({
                label: "parentItemA",
                collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
                children: [
                    new TestTaskItem({
                        label: "inlineCommandItemA1",
                        contextValue: "myTaskItem",
                        collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
                        children: [
                            new TestTaskItem({
                                label: "inlineCommandItemA1-1"
                            }),
                            new TestTaskItem({
                                label: "inlineCommandItemA1-2"
                            })
                        ]
                    }),
                    new TestTaskItem({
                        label: "inlineCommandItemA2",
                        contextValue: "myTaskItem",
                        collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
                        children: [
                            new TestTaskItem({
                                label: "inlineCommandItemA2-1"
                            }),
                            new TestTaskItem({
                                label: "inlineCommandItemA2-2"
                            })
                        ]
                    })
                ]
            }),
            new TestTaskItem({
                label: "parentItemB",
                collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
                children: [
                    new TestTaskItem({
                        label: "inlineCommandItemB1",
                        contextValue: "myTaskItem",
                        collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
                        children: [
                            new TestTaskItem({
                                label: "inlineCommandItemB1-1"
                            }),
                            new TestTaskItem({
                                label: "inlineCommandItemB1-2"
                            })
                        ]
                    }),
                    new TestTaskItem({
                        label: "inlineCommandItemB2",
                        contextValue: "myTaskItem",
                        collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
                        children: [
                            new TestTaskItem({
                                label: "inlineCommandItemB2-1"
                            }),
                            new TestTaskItem({
                                label: "inlineCommandItemB2-2"
                            })
                        ]
                    })
                ]
            })
        ]
    });

    getChildren(item?: TestTaskItem): TestTaskItem[] {
        if (item) {
            return item.children;
        }
        else {
            return this.viewItems.children;
        }
    };

    getTreeItem(item: TestTaskItem): vscode.TreeItem {
        return item;
    };

    runTask(item: TestTaskItem) {
        vscode.window.showInformationMessage(`Running ${item.label}`);
    }
}
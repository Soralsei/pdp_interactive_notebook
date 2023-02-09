import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
    INotebookTracker,
    NotebookPanel
} from '@jupyterlab/notebook';
import { ToolbarButton } from "@jupyterlab/apputils";
import { IMainMenu } from '@jupyterlab/mainmenu';
import { Cell, MarkdownCell, CodeCell } from "@jupyterlab/cells";
import { LabIcon } from "@jupyterlab/ui-components";

import run_init_icon from "../style/init.svg";

const runInitIcon = new LabIcon({
  name: 'auto_init:init',
  svgstr: run_init_icon
});

const INIT: string = 'init_cell';
const EXT: string = 'auto_init';
const MKDOWN: string = 'markdown';
const CODE: string = 'code'
const run_init_label = 'Run all cells marked as initialization';

const manualInit = (tracker: INotebookTracker) => {
    const notebook: NotebookPanel | null = tracker.currentWidget;
    if (notebook !== null)
        runInitCells(notebook);
}

const runInitCells = (notebook: NotebookPanel) => {
    console.log("Initializing cells");
    notebook.content.widgets.map((cell: Cell) => {
        const metadata = cell.model.metadata;
        if (metadata.get(INIT)) {
            cell.addClass(EXT + '-cell');
            switch (cell.model.type) {
                case CODE:
                    const code = cell as CodeCell;
                    CodeCell.execute(code, notebook.sessionContext);
                    break;
                case MKDOWN:
                    const ce: MarkdownCell = cell as MarkdownCell;
                    ce.rendered = true;
                default:
                    break;
            }
        }    
    });
}

function toggleInit(tracker: INotebookTracker) {
    let cell: Cell | null = tracker.activeCell;
    if (cell !== null) {
        let metadata = cell.model.metadata;
        if (metadata.get(INIT)) {
            metadata.set(INIT, false);
            cell.removeClass(EXT + '-cell');
        } else {
            metadata.set(INIT, true);
            cell.addClass(EXT + '-cell');
        }
        console.log(metadata.get(INIT))
    }
}

class InitManager {
    states: Map<string, boolean>;
    constructor() {
        this.states = new Map();
    }

    public init(notebookPanel: NotebookPanel) {
        const id: string = notebookPanel.id
        if (!this.states.get(id)) {
            this.states.set(id, true);
            runInitCells(notebookPanel);
        }
    }

    public resetNotebook(id: string) {
        this.states.set(id, false);
    }
}

/**
 * Initialization data for the auto_init extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
    id: 'auto_init:plugin',
    autoStart: true,
    requires: [ INotebookTracker, IMainMenu],
    activate: (app: JupyterFrontEnd, tracker: INotebookTracker, mainmenu: IMainMenu) => {
        console.log('JupyterLab extension auto_init is activated!');
        
        const toggle_init: string = EXT + ':toggle_init';
        const runcommand: string = EXT + ':run_init';
        const manager = new InitManager();
        const runMenu = mainmenu.runMenu;

        app.commands.addCommand(toggle_init, {
            label: 'Toggle cell as initialization cell',
            execute: () => {
                toggleInit(tracker);
            }
        });
        app.commands.addCommand(runcommand, {
            label: run_init_label,
            execute: () => {
                const notebookPanel = tracker.currentWidget;
                if (notebookPanel !== null)
                    runInitCells(notebookPanel);
            }
        });

        let runAllButton = new ToolbarButton({
            actualOnClick: true,
            onClick: () => {
                manualInit(tracker)
            },
            icon: runInitIcon,
            tooltip: run_init_label
        });
        
        tracker.widgetAdded.connect((_, notebookPanel:NotebookPanel) => {
            const toolbar = notebookPanel.toolbar;
            notebookPanel.sessionContext.connectionStatusChanged.connect((_, status) => {
                console.log(status);
                if (status == 'connected')
                    manager.resetNotebook(notebookPanel.id);
            });
            toolbar.insertItem(10, "run_init", runAllButton);
        });

        tracker.currentChanged.connect((_, notebookPanel) => {
            if (notebookPanel !== null) {
                notebookPanel.context.ready.then(async () => {
                    return notebookPanel.sessionContext.ready;
                }).then(() => {
                    manager.init(notebookPanel);   
                });
            }
        });

        console.log(tracker.selectionChanged.connect((_, panel) => {
            if (panel !== null) {
                runAllButton.enabled = true;
            }
        }));

        app.contextMenu.addItem({
            selector: '.jp-Cell',
            command: toggle_init,
            rank: 0
        })

        runMenu.addGroup([{
            command: runcommand
        }]);
    }
};

export default plugin;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var import_node_path = __toESM(require("node:path"), 1);
var import_vscode2 = require("vscode");
var import_node = require("vscode-languageclient/node.js");

// src/const.ts
var ID = "markuplint";
var NAME = "Markuplint";
var OUTPUT_CHANNEL_PRIMARY_CHANNEL_NAME = NAME;
var OUTPUT_CHANNEL_DIAGNOSTICS_CHANNEL_NAME = `${NAME} Diagnostics`;
var COMMAND_NAME_OPEN_LOG_COMMAND = `${ID}.openLog`;
var WATCHING_CONFIGURATION_GLOB = "**/{.markuplintrc,markuplintrc.json,markuplint.config.json,markuplint.json,markuplint.config.js}";
var WEBSITE_URL = "https://markuplint.dev";
var WEBSITE_URL_RULE_PAGE = `${WEBSITE_URL}/docs/rules/`;

// src/logger.ts
var Logger = class {
  #channel;
  constructor(channel) {
    this.#channel = channel;
    this.#channel.debug(`${channel.name} channel is available (Log level: ${channel.logLevel})`);
  }
  get outputChannel() {
    return this.#channel;
  }
  log(message, type) {
    switch (type) {
      case "trace": {
        this.#channel.trace(message);
        break;
      }
      case "debug": {
        this.#channel.debug(message);
        break;
      }
      case "warn": {
        this.#channel.warn(message);
        break;
      }
      case "error": {
        this.#channel.error(message);
        break;
      }
      case "clear": {
        this.#channel.clear();
        break;
      }
      // eslint-disable-next-line unicorn/no-useless-switch-case
      case "info":
      default: {
        this.#channel.info(message);
        break;
      }
    }
  }
  show() {
    this.#channel.show();
  }
};

// src/lsp.ts
var import_vscode_languageserver = require("vscode-languageserver");
var status = new import_vscode_languageserver.RequestType(`${ID}/ready`);
var logToPrimaryChannel = new import_vscode_languageserver.NotificationType(`${ID}/log-primary-channel`);
var logToDiagnosticsChannel = new import_vscode_languageserver.NotificationType(`${ID}/log-diagnostics-channel`);
var errorToPopup = new import_vscode_languageserver.NotificationType(`${ID}/error-popup`);
var warningToPopup = new import_vscode_languageserver.NotificationType(`${ID}/warning-popup`);
var infoToPopup = new import_vscode_languageserver.NotificationType(`${ID}/info-popup`);

// src/status-bar.ts
var import_vscode = require("vscode");
var StatusBar = class {
  #item;
  #version = null;
  #isLocalModule = null;
  #message = null;
  #warningBg = new import_vscode.ThemeColor("statusBarItem.warningBackground");
  constructor(item, openCommandName) {
    this.#item = item;
    item.command = openCommandName;
  }
  set({ version, isLocalModule, message }) {
    this.#version = version;
    this.#isLocalModule = isLocalModule;
    this.#message = message;
    this.#item.show();
    this.#update();
  }
  /**
   * Text format with status
   *
   * Icon reference
   * @see https://code.visualstudio.com/api/references/icons-in-labels#icon-listing
   *
   * @returns
   */
  #update() {
    const warn = this.#isLocalModule ? "" : "$(warning)";
    this.#item.backgroundColor = warn ? this.#warningBg : void 0;
    this.#item.text = `$(check)${NAME}[v${this.#version}${warn}]`;
    this.#item.tooltip = this.#message ?? void 0;
  }
};

// src/extension.ts
var client;
function activate(context) {
  const config = import_vscode2.workspace.getConfiguration(ID);
  if (!config.get("enable")) {
    return;
  }
  const logger = new Logger(import_vscode2.window.createOutputChannel(OUTPUT_CHANNEL_PRIMARY_CHANNEL_NAME, { log: true }));
  const dignosticslogger = new Logger(
    import_vscode2.window.createOutputChannel(OUTPUT_CHANNEL_DIAGNOSTICS_CHANNEL_NAME, { log: true })
  );
  const serverModule = context.asAbsolutePath(import_node_path.default.join("out", "server.js"));
  const debugOptions = {
    execArgv: ["--nolazy", "--inspect=6009"]
  };
  const serverOptions = {
    run: {
      module: serverModule,
      transport: import_node.TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: import_node.TransportKind.ipc,
      options: debugOptions
    }
  };
  const customLanguageList = config.get("targetLanguages") ?? [];
  const languageList = [...new Set(customLanguageList)];
  const langConfigs = {};
  for (const languageId of languageList) {
    const workspaceConfig = import_vscode2.workspace.getConfiguration("", { languageId }).get(ID);
    const config2 = JSON.parse(JSON.stringify(workspaceConfig));
    langConfigs[languageId] = config2 ?? {
      enable: true,
      debug: false,
      defaultConfig: {},
      hover: {
        accessibility: {
          enable: true,
          ariaVersion: "1.2"
        }
      }
    };
  }
  const clientOptions = {
    documentSelector: [
      ...languageList.map((language) => ({ language, scheme: "file" })),
      ...languageList.map((language) => ({ language, scheme: "untitled" }))
    ],
    synchronize: {
      configurationSection: ID,
      fileEvents: import_vscode2.workspace.createFileSystemWatcher(WATCHING_CONFIGURATION_GLOB)
    },
    outputChannel: logger.outputChannel,
    revealOutputChannelOn: import_node.RevealOutputChannelOn.Error,
    initializationOptions: {
      langConfigs
    }
  };
  client = new import_node.LanguageClient(ID, OUTPUT_CHANNEL_PRIMARY_CHANNEL_NAME, serverOptions, clientOptions);
  void client.start().then(() => {
    const statusBar = new StatusBar(
      import_vscode2.window.createStatusBarItem(import_vscode2.StatusBarAlignment.Right, 0),
      COMMAND_NAME_OPEN_LOG_COMMAND
    );
    client.onRequest(status, (data) => {
      statusBar.set(data);
    });
    client.onNotification(logToPrimaryChannel, ([message, type]) => {
      logger.log(message, type);
    });
    client.onNotification(logToDiagnosticsChannel, ([message, type]) => {
      dignosticslogger.log(message, type);
    });
    client.onNotification(errorToPopup, (message) => {
      void import_vscode2.window.showErrorMessage(message);
    });
    client.onNotification(warningToPopup, (message) => {
      void import_vscode2.window.showWarningMessage(message);
    });
    client.onNotification(infoToPopup, (message) => {
      void import_vscode2.window.showInformationMessage(message);
    });
  });
  const openLogCommand = import_vscode2.commands.registerCommand(COMMAND_NAME_OPEN_LOG_COMMAND, () => {
    logger.show();
  });
  context.subscriptions.push(openLogCommand);
}
function deactivate() {
  return client.stop();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});

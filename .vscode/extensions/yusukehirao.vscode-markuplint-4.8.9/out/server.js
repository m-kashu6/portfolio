"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __glob = (map) => (path3) => {
  var fn = map[path3];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path3);
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// locales/en.json
var require_en = __commonJS({
  "locales/en.json"(exports2, module2) {
    module2.exports = {
      sentences: {
        "since markuplint could not be found in the node_modules of the workspace, this use the version (v{0}) installed in vs code extension": "Since markuplint could not be found in the node_modules of the workspace, this use the version (v{0}) installed in VS Code Extension"
      }
    };
  }
});

// locales/ja.json
var require_ja = __commonJS({
  "locales/ja.json"(exports2, module2) {
    module2.exports = {
      keywords: {
        "computed accessibility properties": "\u8A08\u7B97\u6E08\u307F\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3\u30D7\u30ED\u30D1\u30C6\u30A3",
        "hidden element": "\u975E\u8868\u793A\u8981\u7D20",
        "no corresponding role": "\u5BFE\u5FDC\u3059\u308B\u30ED\u30FC\u30EB\u306A\u3057",
        "no exposed to accessibility tree": "\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3\u30C4\u30EA\u30FC\u306B\u516C\u958B\u3055\u308C\u307E\u305B\u3093",
        none: "\u306A\u3057",
        prohibited: "\u7981\u6B62",
        required: "\u5FC5\u9808",
        unknown: "\u4E0D\u660E",
        undefined: "\u672A\u5B9A\u7FA9"
      },
      sentences: {
        "since markuplint could not be found in the node_modules of the workspace, this use the version (v{0}) installed in vs code extension": "\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u306Enode_modules\u306Bmarkuplint\u304C\u767A\u898B\u3067\u304D\u306A\u304B\u3063\u305F\u305F\u3081VS Code\u62E1\u5F35\u306B\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3055\u308C\u3066\u3044\u308B\u30D0\u30FC\u30B8\u30E7\u30F3(v{0})\u3092\u5229\u7528\u3057\u307E\u3059"
      }
    };
  }
});

// src/server/server.ts
var import_node5 = require("vscode-languageserver/node.js");
var import_vscode_languageserver_textdocument = require("vscode-languageserver-textdocument");

// src/const.ts
var ID = "markuplint";
var NAME = "Markuplint";
var OUTPUT_CHANNEL_DIAGNOSTICS_CHANNEL_NAME = `${NAME} Diagnostics`;
var COMMAND_NAME_OPEN_LOG_COMMAND = `${ID}.openLog`;
var WEBSITE_URL = "https://markuplint.dev";
var WEBSITE_URL_RULE_PAGE = `${WEBSITE_URL}/docs/rules/`;
var NO_INSTALL_WARNING = "since markuplint could not be found in the node_modules of the workspace, this use the version (v{0}) installed in VS Code Extension";

// require("../locales/**/*.json") in src/i18n.ts
var globRequire_locales_json = __glob({
  "../locales/en.json": () => require_en(),
  "../locales/ja.json": () => require_ja()
});

// src/i18n.ts
var { translator } = require("@markuplint/i18n");
function t(...args) {
  const locale = getLocale();
  const localeSet = i18n(locale);
  return translator(localeSet)(...args);
}
function getLocale() {
  const locale = JSON.parse(process.env.VSCODE_NLS_CONFIG ?? "{}").locale ?? "en";
  return locale;
}
function i18n(locale) {
  const langCode = locale.split("-")[0] ?? locale;
  const localeSet = getLocaleSet(locale);
  return {
    ...localeSet,
    locale: langCode ?? "en"
  };
}
function getLocaleSet(langCode) {
  try {
    const loadLocaleSet = globRequire_locales_json(`../locales/${langCode}.json`);
    if (loadLocaleSet) {
      return loadLocaleSet;
    }
  } catch {
  }
  return require_en();
}

// src/lsp.ts
var import_vscode_languageserver = require("vscode-languageserver");
var status = new import_vscode_languageserver.RequestType(`${ID}/ready`);
var logToPrimaryChannel = new import_vscode_languageserver.NotificationType(`${ID}/log-primary-channel`);
var logToDiagnosticsChannel = new import_vscode_languageserver.NotificationType(`${ID}/log-diagnostics-channel`);
var errorToPopup = new import_vscode_languageserver.NotificationType(`${ID}/error-popup`);
var warningToPopup = new import_vscode_languageserver.NotificationType(`${ID}/warning-popup`);
var infoToPopup = new import_vscode_languageserver.NotificationType(`${ID}/info-popup`);

// src/server/debug.ts
var import_debug = __toESM(require("debug"), 1);
var log = (0, import_debug.default)("vscode:markuplint");
var NAMESPACES = "vscode:markuplint*,markuplint*,ml-*";
function verbosely() {
  import_debug.default.enable(NAMESPACES);
  log(`[Debug] Enable: "${NAMESPACES}"`);
}

// src/server/document-events.ts
var import_semver = require("semver");
var import_node3 = require("vscode-languageserver/node.js");

// src/server/v1.ts
var import_node = require("vscode-languageserver/node.js");

// src/utils/get-file-path.ts
var import_node_path = __toESM(require("node:path"), 1);
var import_node_url = require("node:url");
function getFilePath(uri, langId) {
  if (/^untitled:/i.test(uri)) {
    const name = uri.replace(/^untitled:/i, "");
    const basename2 = `${name}.${langId}`;
    return {
      dirname: import_node_path.default.resolve(),
      basename: basename2
    };
  }
  const decodePath = (0, import_node_url.fileURLToPath)(decodeURIComponent(uri));
  let filePath;
  let untitled = false;
  if (decodePath.startsWith("file:")) {
    filePath = decodePath.replace(/^file:\/+/i, "/");
  } else if (decodePath.startsWith("untitled:")) {
    filePath = decodePath.replace(/^untitled:/i, "");
    untitled = true;
  } else {
    filePath = decodePath;
  }
  const dirname = import_node_path.default.resolve(import_node_path.default.dirname(filePath));
  let basename = import_node_path.default.basename(filePath);
  if (untitled) {
    basename += `.${langId}`;
  }
  return {
    dirname,
    basename
  };
}

// src/server/v1.ts
async function onDidChangeContent(document, markuplint, config, sendDiagnostics) {
  const diagnostics = [];
  const file = getFilePath(document.uri, document.languageId);
  const html = document.getText();
  const totalResults = await markuplint.exec({
    sourceCodes: html,
    names: file.basename,
    workspace: file.dirname,
    // Add option since markuplint v1.7.0 @see https://github.com/markuplint/markuplint/pull/167
    extMatch: true,
    defaultConfig: config.defaultConfig
  });
  const result = totalResults[0];
  if (!result) {
    return;
  }
  if (result.parser === "@markuplint/html-parser" && !/\.html?/i.test(file.basename)) {
    console.log(`Skipped: "${document.uri}"`);
    return;
  }
  console.log(
    [
      `Linting: "${document.uri}"`,
      `	LangId: ${document.languageId}`,
      `	Config: [${result.configSet.files.map((file2) => `
		${file2}`)}
	]`,
      `	Parser: ${result.parser}`,
      `	Result: ${result.results.length} reports.`
    ].join("\n")
  );
  for (const report of result.results) {
    diagnostics.push({
      severity: report.severity === "error" ? import_node.DiagnosticSeverity.Error : import_node.DiagnosticSeverity.Warning,
      range: {
        start: {
          line: Math.max(report.line - 1, 0),
          character: Math.max(report.col - 1, 0)
        },
        end: {
          line: Math.max(report.line - 1, 0),
          character: Math.max(report.col + report.raw.length - 1, 0)
        }
      },
      message: `${report.message} (${report.ruleId})`,
      source: "markuplint"
    });
  }
  sendDiagnostics({
    uri: document.uri,
    diagnostics
  });
}

// src/server/convert-diagnostics.ts
var import_node2 = require("vscode-languageserver/node.js");
function convertDiagnostics(result) {
  const diagnostics = [];
  if (!result) {
    return diagnostics;
  }
  for (const violation of result.violations) {
    diagnostics.push({
      severity: violation.severity === "error" ? import_node2.DiagnosticSeverity.Error : violation.severity === "warning" ? import_node2.DiagnosticSeverity.Warning : import_node2.DiagnosticSeverity.Information,
      line: violation.line,
      col: violation.col,
      range: {
        start: {
          line: Math.max(violation.line - 1, 0),
          character: Math.max(violation.col - 1, 0)
        },
        end: {
          line: Math.max(violation.line - 1, 0),
          character: Math.max(violation.col + violation.raw.length - 1, 0)
        }
      },
      message: violation.message + (violation.reason ? " - " + violation.reason : ""),
      source: NAME,
      code: violation.ruleId,
      codeDescription: {
        href: `${WEBSITE_URL_RULE_PAGE}${violation.ruleId}`
      }
    });
  }
  return diagnostics;
}

// src/server/v2.ts
var engines = /* @__PURE__ */ new Map();
async function onDidOpen(document, MLEngine, config, locale, sendDiagnostics, notFoundParserError2) {
  const key = document.uri;
  console.log(`Opened: ${key}`);
  const currentEngine = engines.get(key);
  if (currentEngine) {
    return;
  }
  const filePath = getFilePath(document.uri, document.languageId);
  if (config.debug) {
    console.log(filePath);
  }
  const sourceCode = document.getText();
  const file = await MLEngine.toMLFile({ sourceCode, name: filePath.basename, workspace: filePath.dirname });
  if (!file) {
    console.warn(`File not found: ${filePath.basename}`);
    return;
  }
  const engine = new MLEngine(file, {
    locale,
    debug: config.debug,
    defaultConfig: config.defaultConfig,
    watch: true
  });
  engines.set(key, engine);
  engine.on("config", (filePath2, configSet) => {
    if (config.debug) {
      console.log(`get config: ${filePath2}`, configSet);
    }
  });
  engine.on("log", (phase, message) => {
    if (config.debug) {
      console.log(phase, message);
    }
  });
  engine.on("lint-error", (_filePath, _sourceCode, error) => {
    if (config.debug) {
      console.log("\u274C", { error });
    }
  });
  engine.on("lint", (filePath2, sourceCode2, violations, fixedCode, debug2) => {
    if (config.debug && debug2) {
      console.log(debug2.join("\n"));
    }
    const date = (/* @__PURE__ */ new Date()).toLocaleDateString();
    const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    console.log(`Linted(${date} ${time}): ${document.uri}`);
    const diagnostics = convertDiagnostics({ filePath: filePath2, sourceCode: sourceCode2, violations, fixedCode });
    sendDiagnostics({
      uri: document.uri,
      diagnostics
    });
    console.log(`diagnostics: ${diagnostics.length}`);
  });
  console.log("exec (onDidOpen)");
  engine.exec().catch((error) => notFoundParserError2(error));
}
var debounceTimer;
function onDidChangeContent2(document, notFoundParserError2) {
  clearTimeout(debounceTimer);
  const key = document.uri;
  const engine = engines.get(key);
  debounceTimer = setTimeout(async () => {
    if (!engine) {
      return;
    }
    const code = document.getText();
    try {
      await engine.setCode(code);
      console.log("exec (onDidChangeContent)");
      engine.exec().catch((error) => notFoundParserError2(error));
    } catch (error) {
      console.log(error);
    }
  }, 300);
}

// src/server/v3.ts
var engines2 = /* @__PURE__ */ new Map();
async function onDidOpen2(document, MLEngine, config, locale, log2, diagnosticsLog, sendDiagnostics, notFoundParserError2) {
  const key = document.uri;
  log2(`Opened: ${key}`, "debug");
  const currentEngine = engines2.get(key);
  if (currentEngine) {
    return;
  }
  const filePath = getFilePath(document.uri, document.languageId);
  log2(`${filePath.dirname}/${filePath.basename}`, "debug");
  const sourceCode = document.getText();
  const file = await MLEngine.toMLFile({ sourceCode, name: filePath.basename, workspace: filePath.dirname });
  if (!file) {
    log2(`File not found: ${filePath.basename}`, "warn");
    return;
  }
  const engine = new MLEngine(file, {
    locale,
    debug: config.debug,
    defaultConfig: config.defaultConfig,
    watch: true
  });
  let configSet = null;
  engines2.set(key, engine);
  engine.on("config", (_, _configSet) => {
    configSet = _configSet;
  });
  engine.on("log", (phase, message) => {
    log2(`[${phase}]: ${message}`, "trace");
  });
  engine.on("lint-error", (_filePath, _sourceCode, error) => {
    diagnosticsLog(error.message, "error");
  });
  engine.on("config-errors", (_filePath, errors) => {
    for (const error of errors) {
      diagnosticsLog("ConfigError: " + error.message, "error");
      log2("ConfigError: " + error.message, "warn");
    }
  });
  engine.on("lint", (filePath2, sourceCode2, violations, fixedCode, debug2) => {
    diagnosticsLog("", "clear");
    debounceTimer2 = setTimeout(() => {
      diagnosticsLog(`Lint: ${document.uri}`);
      if (debug2) {
        diagnosticsLog("  Tracing AST Mapping:\n" + debug2.map((line) => `  ${line}`).join("\n"), "trace");
      }
      if (configSet) {
        if (configSet.files.size > 0) {
          diagnosticsLog("  Used configs:");
          for (const files of configSet.files.values()) {
            diagnosticsLog(`    ${files}`);
          }
        } else {
          diagnosticsLog("  No use configs");
        }
        if (configSet.plugins.length > 0) {
          diagnosticsLog("  Used plugins:");
          for (const plugin of configSet.plugins.values()) {
            diagnosticsLog(`    ${plugin.name}`);
          }
        } else {
          diagnosticsLog("  No use plugins");
        }
      }
      const diagnostics = convertDiagnostics({ filePath: filePath2, sourceCode: sourceCode2, violations, fixedCode });
      sendDiagnostics({
        uri: document.uri,
        diagnostics
      });
      if (diagnostics.length > 0) {
        diagnosticsLog(`  Violations(${diagnostics.length}):`);
        for (const d of diagnostics) {
          diagnosticsLog(`    [${d.line}:${d.col}] ${d.code}`);
        }
      } else {
        diagnosticsLog("  \u2714 No violations");
      }
    }, 300);
  });
  log2("Run `engine.exec()` in `onDidOpen`", "debug");
  engine.exec().catch((error) => {
    log2(String(error), "error");
    notFoundParserError2(error);
    throw error;
  });
}
var debounceTimer2;
function onDidChangeContent3(document, log2, notFoundParserError2) {
  clearTimeout(debounceTimer2);
  const key = document.uri;
  const engine = engines2.get(key);
  debounceTimer2 = setTimeout(async () => {
    if (!engine) {
      return;
    }
    const code = document.getText();
    try {
      await engine.setCode(code);
      log2("Run `engine.exec()` in `onDidChangeContent`", "debug");
      engine.exec().catch((error) => notFoundParserError2(error));
    } catch (error) {
      if (error instanceof Error) {
        log2(error.message, "error");
        return;
      }
      log2(`UnknownError: ${error}`, "error");
    }
  }, 300);
}
function getNodeWithAccessibilityProps(textDocument, position, ariaVersion) {
  const key = textDocument.uri;
  const engine = engines2.get(key);
  if (!engine || !engine.document) {
    return null;
  }
  const node = engine.document.searchNodeByLocation(position.line + 1, position.character);
  if (!node || !node.is(node.ELEMENT_NODE)) {
    return null;
  }
  const aria = {};
  return {
    nodeName: node.localName,
    exposed: true,
    aria
  };
}

// src/server/get-accessibility-by-location.ts
async function getAccessibilityByLocation(engine, line, col, ariaVersion) {
  if (!engine?.document) {
    await engine.exec();
  }
  if (!engine?.document) {
    return null;
  }
  const node = engine.document.searchNodeByLocation(line, col);
  if (!node || !node.is(node.ELEMENT_NODE)) {
    return null;
  }
  const aria = engine.document.getAccessibilityProp(node, ariaVersion);
  return {
    node: node.localName,
    aria
  };
}

// src/server/v4.ts
var engines3 = /* @__PURE__ */ new Map();
async function onDidOpen3(document, MLEngine, config, locale, log2, diagnosticsLog, sendDiagnostics, notFoundParserError2) {
  const key = document.uri;
  log2(`Opened: ${key}`, "debug");
  const currentEngine = engines3.get(key);
  if (currentEngine) {
    return;
  }
  const filePath = getFilePath(document.uri, document.languageId);
  log2(`${filePath.dirname}/${filePath.basename}`, "debug");
  const sourceCode = document.getText();
  const file = await MLEngine.toMLFile({ sourceCode, name: filePath.basename, workspace: filePath.dirname });
  if (!file) {
    log2(`File not found: ${filePath.basename}`, "warn");
    return;
  }
  const engine = new MLEngine(file, {
    locale,
    debug: config.debug,
    defaultConfig: config.defaultConfig,
    watch: true
  });
  log2(`Engine created: ${key}`);
  let configSet = null;
  engines3.set(key, engine);
  engine.on("config", (_, _configSet) => {
    configSet = _configSet;
  });
  engine.on("log", (phase, message) => {
    log2(`[${phase}]: ${message}`, "trace");
  });
  engine.on("lint-error", (_filePath, _sourceCode, error) => {
    diagnosticsLog(error.message, "error");
  });
  engine.on("config-errors", (_filePath, errors) => {
    for (const error of errors) {
      diagnosticsLog("ConfigError: " + error.message, "error");
      log2("ConfigError: " + error.message, "warn");
    }
  });
  engine.on("lint", (filePath2, sourceCode2, violations, fixedCode, debug2) => {
    clearTimeout(debounceTimer3);
    diagnosticsLog("", "clear");
    debounceTimer3 = setTimeout(lint, 300);
    function lint() {
      diagnosticsLog(`Lint: ${document.uri}`);
      const errors = violations.filter((v) => v.severity === "error");
      const warns = violations.filter((v) => v.severity === "warning");
      log2(`Errors: ${errors.length}`, "debug");
      log2(`Warnings: ${warns.length}`, "debug");
      if (debug2) {
        diagnosticsLog("  Tracing AST Mapping:\n" + debug2.map((line) => `  ${line}`).join("\n"), "trace");
      }
      if (configSet) {
        if (configSet.files.size > 0) {
          diagnosticsLog("  Used configs:");
          for (const files of configSet.files.values()) {
            diagnosticsLog(`    ${files}`);
          }
        } else {
          diagnosticsLog("  No use configs");
        }
        if (configSet.plugins.length > 0) {
          diagnosticsLog("  Used plugins:");
          for (const plugin of configSet.plugins.values()) {
            diagnosticsLog(`    ${plugin.name}`);
          }
        } else {
          diagnosticsLog("  No use plugins");
        }
      }
      const diagnostics = convertDiagnostics({ filePath: filePath2, sourceCode: sourceCode2, violations, fixedCode });
      if (diagnostics.length > 0) {
        diagnosticsLog(`  Violations(${diagnostics.length}):`);
        for (const d of diagnostics) {
          diagnosticsLog(`    [${d.line}:${d.col}] ${d.code}`);
        }
      } else {
        diagnosticsLog("  \u2714 No violations");
      }
      sendDiagnostics({
        uri: document.uri,
        diagnostics
      });
    }
  });
  log2("Run `engine.exec()` in `onDidOpen`", "debug");
  engine.exec().catch((error) => {
    log2(String(error), "error");
    notFoundParserError2(error);
    throw error;
  });
}
var debounceTimer3;
function onDidChangeContent4(document, log2, notFoundParserError2) {
  clearTimeout(debounceTimer3);
  const key = document.uri;
  const engine = engines3.get(key);
  debounceTimer3 = setTimeout(async () => {
    if (!engine) {
      return;
    }
    const code = document.getText();
    try {
      await engine.setCode(code);
      log2("Run `engine.exec()` in `onDidChangeContent`", "debug");
      engine.exec().catch((error) => notFoundParserError2(error));
    } catch (error) {
      if (error instanceof Error) {
        log2(error.message, "error");
        return;
      }
      log2(`UnknownError: ${error}`, "error");
    }
  }, 300);
}
async function getNodeWithAccessibilityProps2(textDocument, position, ariaVersion) {
  const key = textDocument.uri;
  const engine = engines3.get(key);
  if (!engine) {
    return null;
  }
  const a11y = await getAccessibilityByLocation(engine, position.line + 1, position.character, ariaVersion);
  if (!a11y) {
    return null;
  }
  const { node, aria } = a11y;
  if (!aria) {
    return null;
  }
  if (aria.unknown) {
    return {
      nodeName: node,
      unknown: true
    };
  }
  if (!aria.exposedToTree) {
    return {
      nodeName: node,
      exposed: false,
      labels: {}
    };
  }
  const labels = {};
  const requiredLabel = `\u26A0\uFE0F**${t("Required")}**`;
  labels.role = aria.role ? `\`${aria.role}\`` : t("No corresponding role");
  labels.name = aria.nameProhibited ? `**${t("Prohibited")}**` : (
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    aria.name ? typeof aria.name === "string" ? `\`"${aria.name}"\`` : `**${t("Unknown")}**` : `${t("None")}${aria.nameRequired ? ` ${requiredLabel}` : ""}`
  );
  labels.focusable = `\`${aria.focusable}\``;
  for (const [propName, { value, required }] of Object.entries(aria.props ?? {})) {
    labels[propName] = value === void 0 ? t("Undefined") + (required ? ` ${requiredLabel}` : "") : `\`${value}\``;
  }
  return {
    nodeName: node,
    exposed: true,
    labels
  };
}

// src/server/document-events.ts
function createEventHandlers(options) {
  let uiInitialized = false;
  return {
    onDidOpen(document) {
      const languageId = document.languageId;
      const langConfig = options.langConfigs[languageId] ?? null;
      if (!langConfig?.enable) {
        options.log(`Disabled for languageId:${languageId} according to VS Code settings.`, "warn");
        return;
      }
      options.log(`Evaluate ${document.uri} from languageId:${languageId}`, "info");
      if (!uiInitialized) {
        options.initUI();
        uiInitialized = true;
      }
      if ((0, import_semver.satisfies)(options.mod.version, "1.x")) {
        return;
      }
      if ((0, import_semver.satisfies)(options.mod.version, "2.x")) {
        void onDidOpen(
          document,
          options.mod.markuplint.MLEngine,
          langConfig,
          options.locale,
          options.sendDiagnostics,
          notFoundParserError(languageId, options.errorLog)
        );
        return;
      }
      if ((0, import_semver.satisfies)(options.mod.version, "3.x")) {
        void onDidOpen2(
          document,
          options.mod.markuplint.MLEngine,
          langConfig,
          options.locale,
          options.log,
          options.diagnosticsLog,
          options.sendDiagnostics,
          notFoundParserError(languageId, options.errorLog)
        );
        return;
      }
      void onDidOpen3(
        document,
        options.mod.markuplint.MLEngine,
        langConfig,
        options.locale,
        options.log,
        options.diagnosticsLog,
        options.sendDiagnostics,
        notFoundParserError(languageId, options.errorLog)
      );
    },
    onDidChangeContent(document) {
      const languageId = document.languageId;
      const langConfig = options.langConfigs[languageId] ?? null;
      if (!langConfig?.enable) {
        return;
      }
      if ((0, import_semver.satisfies)(options.mod.version, "1.x")) {
        void onDidChangeContent(document, options.mod.markuplint, langConfig, options.sendDiagnostics);
        return;
      }
      if ((0, import_semver.satisfies)(options.mod.version, "2.x")) {
        onDidChangeContent2(document, notFoundParserError(languageId, options.errorLog));
        return;
      }
      if ((0, import_semver.satisfies)(options.mod.version, "3.x")) {
        onDidChangeContent3(document, options.log, notFoundParserError(languageId, options.errorLog));
        return;
      }
      onDidChangeContent4(document, options.log, notFoundParserError(languageId, options.errorLog));
    },
    async onHover(params) {
      const enable = options.langConfigs["html"]?.hover.accessibility.enable;
      if (!enable) {
        return;
      }
      const ariaVersion = options.langConfigs["html"]?.hover.accessibility.ariaVersion ?? options.mod.ariaRecommendedVersion;
      if ((0, import_semver.lt)(options.mod.version, "4.0.0")) {
        const node = getNodeWithAccessibilityProps(params.textDocument, params.position, ariaVersion);
        if (!node) {
          return;
        }
        const heading2 = `\`<${node.nodeName}>\` **${t("Computed Accessibility Properties")}**:
`;
        const props = node.exposed ? `${Object.entries(node.aria).map(([key, value]) => `- ${key}: ${value}`).join("\n")}` : `
**${t("No exposed to accessibility tree")}** (${t("hidden element")})`;
        return {
          contents: {
            kind: import_node3.MarkupKind.Markdown,
            value: heading2 + props
          }
        };
      }
      const aria = await getNodeWithAccessibilityProps2(params.textDocument, params.position, ariaVersion);
      if (!aria) {
        return;
      }
      const heading = `\`<${aria.nodeName}>\` **${t("Computed Accessibility Properties")}**:
`;
      const body = "unknown" in aria ? `
**${t("Unknown")}**` : aria.exposed ? `${Object.entries(aria.labels).map(([key, value]) => `- ${key}: ${value}`).join("\n")}` : `
**${t("No exposed to accessibility tree")}** (${t("hidden element")})`;
      return {
        contents: {
          kind: import_node3.MarkupKind.Markdown,
          value: heading + body
        }
      };
    }
  };
}
function notFoundParserError(languageId, errorLog) {
  return (e) => {
    if (e instanceof Error) {
      const { groups } = /Cannot find module.+(?<parser>@markuplint\/[a-z]+-parser)/.exec(e.message) || {};
      const parser = groups?.parser;
      errorLog(
        `Parser not found. You probably need to install ${parser} because it detected languageId: ${languageId}.`
      );
      return;
    }
    throw e;
  };
}

// src/server/get-module.ts
var import_node_path2 = __toESM(require("node:path"), 1);
var import_node4 = require("vscode-languageserver/node.js");
async function getModule(log2) {
  let markuplint;
  let isLocalModule = false;
  let pkg;
  try {
    log2("Getting module", "debug");
    const modPath = await fileResolve((message) => log2(message));
    log2(`import("${modPath}")`, "debug");
    markuplint = await import(modPath);
    log2(`Found package: ${modPath}`, "debug");
    const packageJsonPath = import_node_path2.default.resolve(import_node_path2.default.dirname(modPath), "..", "package.json");
    pkg = require(packageJsonPath);
    pkg = pkg.default ?? pkg;
    isLocalModule = true;
  } catch (error) {
    log2(`Failed to resolve local package: ${error}`, "error");
    try {
      markuplint = await import("markuplint");
      log2("Found package: markuplint", "debug");
      pkg = await import("markuplint/package.json", { with: { type: "json" } }).catch(() => {
        log2("Failed to resolve package: markuplint/package.json (ERR_PACKAGE_PATH_NOT_EXPORTED)", "debug");
        const vscodePkg = require(import_node_path2.default.resolve(__dirname, "..", "package.json"));
        return {
          version: vscodePkg.dependencies.markuplint,
          type: "module"
        };
      });
      pkg = pkg.default ?? pkg;
      log2("Found package: markuplint/package.json", "debug");
    } catch (error2) {
      log2("Failed to resolve package: markuplint in VS Code", "debug");
      throw error2;
    }
  }
  const version = pkg.version;
  const moduleType = pkg.type ?? "commonjs";
  log2(`Loaded package: markuplint@${version}(type:${moduleType})`, "debug");
  return {
    isLocalModule,
    version,
    moduleType,
    markuplint,
    ariaRecommendedVersion: "1.2"
  };
}
async function fileResolve(log2) {
  try {
    const modPath = await import_node4.Files.resolve("markuplint", process.cwd(), process.cwd(), (message) => log2(message));
    log2(`Files.resolve('markuplint', "${process.cwd()}"): ${modPath}`);
    return modPath;
  } catch (error) {
    try {
      log2(`Files.resolve('markuplint', "${process.cwd()}"): ${error}`);
      const modPath = require.resolve("markuplint", { paths: [process.cwd()] });
      log2(`require.resolve('markuplint'): ${modPath}`);
      return modPath;
    } catch (error2) {
      log2(`require.resolve('markuplint'): ${error2}`);
      if (error2 instanceof Error && "code" in error2 && error2.code === "ERR_PACKAGE_PATH_NOT_EXPORTED") {
        const modPackageJsonPath = error2.message.replace(/^No "exports" main defined in /, "");
        const pkg = require(modPackageJsonPath);
        const main = pkg.main ?? pkg.exports?.["."]?.import ?? pkg.exports?.["."]?.require ?? pkg.exports["."] ?? null;
        if (!main) {
          error2.message = error2.message + " No main";
          throw error2;
        }
        log2(`require("${modPackageJsonPath}") => package.json: ${main}`);
        const modPath = import_node_path2.default.resolve(import_node_path2.default.dirname(modPackageJsonPath), main);
        return modPath;
      }
      throw error2;
    }
  }
}

// src/server/server.ts
var DEBUG = false;
function bootServer() {
  const connection = (0, import_node5.createConnection)(import_node5.ProposedFeatures.all);
  const log2 = (message, type = "debug") => {
    void connection.sendNotification(logToPrimaryChannel, [message, type]);
  };
  const diagnosticsLog = (message, type = "info") => {
    void connection.sendNotification(logToDiagnosticsChannel, [message, type]);
  };
  const errorLog = (message) => {
    void connection.sendNotification(errorToPopup, message);
  };
  const sendDiagnostics = (params) => {
    void connection.sendDiagnostics(params);
  };
  const documents = new import_node5.TextDocuments(import_vscode_languageserver_textdocument.TextDocument);
  documents.listen(connection);
  connection.onInitialize((params) => {
    log2("onInitialize");
    const locale = params.locale ?? "en";
    const langConfigs = params.initializationOptions.langConfigs;
    connection.onInitialized(async () => {
      log2("onInitialized");
      if (DEBUG) {
        verbosely();
      }
      const mod = await getModule(log2);
      log2(`Found version: ${mod.version} (isLocalModule: ${mod.isLocalModule})`, "info");
      log2(`Locale: ${locale}`, "info");
      const { onDidOpen: onDidOpen4, onDidChangeContent: onDidChangeContent5, onHover } = createEventHandlers({
        mod,
        locale,
        langConfigs,
        log: log2,
        diagnosticsLog,
        errorLog,
        sendDiagnostics,
        initUI() {
          const message = mod.isLocalModule ? null : t(NO_INSTALL_WARNING, mod.version) + t(". ");
          void connection.sendRequest(status, {
            version: mod.version,
            isLocalModule: mod.isLocalModule,
            message
          });
          if (message) {
            void connection.sendNotification(logToPrimaryChannel, [message, "warn"]);
          }
        }
      });
      documents.onDidOpen((e) => onDidOpen4(e.document));
      documents.all().forEach(onDidOpen4);
      documents.onDidChangeContent((e) => onDidChangeContent5(e.document));
      connection.onHover(onHover);
    });
    return {
      capabilities: {
        textDocumentSync: import_node5.TextDocumentSyncKind.Incremental,
        hoverProvider: true
      }
    };
  });
  connection.listen();
}

// src/server/index.ts
void bootServer();

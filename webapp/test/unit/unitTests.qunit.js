/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"cyber_security/cyber_security/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});

/**
 * Created by: victor on 2/1/15.
 * Source: connectionManager.js
 * Author: victor
 * Description:
 *
 */
var emitter = require('events').EventEmitter, /* Event Emitter Module */
    util = require('util');

function ConnectionManager(sandBoxManager) {
    "use strict";

    var io = require('socket.io-client'),
        validator = require('validator'),
        sndbxMap = sandBoxManager.getSandBoxMap(),
        self = this,
        serverURL = "", /* The Server URL */
        socket;

    /*************************** SOCKET.IO EVENTS ****************************************/
    {

        /**
         * Sets the Server URL string for this communicator.
         * @public
         * @URL (string) The server URL string.
         */
        self.setServerURL = function (URL) {

            var validationOptions = {
                protocols: ['http', 'https'],
                require_protocol: true,
                allow_underscores: true,
                allow_trailing_dot: true
            }

            /* Validating URL */
            if (typeof URL !== "string") {
                if (!validator.isURL(URL, validationOptions) && !validator.isIP(URL)) {
                    throw new Error("URL must be a valid lease provide a valid URL or IP address.");
                }
            }

            serverURL = URL;
        };

        /**
         * Return  the server URL of this communicator.
         * @public
         * @return {string} The server URL string.
         */
        self.getServerURL = function () {
            return serverURL;
        };

        /**
         * Connect to the remote server.
         * @public
         * @info {Object} Object containing the metrics of this machine. Including
         * the info.isClient property which Indicates if this is a client or
         * sandbox instance.
         */
        self.connect = function (info) {

            /* Validating URL */
            if (serverURL.isNull() || serverURL.isEmpty() || typeof serverURL !== "string") {
                throw new Error("Server URL not set, please set a valid URL");
            }
            /* Validating info */
            if (info.isNull() || typeof info !== "object") {
                throw new Error("info must be a non null object");
            }

            self.connect(serverURL, info);
        };

        /**
         * Connect to the remote server.
         * @public
         * @URL {String} The URL String.
         * @info {Object} Object containing the metrics of this machine. Including
         * the info.isClient property which Indicates if this is a client or
         * sandbox instance.
         */
        self.connect = function (URL, info) {

            /* Validating URL */
            if (URL.isNull() || URL.isEmpty() || typeof URL !== "string") {
                throw new Error("Empty or null URL provided, please provide a valid URL");
            }
            /* Validating info */
            if (info.isNull() || typeof info !== "object") {
                throw new Error("info must be a non null object");
            }

            /* Set new server URL */
            serverURL = URL;

            socket = io.connect(URL, {
                query: 'sysInfo=' + JSON.stringify(info)
            });

            /* Bind socket events */
            bindSocketEvents();
        };

        /**
         * Binds the socket to each network IO event.
         * @private
         */
        var bindSocketEvents = function () {

            socket.on('connect', function () {

                /* Reconnect handler */
                socket.on('reconnect', function () {
                    /* Request sandbox listing after reconnection*/
                    socket.emit("requestReconnectSndbxLst");
                });

                /* Disconnect handler */
                socket.on('disconnect', function () {
                    /* Executing disconnect event handler, it will be executed
                     if the communication manager have passed a callback function */
                    self.emit("disconnect");
                });

                /* New Sandbox Connected handler */
                socket.on('sndbxConnected', function (sndbx) {

                    /* Adding incoming SandBox */
                    sndbxMap.set(sndbx.id, sndbx);
                    /* Executing sandBoxConnected event handler, it will be executed
                     if the communication manager have passed a callback function */
                    self.emit("sndbxConnected", sndbx);
                });

                /* Sandbox Disconnected handler */
                socket.on('sndbxDisconnected', function (id) {

                    /* Temporary storing the deleted sandbox(for the emitter */
                    var sndbx = sndbxMap.get(id);
                    /* Removing incoming sandbox */
                    sndbxMap.delete(id);
                    /* Executing sandBoxConnected event handler, it will be executed
                     if the communication manager have passed a callback function */
                    self.emit("sndbxDisconnected", sndbx);

                });

                /* Receive Sandbox list Handler */
                socket.on('responseSndbxLst', function (sndbxLst) {

                    var i;

                    /* Adding each incoming sandboxes */
                    for (i = 0; i < sndbxLst.length; i++) {
                        sndbxMap.set(sndbxLst[i].id, sndbxLst[i]);
                    }

                    /*  After sandbox listing is ready, trigger the
                     connected event.*/
                    self.emit("connect");
                });


                /* Receive job execution result handler */
                /* Note: This will be executed asynchronously as the
                 executed sandboxes are done executing.
                 */
                socket.on('jobExecutionResponse', function (results) {
                    self.emit("jobExecutionResponse", results);
                });

                /* Receive job error result */
                /* Note: This will be executed asynchronously as the
                 executed sandboxes return execution error or disconnected.
                 */
                socket.on('jobExecutionErrorResponse', function (results) {
                    self.emit("jobExecutionErrorResponse", results);
                });

                /* Receive Sandbox list Handler */
                socket.on('responseReconnectSndbxLst', function (sndbxLst) {

                    var i;

                    /* Adding each incoming sandboxes */
                    for (i = 0; i < sndbxLst.length; i++) {
                        sndbxMap.set(sndbxLst[i].id, sndbxLst[i]);
                    }

                    /*  After sandbox listing is ready, trigger the
                     connected event.*/
                    self.emit("reconnect");
                });

                /* After reconnecting Receive Sandbox list Handler */
                socket.on('responseSndbxLst', function (sndbxLst) {

                    var i;

                    /* Adding each incoming sandboxes */
                    for (i = 0; i < sndbxLst.length; i++) {
                        sndbxMap.set(sndbxLst[i].id, sndbxLst[i]);
                    }

                    /*  After sandbox listing is ready, trigger the
                     connected event.*/
                    self.emit("connect");
                });

                /* Request sandbox listing on connect */
                socket.emit("requestSndbxLst");

            });
        };

    }
    /*************************** BIND EXTERNAL EMIT FUNCTIONS ****************************/
    {
        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.bindConnectEmiter = function (listener) {
            self.on("connect", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.binDisconnectEmiter = function (listener) {
            self.on("disconnect", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.bindReconnectEmiter = function (listener) {
            self.on("reconnect", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.bindSandBoxConnectedEmiter = function (listener) {
            self.on("sndbxConnected", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.bindSandBoxDisconnectedEmiter = function (listener) {
            self.on("sndbxDisconnected", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.bindJobExecutionResponseEmiter = function (listener) {
            self.on("jobExecutionResponse", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.bindJobExecutionErrorResponseEmiter = function (listener) {
            self.on("jobExecutionErrorResponse", listener);
        };

    }
    /*************************** UNBIND EXTERNAL EMIT FUNCTIONS **************************/
    {
        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.unbindConnectEmiter = function (listener) {
            self.removeListener("connect", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.unbinDisconnectEmiter = function (listener) {
            self.removeListener("disconnect", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.unbindReconnectEmiter = function (listener) {
            self.removeListener("reconnect", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.unbindSandBoxConnectedEmiter = function (listener) {
            self.removeListener("sndbxConnected", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.unbindSandBoxDisconnectedEmiter = function (listener) {
            self.removeListener("sndbxDisconnected", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.unbindJobExecutionResponseEmiter = function (listener) {
            self.removeListener("jobExecutionResponse", listener);
        };

        /*
         * Description
         * @public
         * @listener {function} Description
         */
        self.unbindJobExecutionErrorResponseEmiter = function (listener) {
            self.removeListener("jobExecutionErrorResponse", listener);
        };
    }
}

/* extend the EventEmitter class using our Connection Manager class */
util.inherits(ConnectionManager, emitter);
/* we specify that this module is a reference to the Connection Manager class */
module.exports = ConnectionManager;
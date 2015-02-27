/**
 * Created by: victor on 2/1/15.
 * Source: sandBoxManager.js
 * Author: victor
 * Description:
 *
 */
var emitter = require('events').EventEmitter, /* Event Emitter Module */
    util = require('util');

function SandBoxManager() {
    "use strict";

    var Map = require("collections/map"), /* Map Collection Data Structure Class */
        sndbxMap = new Map(), /* The Map of SandBoxes */
        self = this;

    /*************************** SANDBOX MAP METHODS *************************************/
    {
        /**
         * Returns the sandbox hash map.
         * @public
         * @return {Object} The internal sandbox hash map store.
         */
        self.getSandBoxMap = function () {
            return sndbxMap;
        };

        /**
         * Returns the length of the connected sandboxes collection.
         * @public
         * @return {Integer} The current number of connected sandboxes.
         */
        self.getSandBoxCount = function () {
            return sndbxMap.length;
        };

        /**
         * Check if the current SandBox ID is present in the connected sandboxes.
         * @public
         * @key {integer} The ID of the sandbox socket.
         * @return {boolean} True or false depending of the existence of the
         *                   key in the map.
         */
        self.hasSandBox = function (key) {
            return sndbxMap.has(key);
        };

        /**
         * Get sandBox for the given ID.
         * @public
         * @key {integer} The ID of the sandbox socket.
         * @return {type} Description
         */
        self.getSandBox = function (key) {
            return sndbxMap.get(key);
        };

        /**
         * Get all current connected SandBoxes IDs.
         * @public
         * @return {array} Collection of all sandboxes keys.
         */
        self.getSandBoxesKeys = function () {
            return sndbxMap.keys();
        };

        /**
         * Get all connected SandBoxes.
         * @public
         * @return {array} Collection of all sandboxes.
         */
        self.getSandBoxes = function () {
            return sndbxMap.values();
        };

        /**
         * Returns an object with each property name and value corresponding to the ID and SandBoxes in this collection.
         * @public
         * @return {object} Object with each sandBox as members in the form of ID:SandBox.
         */
        self.sandBoxesToObject = function () {
            return sndbxMap.toObject();
        };

        /**
         * Returns a JSON object of the SandBoxes map.
         * @public
         * @return {string} JSON string.
         */
        self.sandBoxesToJSON = function () {
            return sndbxMap.toJSON();
        };

        /**
         * Return all SandBoxes with its IDs in pairs.
         * @public
         * @return {array} Collection all [ID, SandBox] entries.
         */
        self.getIDAndSandBoxPairs = function () {
            return sndbxMap.entries();
        };

        /**
         * Maps each SandBox to a given callback function, returns the processed value in a collection
         * in the same order.
         * @public
         * @callback {function} function for the Sandbox mapping.Must contain
         *                      a parameter for the sandbox, and a return for the
         *                      mapped result.
         * @return {array} Collection mapped results.
         */
        self.mapSandBoxes = function (callback) {
            return sndbxMap.map(callback);
        };

        /**
         * Returns an array with each SandBox from this collection that passes the given test.
         * @public
         * @callback {function} function for the filtering.Must contain
         *                      a parameter for the sandbox, and a return a boolean,
         *                      true to include the sandbox in the collection, or
         *                      false to exclude the sandbox.
         * @return {array} Collection filtered sandboxes.
         */
        self.filterSandBoxes = function (callback) {
            return sndbxMap.filter(callback).entries();
        };

        /**
         * Calls the callback for each Sandbox in the collection
         * @public
         * @callback {function} function for the foreach iteration.
         */
        self.forEachSandBox = function (callback) {
            sndbxMap.forEach(callback);
        };

        /**
         * Returns an array of [key, class] entries where every SandBox
         * from the collection is placed into the same equivalence
         * class if they return the same key through the given callback.
         * @public
         * @callback {function} function for the grouping.Must contain
         *                      a parameter for the sandbox, and a return a key to be used
         *                      by the grouping.
         * @return {array} Collection of [key, class] pairs according to the grouping.
         */
        self.groupSandBoxes = function (callback) {
            return sndbxMap.group(callback);
        };

        /**
         * Returns whether any sandBox in this collection passes a given test.
         * @public
         * @callback {function} function for the checking.Must contain
         *                      a parameter for the sandbox, and a return a boolean that
         *                      indicates if pass or fail the test.
         * @return {boolean} True if at least one sandBox passes the test, false if otherwise.
         */
        self.someSandBox = function (callback) {
            return sndbxMap.some(callback);
        };

        /**
         * Returns whether every SandBox in this collection passes a given test.
         * @public
         * @callback {function} function for the checking.Must contain
         *                      a parameter for the sandbox, and a return a boolean that
         *                      indicates if pass or fail the test.
         * @return {boolean} True if all sandBox passes the test, false if otherwise.
         */
        self.everySandBox = function (callback) {
            return sndbxMap.every(callback);
        };
    }
}

/* extend the EventEmitter class using our Metrics Manager class */
util.inherits(SandBoxManager, emitter);
/* we specify that this module is a reference to the Metrics Manager class */
module.exports = SandBoxManager;
/**
 * Created by: victor on 2/1/15.
 * Source: sandBoxManager.js
 * Author: victor
 * Description:
 *
 */
var emitter = require('events').EventEmitter, /* Event Emitter Module */
    util = require('util');

/**
 * @constructor
 * @extends {EventEmitter}
 */
function SandBoxManager() {
    "use strict";

    var Map = require("collections/map"), /* Map Collection Data Structure Class */
        sndbxMap = new Map(), /* The Map of SandBoxes */
        self = this;

    /*************************** SANDBOX MAP METHODS *************************************/

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


/*************************** SANDBOX DEFINITION METHODS *************************************/

/**
 * @constructor
 */
SandBoxManager.sandBox = function () {
    "use strict";

    var self = this,
        id,
        cpu,
        numOfCores,
        architecture,
        freeMemory,
        hostName,
        platform,
        totalMemory,
        OSType,
        upTime,
        publicIP,
        singleThreadFlops,
        parallelFlops,
        isNodeJSRuntime,
        isBrowserRuntime;

    /***************** Getters *************/
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getId = function(){
        return id;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getCpu = function(){
        return cpu;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getNumOfCores = function(){
        return numOfCores;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getArchitecture = function(){
        return architecture;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getFreeMemory = function(){
        return freeMemory;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getHostName = function(){
        return hostName;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getPlatform = function(){
        return platform;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getTotalMemory = function(){
        return totalMemory;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getOSType = function(){
        return OSType;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getUpTime = function(){
        return upTime;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getPublicIP = function(){
        return publicIP;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getSingleThreadFlops = function(){
        return singleThreadFlops;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getParallelFlops = function(){
        return parallelFlops;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getIsNodeJSRuntime = function(){
        return isNodeJSRuntime;
    };
    /**
     * Returns.
     * @public
     * @return {Type}.
     */
    self.getIsBrowserRuntim = function(){
        return isBrowserRuntime;
    };

    /***************** Setters *************/
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setId = function(parId){
        id = parId;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setCpu = function(parCpu){
        cpu = parCpu;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setNumOfCores = function(parNumOfCores){
        numOfCores = parNumOfCores;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setArchitecture = function(parArchitecture){
        architecture = parArchitecture;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setFreeMemory = function(parFreeMemory){
        freeMemory = parFreeMemory;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setHostName = function(parHostName){
        hostName = parHostName;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setPlatform = function(parPlatform){
        platform = parPlatform;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setTotalMemory = function(parTotalMemory){
        totalMemory = parTotalMemory;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setOSType = function(parOSType){
        OSType = parOSType;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setUpTime = function(parUpTime){
        upTime = parUpTime;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setPublicIP = function(parPublicIP){
        publicIP = parPublicIP;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setSingleThreadFlops = function(parSingleThreadFlops){
        singleThreadFlops = parSingleThreadFlops;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setParallelFlops = function(parParallelFlops){
        parallelFlops = parParallelFlops;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setIsNodeJSRuntime = function(parIsNodeJSRuntime){
        isNodeJSRuntime = parIsNodeJSRuntime;
    };
    /**
     * Sets.
     * @public
     * @param {Type}.
     */
    self.setIsBrowserRuntime = function(parIsBrowserRuntim){
        isBrowserRuntime = parIsBrowserRuntim;
    };
};


/* extend the EventEmitter class using our Metrics Manager class */
util.inherits(SandBoxManager, emitter);
/* we specify that this module is a reference to the Metrics Manager class */
module.exports = SandBoxManager;
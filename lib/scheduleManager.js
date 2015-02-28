/**
 * Created by: victor on 2/1/15.
 * Source: schedulerManager.js
 * Author: victor
 * Description:
 *
 */
var emitter = require('events').EventEmitter, /* Event Emitter Module */
    util = require('util');

function ScheduleManager() {
    "use strict";

    var self = this;


    //TODO: Write schedulerManager body


}

/**
 * The Schedule SubClass.
 * @Static
 * @public
 * {Object}
 */
ScheduleManager.Schedule  = function(){
    "use strict";

    this.prop = {};
};


/* extend the EventEmitter class using our Scheduler Manager class */
util.inherits(ScheduleManager, emitter);
/* we specify that this module is a reference to the Scheduler Manager class */
module.exports = ScheduleManager;
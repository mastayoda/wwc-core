/**
 * Created by: victor on 2/1/15.
 * Source: jobManager.js
 * Author: victor
 * Description:
 *
 */
var emitter = require('events').EventEmitter, /* Event Emitter Module */
    util = require('util');

function JobManager() {
    "use strict";

    var self = this;

};

/*************************** STATIC CLASS JOB OBJECT DEFINITION ***********************************/

/**
 * The object enumerator for the Job Types.
 * @public
 * {Object}
 */
JobManager.JobTypes = {
    STREAMING: "_STREAM",
    BATCH: "_BATCH"
};

/**
 * The object enumerator for the Job Types.
 * @public
 * {Object}
 */
JobManager.JobParameter = function () {
    var data = {};

    /**
     * Set the parameter data.
     * @public
     * @d {any type} data to be added.
     * @return {any type} return the provided parameter data.
     */
    this.setData = function (d) {
        data = d;
    };
};

/**
 * Description
 * @public
 * @return {Object} An instance of a Job object type.
 */
JobManager.Job = function () {

    var Chance = require('chance'),
        chance = new Chance(),
        FileSystemManager = require("./fileSystemManager"),
        SchedulerManager = (require("../lib/scheduleManager")),
        check = require('syntax-error'),
        validator = require('validator');

    var jobGUID = null, /* Global Unique Job Identifier */
        jobParentSocketID = null, /* The Socket ID where this job comes from. */
    /* Assigned at deployment time. */
        jobType = null, /* The Job Type, Enumerator in the JobManager.JobTypes */
        jobParamsArePartitioned = false, /* Determine if the parameters are partitioned (Not Unique
     /* and must be distributed among Sandboxes) */
        jobApplication = null, /* The job's application code */
        jobParameters = null, /* The job's application parameters */
        jobSchedule = null, /* Job Schedule (distribution, connections, and pipelines) */
        jobRemoteDisks = null, /* Job Remote Disks for file access */
        jobName = null, /* The name of the current job */
        jobDescription = null;
    /* The description of the current job */

    /* Default Initializations */
    jobGUID = chance.guid();
    jobName = "Job-" + jobGUID + "-" + new Date().toLocaleString();
    jobDescription = "";

    /************** SETTERS ****************/
    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.setJobParentSocketID = function (socketID) {
        /* Validating socket id */
        if (typeof socketID != "number") {
            throw new Error("The JobParentSocketID must be a valid integer");
        }
        return jobParentSocketID = socketID;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.setJobType = function (type) {
        /* Validating URL */
        if (typeof  type != "string") {
            throw new Error("The JobType must be a valid STRING enumerated in JobManager.JobTypes");
        }
        else if (type != JobManager.JobTypes.BATCH && type != JobManager.JobTypes.STREAMING) {
            throw new Error("The JobType must be a valid type enumerated in JobManager.JobTypes");
        }

        return jobType = type;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.setJobParamArePartitioned = function (ispartitioned) {
        /* Validating boolean */
        if (typeof ispartitioned != "boolean") {
            throw new Error("JobIsPartitioned must be a valid boolean");
        }
        return jobParamsArePartitioned = ispartitioned;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.setJobApplication = function (application) {

        /* Validating application code */
        if (typeof  application != "string") {
            throw new Error("The jobApplication must be a valid STRING source.");
        }

        /* Validating Syntax correctness */
        var err = check(application, null);
        if (err) {
            throw new Error(err);
        }

        return jobApplication = application;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.setJobParameters = function (parameters) {

        /* Validating parameters code: must be a JSON object */
        if (parameters instanceof JobManager.JobParameter) {
            return jobParameters = parameters;
        }
        else {
            throw new Error("The jobParameters must be an instance of jobManager.JobParameter");
        }
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.setJobSchedule = function (schedule) {

        /* Validating scheduler: must be an object */
        if (schedule instanceof SchedulerManager.Schedule) {
            return jobSchedule = schedule;
        }
        else {
            throw new Error("The jobSchedule must be an instance of schedulerManager.Schedule");
        }
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.setJobRemoteDisks = function (disks) {

        /* Validating disks: must be an array if RemoteDisk */
        if ((disks instanceof Array)) {
            for(i=0;i<disks.length;i++)
            {
                if(!(disks[i] instanceof FileSystemManager.RemoteDisk))
                {
                    throw new Error("All elements in the array must be instance of FileSystemManager.RemoteDisk");
                }
            }
        }
        else
        {
            throw new Error("The jobRemoteDisks must be an array containing instances of FileSystemManager.RemoteDisk");
        }

        return jobRemoteDisks = disks;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.setJobName = function (name) {

        /* Validating Job's name */
        if (typeof  name != "string") {
            throw new Error("The jobName must be a valid STRING.");
        }

        return jobName = name;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.setJobDescription = function (description) {

        /* Validating Job Description */
        if (typeof  description != "string") {
            throw new Error("The jobDescription must be a valid STRING.");
        }

        return jobDescription = description;
    };

    /************** GETTERS ****************/
    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobGUID = function () {

        return jobGUID;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobParentSocketID = function () {

        return jobParentSocketID;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobType = function () {
        /* Validating URL */
        return jobType;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobIsPartitioned = function () {

        return jobIsPartitioned;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobApplication = function () {

        return jobApplication;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobParameters = function () {

        return jobParameters;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobRemoteDisks = function () {

        return jobRemoteDisks;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobScheduler = function () {

        return jobSchedule;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobName = function () {

        return jobName;
    };

    /**
     * Description
     * @public
     * @
     * @return {type} Description
     */
    this.getJobDescription = function (description) {

        return jobDescription;
    };

};


/* extend the EventEmitter class using our Job Manager class */
util.inherits(JobManager, emitter);
/* we specify that this module is a reference to the Job Manager class */
module.exports = JobManager;
/**
 * Created by: victor on 1/31/15.
 * Source: connectionManagerSpec.js
 * Author: victor
 * Description: Test File for the Connection Manager file.
 *
 */
var expect = require("chai").expect;
var Core = require("../core.js");
var core = new Core();

describe("Job Manager", function () {

    describe("#JobTypes Enumerator", function () {
        it("Should verify types consistency", function () {

            var obj = core.getJobManager().constructor;
            expect(obj.JobTypes.STREAMING).to.be.equal("_STREAM");
            expect(obj.JobTypes.BATCH).to.be.equal("_BATCH");
        });
    });

    describe("#Job Object", function () {
        it("Should verify Job Object is an actual object", function () {

            var obj = core.getJobManager();
            var job = new obj.constructor.Job();

            expect(job).to.be.an("object");
        });
    });

    describe("#Job.setJobParentSocketID()", function () {
        it("Should set the jobParentSocketID property", function () {

            var obj = core.getJobManager();
            var job = new obj.constructor.Job();

            expect(function(){job.setJobParentSocketID("1")}).to.throw(Error);
            expect(job.setJobParentSocketID(1)).to.be.equal(1);

        });
    });

    describe("#Job.setJobType()", function () {
        it("Should set the Job Type", function () {

            var obj = core.getJobManager();
            var job = new obj.constructor.Job();

            expect(function(){job.setJobType(2)}).to.throw(Error);
            expect(function(){job.setJobType("hello")}).to.throw(Error);
            expect(job.setJobType(obj.constructor.JobTypes.BATCH)).to.be.equal(obj.constructor.JobTypes.BATCH);
            expect(job.setJobType(obj.constructor.JobTypes.STREAMING)).to.be.equal(obj.constructor.JobTypes.STREAMING);
        });
    });

    describe("#Job.setJobParamArePartitioned()", function () {
        it("Should set the job's parameters partitioning flag", function () {

            var obj = core.getJobManager();
            var job = new obj.constructor.Job();

            expect(function(){job.setJobParamArePartitioned(2)}).to.throw(Error);
            expect(function(){job.setJobParamArePartitioned("hello")}).to.throw(Error);
            expect(job.setJobParamArePartitioned(true)).to.be.equal(true);

        });
    });

    describe("#Job.setJobApplication()", function () {
        it("Should set the job's application code", function () {

            var obj = core.getJobManager();
            var job = new obj.constructor.Job();
            var correctCode = "if(true){var a=10;}else{j='hello';}";
            var incorrectCode = "if(true){var a=10;}else j='hello';}";

            expect(function(){job.setJobApplication(2)}).to.throw(Error);
            expect(function(){job.setJobApplication(incorrectCode)}).to.throw(Error);
            expect(job.setJobApplication(correctCode)).to.be.equal(correctCode);

        });
    });

    describe("#Job.setJobParameters()", function () {
        it("Should set the job parameters object", function () {

            var obj = core.getJobManager();
            var job = new obj.constructor.Job();
            var dummyObj = {data:[1,2,3], flag:true};

            var param = new obj.constructor.JobParameter();
            param.setData(dummyObj);

            expect(function(){job.setJobParameters(2)}).to.throw(Error);
            expect(function(){job.setJobParameters(dummyObj)}).to.throw(Error);
            expect(job.setJobParameters(param)).to.be.deep.equal(param);


        });
    });

    describe("#Job.setJobScheduler()", function () {
        it("Should set the job scheduler object", function () {

            var obj = core.getJobManager();
            var schedMngr = core.getScheduleManager();
            var job = new obj.constructor.Job();
            var dummyObj = {data:[1,2,3], flag:true};
            var schedule = new schedMngr.constructor.Schedule();

            expect(function(){job.setJobSchedule(2)}).to.throw(Error);
            expect(function(){job.setJobSchedule(dummyObj)}).to.throw(Error);
            expect(job.setJobSchedule(schedule)).to.be.deep.equal(schedule);



        });
    });

    describe("#Job.setJobRemoteDisks()", function () {
        it("Should set the job's remote disks array", function () {

            var obj = core.getJobManager();
            var job = new obj.constructor.Job();
            var FileSystemManager = require("../lib/fileSystemManager");

            var disks = [];
            disks.push(new FileSystemManager.RemoteDisk());
            disks.push(new FileSystemManager.RemoteDisk());
            disks.push(new FileSystemManager.RemoteDisk());

            expect(function(){job.setJobRemoteDisks(2)}).to.throw(Error);
            expect(function(){job.setJobRemoteDisks([{},"hello"])}).to.throw(Error);
            expect(job.setJobRemoteDisks(disks)).to.be.deep.equal(disks);


        });
    });

    describe("#Job.setJobName()", function () {
        it("Should set the job string name", function () {

            var obj = core.getJobManager();
            var job = new obj.constructor.Job();

            expect(function(){job.setJobName(2)}).to.throw(Error);
            expect(job.setJobName("my job")).to.be.equal("my job");

        });
    });

    describe("#Job.setJobDescription()", function () {
        it("Should set the ", function () {

            var obj = core.getJobManager();
            var job = new obj.constructor.Job();

            expect(function(){job.setJobName(2)}).to.throw(Error);
            expect(job.setJobName("my job")).to.be.equal("my job");

        });
    });




});
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

describe("Connection Manager", function () {

    var serverURL = "https://wwcl-server-mastayoda1.c9.io";
    var serverIP = "192.168.1.102";

    describe("#setServerURL()", function () {
        it("Should set the server URL", function () {

            var obj = core.getConnectionManager();
            obj.setServerURL(serverIP);
            obj.setServerURL(serverURL);

        });
    });

    describe("#getServerURL()", function () {
        it("Should get the server URL", function () {

            var obj = core.getConnectionManager();
            var url = obj.getServerURL();

            expect(url).to.be.equal(serverURL);
        });
    });


});
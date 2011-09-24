/// Copyright (c) 2009 Microsoft Corporation 
/// 
/// Redistribution and use in source and binary forms, with or without modification, are permitted provided
/// that the following conditions are met: 
///    * Redistributions of source code must retain the above copyright notice, this list of conditions and
///      the following disclaimer. 
///    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and 
///      the following disclaimer in the documentation and/or other materials provided with the distribution.  
///    * Neither the name of Microsoft nor the names of its contributors may be used to
///      endorse or promote products derived from this software without specific prior written permission.
/// 
/// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
/// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
/// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
/// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
/// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
/// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
/// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
/// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

ES5Harness.registerTest({
    id: "15.2.3.6-4-360-3",

    path: "TestCases/chapter15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-360-3.js",

    description: "ES5 Attributes - Updating data property 'P' whose attributes are [[Writable]]: false, [[Enumerable]]: true, [[Configurable]]: true to an accessor property, 'O' is the global object (8.12.9 - step 9.b.i)",

    test: function testcase() {
        var obj = fnGlobalObject();
        try {
            Object.defineProperty(obj, "prop", {
                value: 2010,
                writable: false,
                enumerable: true,
                configurable: true
            });
            var desc1 = Object.getOwnPropertyDescriptor(obj, "prop");

            function getFunc() {
                return 20;
            }
            Object.defineProperty(obj, "prop", {
                get: getFunc
            });
            var desc2 = Object.getOwnPropertyDescriptor(obj, "prop");

            return desc1.hasOwnProperty("value") && desc2.hasOwnProperty("get") &&
                desc2.enumerable === true && desc2.configurable === true &&
                obj.prop === 20 && typeof desc2.set === "undefined" && desc2.get === getFunc;
        } finally {
            delete obj.prop;
        }
    },

    precondition: function prereq() {
        return fnExists(Object.defineProperty) && fnExists(Object.getOwnPropertyDescriptor);
    }
});
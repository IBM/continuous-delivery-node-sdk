/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2022.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const CdToolchainV2 = require('../dist/cd-toolchain/v2');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the CD Toolchain service.
//
// The following configuration properties are assumed to be defined:
// CD_TOOLCHAIN_URL=<service base url>
// CD_TOOLCHAIN_AUTH_TYPE=iam
// CD_TOOLCHAIN_APIKEY=<IAM apikey>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'cd_toolchain_v2.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('CdToolchainV2', () => {
  // Service instance
  let cdToolchainService;

  // Variables to hold link values
  let toolIdLink;
  let toolchainIdLink;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(CdToolchainV2.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    cdToolchainService = CdToolchainV2.newInstance();

    // end-common
  });

  test('createToolchain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createToolchain() result:');
    // begin-create_toolchain

    const params = {
      name: 'TestToolchainV2',
      resourceGroupId: '6a9a01f2cff54a7f966f803d92877123',
    };

    let res;
    try {
      res = await cdToolchainService.createToolchain(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_toolchain
    const responseBody = res.result;
    toolchainIdLink = responseBody.id;
  });

  test('createTool request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createTool() result:');
    // begin-create_tool

    const params = {
      toolchainId: toolchainIdLink,
      toolTypeId: 'draservicebroker',
    };

    let res;
    try {
      res = await cdToolchainService.createTool(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_tool
    const responseBody = res.result;
    toolIdLink = responseBody.id;
  });

  test('listToolchains request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listToolchains() result:');
    // begin-list_toolchains

    const params = {
      resourceGroupId: 'testString',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new CdToolchainV2.ToolchainsPager(cdToolchainService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_toolchains
  });

  test('getToolchainById request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getToolchainById() result:');
    // begin-get_toolchain_by_id

    const params = {
      toolchainId: toolchainIdLink,
    };

    let res;
    try {
      res = await cdToolchainService.getToolchainById(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_toolchain_by_id
  });

  test('updateToolchain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateToolchain() result:');
    // begin-update_toolchain

    const params = {
      toolchainId: toolchainIdLink,
    };

    let res;
    try {
      res = await cdToolchainService.updateToolchain(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_toolchain
  });

  test('listTools request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listTools() result:');
    // begin-list_tools

    const params = {
      toolchainId: toolchainIdLink,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new CdToolchainV2.ToolsPager(cdToolchainService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_tools
  });

  test('getToolById request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getToolById() result:');
    // begin-get_tool_by_id

    const params = {
      toolchainId: toolchainIdLink,
      toolId: toolIdLink,
    };

    let res;
    try {
      res = await cdToolchainService.getToolById(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_tool_by_id
  });

  test('updateTool request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateTool() result:');
    // begin-update_tool

    const params = {
      toolchainId: toolchainIdLink,
      toolId: toolIdLink,
    };

    let res;
    try {
      res = await cdToolchainService.updateTool(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_tool
  });

  test('deleteTool request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_tool

    const params = {
      toolchainId: toolchainIdLink,
      toolId: toolIdLink,
    };

    try {
      await cdToolchainService.deleteTool(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_tool
  });

  test('deleteToolchain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_toolchain

    const params = {
      toolchainId: toolchainIdLink,
    };

    try {
      await cdToolchainService.deleteToolchain(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_toolchain
  });
});

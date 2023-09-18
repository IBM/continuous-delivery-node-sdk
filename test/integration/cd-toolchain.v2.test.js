/**
 * (C) Copyright IBM Corp. 2023.
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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const CdToolchainV2 = require('../../dist/cd-toolchain/v2');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'cd_toolchain_v2.env';

const describe = authHelper.prepareTests(configFile);

describe('CdToolchainV2_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let cdToolchainService;

  // Variables to hold link values
  let toolIdLink;
  let toolchainIdLink;

  test('Initialize service', async () => {
    cdToolchainService = CdToolchainV2.newInstance();

    expect(cdToolchainService).not.toBeNull();

    const config = readExternalSources(CdToolchainV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    cdToolchainService.enableRetries();
  });

  test('createToolchain()', async () => {
    const params = {
      name: 'TestToolchainV2',
      resourceGroupId: '6a9a01f2cff54a7f966f803d92877123',
      description: 'A sample toolchain to test the API',
    };

    const res = await cdToolchainService.createToolchain(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    toolchainIdLink = res.result.id;
  });

  test('createTool()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      toolTypeId: 'draservicebroker',
      name: 'testString',
      parameters: { anyKey: 'anyValue' },
    };

    const res = await cdToolchainService.createTool(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    toolIdLink = res.result.id;
  });

  test('listToolchains()', async () => {
    const params = {
      resourceGroupId: 'testString',
      limit: 20,
      start: 'testString',
      name: 'TestToolchainV2',
    };

    const res = await cdToolchainService.listToolchains(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listToolchains() via ToolchainsPager', async () => {
    const params = {
      resourceGroupId: 'testString',
      limit: 10,
      name: 'TestToolchainV2',
    };

    const allResults = [];

    // Test getNext().
    let pager = new CdToolchainV2.ToolchainsPager(cdToolchainService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CdToolchainV2.ToolchainsPager(cdToolchainService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getToolchainById()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
    };

    const res = await cdToolchainService.getToolchainById(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateToolchain()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      name: 'newToolchainName',
      description: 'New toolchain description',
    };

    const res = await cdToolchainService.updateToolchain(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listTools()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      limit: 20,
      start: 'testString',
    };

    const res = await cdToolchainService.listTools(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listTools() via ToolsPager', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CdToolchainV2.ToolsPager(cdToolchainService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CdToolchainV2.ToolsPager(cdToolchainService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getToolById()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      toolId: toolIdLink,
    };

    const res = await cdToolchainService.getToolById(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateTool()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      toolId: toolIdLink,
      name: 'MyTool',
      toolTypeId: 'draservicebroker',
      parameters: { anyKey: 'anyValue' },
    };

    const res = await cdToolchainService.updateTool(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteTool()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      toolId: toolIdLink,
    };

    const res = await cdToolchainService.deleteTool(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteToolchain()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
    };

    const res = await cdToolchainService.deleteToolchain(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});

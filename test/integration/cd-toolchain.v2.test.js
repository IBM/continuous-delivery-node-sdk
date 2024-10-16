/**
 * (C) Copyright IBM Corp. 2024.
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

/*
 * Required environment variables:
 * CD_TOOLCHAIN_APIKEY=<IAM apikey>
 * CD_TOOLCHAIN_AUTHTYPE=iam
 * CD_TOOLCHAIN_EVENT_NOTIFICATIONS_SERVICE_CRN=<event notifications service CRN>
 * CD_TOOLCHAIN_RESOURCE_GROUP_ID=<resource group where resources will be created>
 * CD_TOOLCHAIN_URL=<service base url>
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

  let config;
  // Service instance
  let cdToolchainService;

  // Variables to hold link values
  let toolIdLink;
  let toolchainIdLink;

  const currentTime = Date.now();
  const toolchainName = `TestNodeSdk_${currentTime}`;

  test('Initialize service', async () => {
    cdToolchainService = CdToolchainV2.newInstance();

    expect(cdToolchainService).not.toBeNull();

    config = readExternalSources(CdToolchainV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    cdToolchainService.enableRetries();
  });

  test('createToolchain()', async () => {
    const params = {
      name: toolchainName,
      resourceGroupId: config.resourceGroupId,
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
      resourceGroupId: config.resourceGroupId,
      limit: 20,
      name: toolchainName,
    };

    const res = await cdToolchainService.listToolchains(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listToolchains() via ToolchainsPager', async () => {
    const params = {
      resourceGroupId: config.resourceGroupId,
      limit: 10,
      name: toolchainName,
    };

    const filteredResults = [];

    // Test getNext().
    let pager = new CdToolchainV2.ToolchainsPager(cdToolchainService, params);
    while (pager.hasNext()) {
      const nextPage = (await pager.getNext()).filter(
        (toolchain) => toolchain.name === toolchainName
      );
      expect(nextPage).not.toBeNull();
      filteredResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CdToolchainV2.ToolchainsPager(cdToolchainService, params);
    const filteredItems = (await pager.getAll()).filter(
      (toolchain) => toolchain.name === toolchainName
    );
    expect(filteredItems).not.toBeNull();
    expect(filteredItems).toHaveLength(
      filteredResults.filter((toolchain) => toolchain.name === toolchainName).length
    );
    console.log(`Retrieved a total of ${filteredResults.length} items(s) with pagination.`);
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

  test('createTool() - Create Event Notifications tool', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      toolTypeId: 'eventnotifications',
      parameters: {
        name: 'test-en-tool',
        'instance-crn': config.eventNotificationsServiceCrn,
      },
    };
    const res = await cdToolchainService.createTool(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createToolchainEvent() - application JSON event', async () => {
    // Request models needed by this operation.

    // ToolchainEventPrototypeDataApplicationJson
    const toolchainEventPrototypeDataApplicationJsonModel = {
      content: {
        customKey1: 'myCustomData',
        customKey2: 123,
        customKey3: { nestedKey: 'moreData' },
      },
    };

    // ToolchainEventPrototypeData
    const toolchainEventPrototypeDataModel = {
      application_json: toolchainEventPrototypeDataApplicationJsonModel,
    };

    const params = {
      toolchainId: toolchainIdLink,
      title: 'My-custom-event',
      description: 'This is my custom event',
      contentType: 'application/json',
      data: toolchainEventPrototypeDataModel,
    };

    const res = await cdToolchainService.createToolchainEvent(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createToolchainEvent() - text plain event', async () => {
    // Request models needed by this operation.

    // ToolchainEventPrototypeDataTextPlain
    const toolchainEventPrototypeDataTextPlainModel = {
      content: 'This event is dispatched because the pipeline failed',
    };

    // ToolchainEventPrototypeData
    const toolchainEventPrototypeDataModel = {
      text_plain: toolchainEventPrototypeDataTextPlainModel,
    };

    const params = {
      toolchainId: toolchainIdLink,
      title: 'My-custom-event',
      description: 'This is my custom event',
      contentType: 'text/plain',
      data: toolchainEventPrototypeDataModel,
    };

    const res = await cdToolchainService.createToolchainEvent(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listTools()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      limit: 20,
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

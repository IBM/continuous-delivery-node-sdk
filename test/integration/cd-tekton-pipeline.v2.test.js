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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const CdTektonPipelineV2 = require('../../dist/cd-tekton-pipeline/v2');
const CdToolchainV2 = require('../../dist/cd-toolchain/v2');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'cd_tekton_pipeline_v2.env';

const describe = authHelper.prepareTests(configFile);
const configVars = authHelper.loadConfig();

describe('CdTektonPipelineV2_integration', () => {
  jest.setTimeout(timeout);

  // Service instances
  let cdToolchainService;
  let cdTektonPipelineService;

  // Variables to hold link values
  let toolchainIdLink;
  let pipelineIdLink;
  let triggerIdLink;
  let pipelineRunIdLink;
  let runLogsIdLink;
  let triggerPropertyNameLink;
  let propertyNameLink;
  let definitionIdLink;

  test('Initialize pipeline service', async () => {
    cdTektonPipelineService = CdTektonPipelineV2.newInstance();

    expect(cdTektonPipelineService).not.toBeNull();

    const config = readExternalSources(CdTektonPipelineV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    cdTektonPipelineService.enableRetries();
  });

  test('Initialize toolchain service', async () => {
    cdToolchainService = CdToolchainV2.newInstance();

    expect(cdToolchainService).not.toBeNull();

    const config = readExternalSources(CdToolchainV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    cdToolchainService.enableRetries();
  });

  test('createToolchain()', async () => {
    const params = {
      name: 'TestToolchainV2',
      resourceGroupId: configVars.CD_TEKTON_PIPELINE_RESOURCE_GROUP_ID,
      description: 'A sample toolchain to test the API',
    };

    const res = await cdToolchainService.createToolchain(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    toolchainIdLink = res.result.id;
  });

  test('github createTool()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      toolTypeId: 'githubconsolidated',
      name: 'app-repo-1',
      parameters: {
        enable_traceability: false,
        has_issues: false,
        repo_url: 'https://github.com/open-toolchain/hello-tekton.git',
        type: 'link',
      },
    };

    const res = await cdToolchainService.createTool(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('pipeline createTool()', async () => {
    const params = {
      toolchainId: toolchainIdLink,
      toolTypeId: 'pipeline',
      name: 'pipeline-node-test',
      parameters: { type: 'tekton' },
    };

    const res = await cdToolchainService.createTool(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    pipelineIdLink = res.result.id;
  });

  test('createTektonPipeline()', async () => {
    // WorkerIdentity
    const workerIdentityModel = {
      id: 'public',
    };

    const params = {
      id: pipelineIdLink,
      enableNotifications: false,
      enablePartialCloning: false,
      worker: workerIdentityModel,
    };

    const res = await cdTektonPipelineService.createTektonPipeline(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getTektonPipeline()', async () => {
    const params = {
      id: pipelineIdLink,
    };

    const res = await cdTektonPipelineService.getTektonPipeline(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createTektonPipelineDefinition()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      source: {
        type: 'git',
        properties: {
          url: 'https://github.com/open-toolchain/hello-tekton.git',
          branch: 'master',
          path: '.tekton',
        },
      },
    };

    const res = await cdTektonPipelineService.createTektonPipelineDefinition(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    definitionIdLink = res.result.id;
  });

  test('getTektonPipelineDefinition()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      definitionId: definitionIdLink,
    };

    const res = await cdTektonPipelineService.getTektonPipelineDefinition(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listTektonPipelineDefinitions()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
    };

    const res = await cdTektonPipelineService.listTektonPipelineDefinitions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.definitions).toBeDefined();
    expect(res.result.definitions).toHaveLength(1);
  });

  test('createTektonPipelineTrigger()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      type: 'manual',
      name: 'trigger1',
      eventListener: 'listener',
    };

    const res = await cdTektonPipelineService.createTektonPipelineTrigger(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    triggerIdLink = res.result.id;
  });

  test('getTektonPipelineTrigger()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      triggerId: triggerIdLink,
    };

    const res = await cdTektonPipelineService.getTektonPipelineTrigger(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createTektonPipelineRun()', async () => {
    const propertyModel = {
      'textProp': 'textProp123',
    };
    const securePropertyModel = {
      'secureProp': 'secure123',
    };

    const params = {
      pipelineId: pipelineIdLink,
      triggerName: 'trigger1',
      triggerProperties: propertyModel,
      secureTriggerProperties: securePropertyModel,
      triggerHeaders: { source: 'api' },
      triggerBody: { message: 'hello world', enable: 'true' },
    };

    const res = await cdTektonPipelineService.createTektonPipelineRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    pipelineRunIdLink = res.result.id;
  });

  test('getTektonPipelineRun()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      id: pipelineRunIdLink,
    };

    const res = await cdTektonPipelineService.getTektonPipelineRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('duplicateTektonPipelineTrigger()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      sourceTriggerId: triggerIdLink,
      name: 'duplicateTrigger',
    };

    const res = await cdTektonPipelineService.duplicateTektonPipelineTrigger(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listTektonPipelineTriggers()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      type: 'manual',
    };

    const res = await cdTektonPipelineService.listTektonPipelineTriggers(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.triggers).toBeDefined();
    expect(res.result.triggers).toHaveLength(2);
  });

  test('rerunTektonPipelineRun()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      id: pipelineRunIdLink,
    };

    const res = await cdTektonPipelineService.rerunTektonPipelineRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createTektonPipelineProperties()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      name: 'debug-pipeline',
      type: 'text',
      value: 'prop-value-1',
    };

    const res = await cdTektonPipelineService.createTektonPipelineProperties(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    propertyNameLink = res.result.name;
  });

  test('getTektonPipelineProperty()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      propertyName: propertyNameLink,
    };

    const res = await cdTektonPipelineService.getTektonPipelineProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listTektonPipelineProperties()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      type: ['text'],
      sort: 'name',
    };

    const res = await cdTektonPipelineService.listTektonPipelineProperties(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createTektonPipelineTriggerProperties()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      triggerId: triggerIdLink,
      name: 'trigger-prop',
      type: 'text',
      value: 'trigger-prop-value-1',
    };

    const res = await cdTektonPipelineService.createTektonPipelineTriggerProperties(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    triggerPropertyNameLink = res.result.name;
  });

  test('getTektonPipelineTriggerProperty()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      triggerId: triggerIdLink,
      propertyName: triggerPropertyNameLink,
    };

    const res = await cdTektonPipelineService.getTektonPipelineTriggerProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listTektonPipelineTriggerProperties()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      triggerId: triggerIdLink,
      type: 'text',
      sort: 'name',
    };

    const res = await cdTektonPipelineService.listTektonPipelineTriggerProperties(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getTektonPipelineRunLogs()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      id: pipelineRunIdLink,
    };

    const res = await cdTektonPipelineService.getTektonPipelineRunLogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.logs).toBeDefined();
    runLogsIdLink = res.result.logs[0].id;
  });

  test('getTektonPipelineRunLogContent()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      pipelineRunId: pipelineRunIdLink,
      id: runLogsIdLink,
    };

    const res = await cdTektonPipelineService.getTektonPipelineRunLogContent(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.data).toBeDefined();
  });

  test('listTektonPipelineRuns()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      limit: 10,
      triggerName: 'trigger1',
    };

    const res = await cdTektonPipelineService.listTektonPipelineRuns(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.pipeline_runs).toBeDefined();
    expect(res.result.pipeline_runs).toHaveLength(2);
  });

  test('listTektonPipelineRuns() via TektonPipelineRunsPager', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      limit: 1,
      triggerName: 'trigger1',
    };

    const allResults = [];

    // Test getNext().
    let pager = new CdTektonPipelineV2.TektonPipelineRunsPager(cdTektonPipelineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CdTektonPipelineV2.TektonPipelineRunsPager(cdTektonPipelineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
  });

  test('deleteTektonPipelineRun()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      id: pipelineRunIdLink,
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteTektonPipelineDefinition()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      definitionId: definitionIdLink,
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineDefinition(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteTektonPipelineProperty()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      propertyName: 'debug-pipeline',
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteTektonPipelineTriggerProperty()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      triggerId: triggerIdLink,
      propertyName: 'trigger-prop',
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineTriggerProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteTektonPipelineTrigger()', async () => {
    const params = {
      pipelineId: pipelineIdLink,
      triggerId: triggerIdLink,
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineTrigger(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteTektonPipeline()', async () => {
    const params = {
      id: pipelineIdLink,
    };

    const res = await cdTektonPipelineService.deleteTektonPipeline(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});

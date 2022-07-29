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

const CdTektonPipelineV2 = require('../../dist/cd-tekton-pipeline/v2');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'cd_tekton_pipeline_v2.env';

const describe = authHelper.prepareTests(configFile);

describe('CdTektonPipelineV2_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let cdTektonPipelineService;

  test('Initialise service', async() => {
    cdTektonPipelineService = CdTektonPipelineV2.newInstance();

    expect(cdTektonPipelineService).not.toBeNull();

    const config = readExternalSources(CdTektonPipelineV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
  
    cdTektonPipelineService.enableRetries();
  });

  test('createTektonPipeline()', async () => {
    // Request models needed by this operation.

    // WorkerWithId
    const workerWithIdModel = {
      id: 'public',
    };

    const params = {
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
      enableSlackNotifications: false,
      enablePartialCloning: false,
      worker: workerWithIdModel,
    };

    const res = await cdTektonPipelineService.createTektonPipeline(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('getTektonPipeline()', async () => {
    const params = {
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
    };

    const res = await cdTektonPipelineService.getTektonPipeline(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('updateTektonPipeline()', async () => {
    // Request models needed by this operation.

    // WorkerWithId
    const workerWithIdModel = {
      id: 'public',
    };

    const params = {
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
      enableSlackNotifications: false,
      enablePartialCloning: false,
      worker: workerWithIdModel,
    };

    const res = await cdTektonPipelineService.updateTektonPipeline(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('listTektonPipelineRuns()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      start: 'testString',
      limit: 1,
      offset: 38,
      status: 'succeeded',
      triggerName: 'manual-trigger',
    };

    const res = await cdTektonPipelineService.listTektonPipelineRuns(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('listTektonPipelineRuns() via TektonPipelineRunsPager', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      limit: 10,
      offset: 38,
      status: 'succeeded',
      triggerName: 'manual-trigger',
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
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });
  test('createTektonPipelineRun()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      triggerName: 'Generic Webhook Trigger - 0',
      triggerProperties: { 'pipeline-debug': 'false' },
      secureTriggerProperties: { 'secure-property-key': 'secure value' },
      triggerHeader: { source: 'api' },
      triggerBody: { message: 'hello world', enable: 'true', detail: { name: 'example' } },
    };

    const res = await cdTektonPipelineService.createTektonPipelineRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('getTektonPipelineRun()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
      includes: 'definitions',
    };

    const res = await cdTektonPipelineService.getTektonPipelineRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('cancelTektonPipelineRun()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
      force: true,
    };

    const res = await cdTektonPipelineService.cancelTektonPipelineRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });
  test('rerunTektonPipelineRun()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
    };

    const res = await cdTektonPipelineService.rerunTektonPipelineRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('getTektonPipelineRunLogs()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
    };

    const res = await cdTektonPipelineService.getTektonPipelineRunLogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getTektonPipelineRunLogContent()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      pipelineRunId: 'bf4b3abd-0c93-416b-911e-9cf42f1a1085',
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
    };

    const res = await cdTektonPipelineService.getTektonPipelineRunLogContent(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('listTektonPipelineDefinitions()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
    };

    const res = await cdTektonPipelineService.listTektonPipelineDefinitions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('createTektonPipelineDefinition()', async () => {
    // Request models needed by this operation.

    // DefinitionScmSource
    const definitionScmSourceModel = {
      url: 'https://github.com/IBM/tekton-tutorial.git',
      branch: 'master',
      tag: 'testString',
      path: '.tekton',
      service_instance_id: 'testString',
    };

    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      scmSource: definitionScmSourceModel,
      id: 'testString',
    };

    const res = await cdTektonPipelineService.createTektonPipelineDefinition(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('getTektonPipelineDefinition()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      definitionId: '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada',
    };

    const res = await cdTektonPipelineService.getTektonPipelineDefinition(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('replaceTektonPipelineDefinition()', async () => {
    // Request models needed by this operation.

    // DefinitionScmSource
    const definitionScmSourceModel = {
      url: 'https://github.com/IBM/tekton-tutorial.git',
      branch: 'master',
      tag: 'testString',
      path: '.tekton',
      service_instance_id: '071d8049-d984-4feb-a2ed-2a1e938918ba',
    };

    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      definitionId: '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada',
      scmSource: definitionScmSourceModel,
      id: '22f92ab1-e0ac-4c65-84e7-8a4cb32dba0f',
    };

    const res = await cdTektonPipelineService.replaceTektonPipelineDefinition(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('listTektonPipelineProperties()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      name: 'prod',
      type: ['secure', 'text'],
      sort: 'name',
    };

    const res = await cdTektonPipelineService.listTektonPipelineProperties(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('createTektonPipelineProperties()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      name: 'key1',
      type: 'text',
      value: 'https://github.com/IBM/tekton-tutorial.git',
      _enum: ['testString'],
      path: 'testString',
    };

    const res = await cdTektonPipelineService.createTektonPipelineProperties(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('getTektonPipelineProperty()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      propertyName: 'debug-pipeline',
    };

    const res = await cdTektonPipelineService.getTektonPipelineProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('replaceTektonPipelineProperty()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      propertyName: 'debug-pipeline',
      name: 'key1',
      type: 'text',
      value: 'https://github.com/IBM/tekton-tutorial.git',
      _enum: ['testString'],
      path: 'testString',
    };

    const res = await cdTektonPipelineService.replaceTektonPipelineProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('listTektonPipelineTriggers()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      type: 'manual,scm',
      name: 'testString',
      eventListener: 'testString',
      workerId: 'testString',
      workerName: 'testString',
      disabled: 'true',
      tags: 'tag1,tag2',
    };

    const res = await cdTektonPipelineService.listTektonPipelineTriggers(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('createTektonPipelineTrigger()', async () => {
    // Request models needed by this operation.

    // Worker
    const workerModel = {
      name: 'testString',
      type: 'testString',
      id: 'public',
    };

    // GenericSecret
    const genericSecretModel = {
      type: 'token_matches',
      value: 'testString',
      source: 'header',
      key_name: 'testString',
      algorithm: 'md4',
    };

    // TriggerScmSource
    const triggerScmSourceModel = {
      url: 'testString',
      branch: 'testString',
      pattern: 'testString',
      blind_connection: true,
      hook_id: 'testString',
      service_instance_id: 'testString',
    };

    // Events
    const eventsModel = {
      push: true,
      pull_request_closed: true,
      pull_request: true,
    };

    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      type: 'manual',
      name: 'Manual Trigger',
      eventListener: 'pr-listener',
      disabled: false,
      tags: ['testString'],
      worker: workerModel,
      maxConcurrentRuns: 3,
      secret: genericSecretModel,
      cron: 'testString',
      timezone: 'testString',
      scmSource: triggerScmSourceModel,
      events: eventsModel,
    };

    const res = await cdTektonPipelineService.createTektonPipelineTrigger(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('getTektonPipelineTrigger()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      triggerId: '1bb892a1-2e04-4768-a369-b1159eace147',
    };

    const res = await cdTektonPipelineService.getTektonPipelineTrigger(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('updateTektonPipelineTrigger()', async () => {
    // Request models needed by this operation.

    // Worker
    const workerModel = {
      name: 'testString',
      type: 'testString',
      id: 'testString',
    };

    // GenericSecret
    const genericSecretModel = {
      type: 'token_matches',
      value: 'testString',
      source: 'header',
      key_name: 'testString',
      algorithm: 'md4',
    };

    // TriggerScmSource
    const triggerScmSourceModel = {
      url: 'testString',
      branch: 'testString',
      pattern: 'testString',
      blind_connection: true,
      hook_id: 'testString',
      service_instance_id: 'testString',
    };

    // Events
    const eventsModel = {
      push: true,
      pull_request_closed: true,
      pull_request: true,
    };

    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      triggerId: '1bb892a1-2e04-4768-a369-b1159eace147',
      type: 'manual',
      name: 'start-deploy',
      eventListener: 'testString',
      tags: ['testString'],
      worker: workerModel,
      maxConcurrentRuns: 38,
      disabled: true,
      secret: genericSecretModel,
      cron: 'testString',
      timezone: 'testString',
      scmSource: triggerScmSourceModel,
      events: eventsModel,
    };

    const res = await cdTektonPipelineService.updateTektonPipelineTrigger(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('duplicateTektonPipelineTrigger()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      sourceTriggerId: '1bb892a1-2e04-4768-a369-b1159eace147',
      name: 'triggerName',
    };

    const res = await cdTektonPipelineService.duplicateTektonPipelineTrigger(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('listTektonPipelineTriggerProperties()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      triggerId: '1bb892a1-2e04-4768-a369-b1159eace147',
      name: 'prod',
      type: 'secure,text',
      sort: 'name',
    };

    const res = await cdTektonPipelineService.listTektonPipelineTriggerProperties(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('createTektonPipelineTriggerProperties()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      triggerId: '1bb892a1-2e04-4768-a369-b1159eace147',
      name: 'key1',
      type: 'text',
      value: 'https://github.com/IBM/tekton-tutorial.git',
      _enum: ['testString'],
      path: 'testString',
    };

    const res = await cdTektonPipelineService.createTektonPipelineTriggerProperties(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('getTektonPipelineTriggerProperty()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      triggerId: '1bb892a1-2e04-4768-a369-b1159eace147',
      propertyName: 'debug-pipeline',
    };

    const res = await cdTektonPipelineService.getTektonPipelineTriggerProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('replaceTektonPipelineTriggerProperty()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      triggerId: '1bb892a1-2e04-4768-a369-b1159eace147',
      propertyName: 'debug-pipeline',
      name: 'key1',
      type: 'text',
      value: 'https://github.com/IBM/tekton-tutorial.git',
      _enum: ['testString'],
      path: 'testString',
    };

    const res = await cdTektonPipelineService.replaceTektonPipelineTriggerProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteTektonPipelineTriggerProperty()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      triggerId: '1bb892a1-2e04-4768-a369-b1159eace147',
      propertyName: 'debug-pipeline',
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineTriggerProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
  test('deleteTektonPipelineTrigger()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      triggerId: '1bb892a1-2e04-4768-a369-b1159eace147',
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineTrigger(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
  test('deleteTektonPipelineRun()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
  test('deleteTektonPipelineProperty()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      propertyName: 'debug-pipeline',
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineProperty(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
  test('deleteTektonPipelineDefinition()', async () => {
    const params = {
      pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
      definitionId: '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada',
    };

    const res = await cdTektonPipelineService.deleteTektonPipelineDefinition(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
  test('deleteTektonPipeline()', async () => {
    const params = {
      id: '94619026-912b-4d92-8f51-6c74f0692d90',
    };

    const res = await cdTektonPipelineService.deleteTektonPipeline(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});

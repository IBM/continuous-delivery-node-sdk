/**
 * (C) Copyright IBM Corp. 2025.
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

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
} = require('@ibm-cloud/sdk-test-utilities');
const CdTektonPipelineV2 = require('../../dist/cd-tekton-pipeline/v2.js');

const cdTektonPipelineServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.devops.cloud.ibm.com/pipeline/v2',
};

const cdTektonPipelineService = new CdTektonPipelineV2(cdTektonPipelineServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(cdTektonPipelineService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('CdTektonPipelineV2', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = CdTektonPipelineV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(CdTektonPipelineV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(CdTektonPipelineV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(CdTektonPipelineV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = CdTektonPipelineV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(CdTektonPipelineV2);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new CdTektonPipelineV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new CdTektonPipelineV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(CdTektonPipelineV2.DEFAULT_SERVICE_URL);
    });
  });

  describe('getServiceUrlForRegion', () => {
    test('should return undefined for invalid region', () => {
      expect(CdTektonPipelineV2.getServiceUrlForRegion('INVALID_REGION')).toBeFalsy();
    });
    test('should return valid service url', () => {
      expect(CdTektonPipelineV2.getServiceUrlForRegion('us-south')).toBe(
        'https://api.us-south.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('us-east')).toBe(
        'https://api.us-east.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('eu-de')).toBe(
        'https://api.eu-de.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('eu-gb')).toBe(
        'https://api.eu-gb.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('eu-es')).toBe(
        'https://api.eu-es.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('jp-osa')).toBe(
        'https://api.jp-osa.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('jp-tok')).toBe(
        'https://api.jp-tok.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('au-syd')).toBe(
        'https://api.au-syd.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('ca-tor')).toBe(
        'https://api.ca-tor.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('ca-mon')).toBe(
        'https://api.ca-mon.devops.cloud.ibm.com/pipeline/v2'
      );
      expect(CdTektonPipelineV2.getServiceUrlForRegion('br-sao')).toBe(
        'https://api.br-sao.devops.cloud.ibm.com/pipeline/v2'
      );
    });
  });

  describe('createTektonPipeline', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // WorkerIdentity
      const workerIdentityModel = {
        id: 'public',
      };

      function __createTektonPipelineTest() {
        // Construct the params object for operation createTektonPipeline
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const nextBuildNumber = 1;
        const enableNotifications = false;
        const enablePartialCloning = false;
        const worker = workerIdentityModel;
        const createTektonPipelineParams = {
          id,
          nextBuildNumber,
          enableNotifications,
          enablePartialCloning,
          worker,
        };

        const createTektonPipelineResult = cdTektonPipelineService.createTektonPipeline(
          createTektonPipelineParams
        );

        // all methods should return a Promise
        expectToBePromise(createTektonPipelineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.next_build_number).toEqual(nextBuildNumber);
        expect(mockRequestOptions.body.enable_notifications).toEqual(enableNotifications);
        expect(mockRequestOptions.body.enable_partial_cloning).toEqual(enablePartialCloning);
        expect(mockRequestOptions.body.worker).toEqual(worker);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTektonPipelineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __createTektonPipelineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __createTektonPipelineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelineParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipeline(createTektonPipelineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipeline({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipeline();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTektonPipeline', () => {
    describe('positive tests', () => {
      function __getTektonPipelineTest() {
        // Construct the params object for operation getTektonPipeline
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const getTektonPipelineParams = {
          id,
        };

        const getTektonPipelineResult =
          cdTektonPipelineService.getTektonPipeline(getTektonPipelineParams);

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTektonPipelineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __getTektonPipelineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __getTektonPipelineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTektonPipelineParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.getTektonPipeline(getTektonPipelineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipeline({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipeline();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateTektonPipeline', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // WorkerIdentity
      const workerIdentityModel = {
        id: 'public',
      };

      function __updateTektonPipelineTest() {
        // Construct the params object for operation updateTektonPipeline
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const nextBuildNumber = 1;
        const enableNotifications = true;
        const enablePartialCloning = true;
        const worker = workerIdentityModel;
        const updateTektonPipelineParams = {
          id,
          nextBuildNumber,
          enableNotifications,
          enablePartialCloning,
          worker,
        };

        const updateTektonPipelineResult = cdTektonPipelineService.updateTektonPipeline(
          updateTektonPipelineParams
        );

        // all methods should return a Promise
        expectToBePromise(updateTektonPipelineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.next_build_number).toEqual(nextBuildNumber);
        expect(mockRequestOptions.body.enable_notifications).toEqual(enableNotifications);
        expect(mockRequestOptions.body.enable_partial_cloning).toEqual(enablePartialCloning);
        expect(mockRequestOptions.body.worker).toEqual(worker);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTektonPipelineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __updateTektonPipelineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __updateTektonPipelineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTektonPipelineParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.updateTektonPipeline(updateTektonPipelineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.updateTektonPipeline({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.updateTektonPipeline();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTektonPipeline', () => {
    describe('positive tests', () => {
      function __deleteTektonPipelineTest() {
        // Construct the params object for operation deleteTektonPipeline
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const deleteTektonPipelineParams = {
          id,
        };

        const deleteTektonPipelineResult = cdTektonPipelineService.deleteTektonPipeline(
          deleteTektonPipelineParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTektonPipelineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __deleteTektonPipelineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __deleteTektonPipelineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTektonPipelineParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.deleteTektonPipeline(deleteTektonPipelineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipeline({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipeline();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTektonPipelineRuns', () => {
    describe('positive tests', () => {
      function __listTektonPipelineRunsTest() {
        // Construct the params object for operation listTektonPipelineRuns
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const start = 'testString';
        const limit = 50;
        const status = 'succeeded';
        const triggerName = 'manual-trigger';
        const listTektonPipelineRunsParams = {
          pipelineId,
          start,
          limit,
          status,
          triggerName,
        };

        const listTektonPipelineRunsResult = cdTektonPipelineService.listTektonPipelineRuns(
          listTektonPipelineRunsParams
        );

        // all methods should return a Promise
        expectToBePromise(listTektonPipelineRunsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/pipeline_runs',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.qs['trigger.name']).toEqual(triggerName);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTektonPipelineRunsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __listTektonPipelineRunsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __listTektonPipelineRunsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTektonPipelineRunsParams = {
          pipelineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.listTektonPipelineRuns(listTektonPipelineRunsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineRuns({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineRuns();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('TektonPipelineRunsPager tests', () => {
      const serviceUrl = cdTektonPipelineServiceOptions.url;
      const path = '/tekton_pipelines/94619026-912b-4d92-8f51-6c74f0692d90/pipeline_runs';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?start=1"},"total_count":2,"limit":1,"pipeline_runs":[{"id":"id","href":"href","user_info":{"iam_id":"iam_id","sub":"sub"},"status":"pending","definition_id":"definition_id","definition":{"id":"id"},"description":"description","worker":{"name":"name","agent_id":"agent_id","service_id":"service_id","id":"id"},"pipeline_id":"pipeline_id","pipeline":{"id":"id"},"listener_name":"listener_name","trigger":{"type":"type","name":"start-deploy","href":"href","event_listener":"event_listener","id":"id","properties":[{"name":"name","value":"value","href":"href","enum":["enum"],"type":"secure","path":"path","locked":true}],"tags":["tags"],"worker":{"name":"name","type":"type","id":"id"},"max_concurrent_runs":4,"enabled":true,"favorite":false,"limit_waiting_runs":false},"event_params_blob":"event_params_blob","trigger_headers":"trigger_headers","properties":[{"name":"name","value":"value","href":"href","enum":["enum"],"type":"secure","locked":true,"path":"path"}],"created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","run_url":"run_url","error_message":"error_message"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"pipeline_runs":[{"id":"id","href":"href","user_info":{"iam_id":"iam_id","sub":"sub"},"status":"pending","definition_id":"definition_id","definition":{"id":"id"},"description":"description","worker":{"name":"name","agent_id":"agent_id","service_id":"service_id","id":"id"},"pipeline_id":"pipeline_id","pipeline":{"id":"id"},"listener_name":"listener_name","trigger":{"type":"type","name":"start-deploy","href":"href","event_listener":"event_listener","id":"id","properties":[{"name":"name","value":"value","href":"href","enum":["enum"],"type":"secure","path":"path","locked":true}],"tags":["tags"],"worker":{"name":"name","type":"type","id":"id"},"max_concurrent_runs":4,"enabled":true,"favorite":false,"limit_waiting_runs":false},"event_params_blob":"event_params_blob","trigger_headers":"trigger_headers","properties":[{"name":"name","value":"value","href":"href","enum":["enum"],"type":"secure","locked":true,"path":"path"}],"created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","run_url":"run_url","error_message":"error_message"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
          limit: 10,
          status: 'succeeded',
          triggerName: 'manual-trigger',
        };
        const allResults = [];
        const pager = new CdTektonPipelineV2.TektonPipelineRunsPager(
          cdTektonPipelineService,
          params
        );
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          pipelineId: '94619026-912b-4d92-8f51-6c74f0692d90',
          limit: 10,
          status: 'succeeded',
          triggerName: 'manual-trigger',
        };
        const pager = new CdTektonPipelineV2.TektonPipelineRunsPager(
          cdTektonPipelineService,
          params
        );
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createTektonPipelineRun', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PipelineRunTrigger
      const pipelineRunTriggerModel = {
        name: 'Manual Trigger 1',
        properties: { 'pipeline-debug': 'false' },
        secure_properties: { 'secure-property-key': 'secure value' },
        headers: { source: 'api' },
        body: { message: 'hello world', enable: 'true', detail: { name: 'example' } },
      };

      function __createTektonPipelineRunTest() {
        // Construct the params object for operation createTektonPipelineRun
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const description = 'My custom manual PipelineRun';
        const triggerName = 'testString';
        const triggerProperties = { anyKey: 'anyValue' };
        const secureTriggerProperties = { anyKey: 'anyValue' };
        const triggerHeaders = { anyKey: 'anyValue' };
        const triggerBody = { anyKey: 'anyValue' };
        const trigger = pipelineRunTriggerModel;
        const createTektonPipelineRunParams = {
          pipelineId,
          description,
          triggerName,
          triggerProperties,
          secureTriggerProperties,
          triggerHeaders,
          triggerBody,
          trigger,
        };

        const createTektonPipelineRunResult = cdTektonPipelineService.createTektonPipelineRun(
          createTektonPipelineRunParams
        );

        // all methods should return a Promise
        expectToBePromise(createTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/pipeline_runs',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.trigger_name).toEqual(triggerName);
        expect(mockRequestOptions.body.trigger_properties).toEqual(triggerProperties);
        expect(mockRequestOptions.body.secure_trigger_properties).toEqual(secureTriggerProperties);
        expect(mockRequestOptions.body.trigger_headers).toEqual(triggerHeaders);
        expect(mockRequestOptions.body.trigger_body).toEqual(triggerBody);
        expect(mockRequestOptions.body.trigger).toEqual(trigger);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTektonPipelineRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __createTektonPipelineRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __createTektonPipelineRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelineRunParams = {
          pipelineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipelineRun(createTektonPipelineRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTektonPipelineRun', () => {
    describe('positive tests', () => {
      function __getTektonPipelineRunTest() {
        // Construct the params object for operation getTektonPipelineRun
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const includes = 'definitions';
        const getTektonPipelineRunParams = {
          pipelineId,
          id,
          includes,
        };

        const getTektonPipelineRunResult = cdTektonPipelineService.getTektonPipelineRun(
          getTektonPipelineRunParams
        );

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.includes).toEqual(includes);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTektonPipelineRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __getTektonPipelineRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __getTektonPipelineRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTektonPipelineRunParams = {
          pipelineId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.getTektonPipelineRun(getTektonPipelineRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTektonPipelineRun', () => {
    describe('positive tests', () => {
      function __deleteTektonPipelineRunTest() {
        // Construct the params object for operation deleteTektonPipelineRun
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const deleteTektonPipelineRunParams = {
          pipelineId,
          id,
        };

        const deleteTektonPipelineRunResult = cdTektonPipelineService.deleteTektonPipelineRun(
          deleteTektonPipelineRunParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTektonPipelineRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __deleteTektonPipelineRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __deleteTektonPipelineRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTektonPipelineRunParams = {
          pipelineId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.deleteTektonPipelineRun(deleteTektonPipelineRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('cancelTektonPipelineRun', () => {
    describe('positive tests', () => {
      function __cancelTektonPipelineRunTest() {
        // Construct the params object for operation cancelTektonPipelineRun
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const force = true;
        const cancelTektonPipelineRunParams = {
          pipelineId,
          id,
          force,
        };

        const cancelTektonPipelineRunResult = cdTektonPipelineService.cancelTektonPipelineRun(
          cancelTektonPipelineRunParams
        );

        // all methods should return a Promise
        expectToBePromise(cancelTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/cancel',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.force).toEqual(force);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __cancelTektonPipelineRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __cancelTektonPipelineRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __cancelTektonPipelineRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const cancelTektonPipelineRunParams = {
          pipelineId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.cancelTektonPipelineRun(cancelTektonPipelineRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.cancelTektonPipelineRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.cancelTektonPipelineRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('rerunTektonPipelineRun', () => {
    describe('positive tests', () => {
      function __rerunTektonPipelineRunTest() {
        // Construct the params object for operation rerunTektonPipelineRun
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const rerunTektonPipelineRunParams = {
          pipelineId,
          id,
        };

        const rerunTektonPipelineRunResult = cdTektonPipelineService.rerunTektonPipelineRun(
          rerunTektonPipelineRunParams
        );

        // all methods should return a Promise
        expectToBePromise(rerunTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/rerun',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __rerunTektonPipelineRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __rerunTektonPipelineRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __rerunTektonPipelineRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const rerunTektonPipelineRunParams = {
          pipelineId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.rerunTektonPipelineRun(rerunTektonPipelineRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.rerunTektonPipelineRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.rerunTektonPipelineRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTektonPipelineRunLogs', () => {
    describe('positive tests', () => {
      function __getTektonPipelineRunLogsTest() {
        // Construct the params object for operation getTektonPipelineRunLogs
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const getTektonPipelineRunLogsParams = {
          pipelineId,
          id,
        };

        const getTektonPipelineRunLogsResult = cdTektonPipelineService.getTektonPipelineRunLogs(
          getTektonPipelineRunLogsParams
        );

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineRunLogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/logs',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTektonPipelineRunLogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __getTektonPipelineRunLogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __getTektonPipelineRunLogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTektonPipelineRunLogsParams = {
          pipelineId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.getTektonPipelineRunLogs(getTektonPipelineRunLogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineRunLogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineRunLogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTektonPipelineRunLogContent', () => {
    describe('positive tests', () => {
      function __getTektonPipelineRunLogContentTest() {
        // Construct the params object for operation getTektonPipelineRunLogContent
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const pipelineRunId = 'bf4b3abd-0c93-416b-911e-9cf42f1a1085';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const getTektonPipelineRunLogContentParams = {
          pipelineId,
          pipelineRunId,
          id,
        };

        const getTektonPipelineRunLogContentResult =
          cdTektonPipelineService.getTektonPipelineRunLogContent(
            getTektonPipelineRunLogContentParams
          );

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineRunLogContentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/pipeline_runs/{pipeline_run_id}/logs/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.pipeline_run_id).toEqual(pipelineRunId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTektonPipelineRunLogContentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __getTektonPipelineRunLogContentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __getTektonPipelineRunLogContentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const pipelineRunId = 'bf4b3abd-0c93-416b-911e-9cf42f1a1085';
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTektonPipelineRunLogContentParams = {
          pipelineId,
          pipelineRunId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.getTektonPipelineRunLogContent(
          getTektonPipelineRunLogContentParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineRunLogContent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineRunLogContent();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTektonPipelineDefinitions', () => {
    describe('positive tests', () => {
      function __listTektonPipelineDefinitionsTest() {
        // Construct the params object for operation listTektonPipelineDefinitions
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const listTektonPipelineDefinitionsParams = {
          pipelineId,
        };

        const listTektonPipelineDefinitionsResult =
          cdTektonPipelineService.listTektonPipelineDefinitions(
            listTektonPipelineDefinitionsParams
          );

        // all methods should return a Promise
        expectToBePromise(listTektonPipelineDefinitionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/definitions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTektonPipelineDefinitionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __listTektonPipelineDefinitionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __listTektonPipelineDefinitionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTektonPipelineDefinitionsParams = {
          pipelineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.listTektonPipelineDefinitions(listTektonPipelineDefinitionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineDefinitions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineDefinitions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTektonPipelineDefinition', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Tool
      const toolModel = {
        id: 'testString',
      };

      // DefinitionSourceProperties
      const definitionSourcePropertiesModel = {
        url: 'https://github.com/open-toolchain/hello-tekton.git',
        branch: 'master',
        tag: 'testString',
        path: '.tekton',
        tool: toolModel,
      };

      // DefinitionSource
      const definitionSourceModel = {
        type: 'git',
        properties: definitionSourcePropertiesModel,
      };

      function __createTektonPipelineDefinitionTest() {
        // Construct the params object for operation createTektonPipelineDefinition
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const source = definitionSourceModel;
        const createTektonPipelineDefinitionParams = {
          pipelineId,
          source,
        };

        const createTektonPipelineDefinitionResult =
          cdTektonPipelineService.createTektonPipelineDefinition(
            createTektonPipelineDefinitionParams
          );

        // all methods should return a Promise
        expectToBePromise(createTektonPipelineDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/definitions',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTektonPipelineDefinitionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __createTektonPipelineDefinitionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __createTektonPipelineDefinitionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const source = definitionSourceModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelineDefinitionParams = {
          pipelineId,
          source,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipelineDefinition(
          createTektonPipelineDefinitionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineDefinition({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineDefinition();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTektonPipelineDefinition', () => {
    describe('positive tests', () => {
      function __getTektonPipelineDefinitionTest() {
        // Construct the params object for operation getTektonPipelineDefinition
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const definitionId = '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada';
        const getTektonPipelineDefinitionParams = {
          pipelineId,
          definitionId,
        };

        const getTektonPipelineDefinitionResult =
          cdTektonPipelineService.getTektonPipelineDefinition(getTektonPipelineDefinitionParams);

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/definitions/{definition_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.definition_id).toEqual(definitionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTektonPipelineDefinitionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __getTektonPipelineDefinitionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __getTektonPipelineDefinitionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const definitionId = '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTektonPipelineDefinitionParams = {
          pipelineId,
          definitionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.getTektonPipelineDefinition(getTektonPipelineDefinitionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineDefinition({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineDefinition();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceTektonPipelineDefinition', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Tool
      const toolModel = {
        id: 'testString',
      };

      // DefinitionSourceProperties
      const definitionSourcePropertiesModel = {
        url: 'testString',
        branch: 'testString',
        tag: 'testString',
        path: 'testString',
        tool: toolModel,
      };

      // DefinitionSource
      const definitionSourceModel = {
        type: 'testString',
        properties: definitionSourcePropertiesModel,
      };

      function __replaceTektonPipelineDefinitionTest() {
        // Construct the params object for operation replaceTektonPipelineDefinition
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const definitionId = '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada';
        const source = definitionSourceModel;
        const replaceTektonPipelineDefinitionParams = {
          pipelineId,
          definitionId,
          source,
        };

        const replaceTektonPipelineDefinitionResult =
          cdTektonPipelineService.replaceTektonPipelineDefinition(
            replaceTektonPipelineDefinitionParams
          );

        // all methods should return a Promise
        expectToBePromise(replaceTektonPipelineDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/definitions/{definition_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.definition_id).toEqual(definitionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceTektonPipelineDefinitionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __replaceTektonPipelineDefinitionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __replaceTektonPipelineDefinitionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const definitionId = '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada';
        const source = definitionSourceModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceTektonPipelineDefinitionParams = {
          pipelineId,
          definitionId,
          source,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.replaceTektonPipelineDefinition(
          replaceTektonPipelineDefinitionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.replaceTektonPipelineDefinition({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.replaceTektonPipelineDefinition();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTektonPipelineDefinition', () => {
    describe('positive tests', () => {
      function __deleteTektonPipelineDefinitionTest() {
        // Construct the params object for operation deleteTektonPipelineDefinition
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const definitionId = '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada';
        const deleteTektonPipelineDefinitionParams = {
          pipelineId,
          definitionId,
        };

        const deleteTektonPipelineDefinitionResult =
          cdTektonPipelineService.deleteTektonPipelineDefinition(
            deleteTektonPipelineDefinitionParams
          );

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelineDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/definitions/{definition_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.definition_id).toEqual(definitionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTektonPipelineDefinitionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __deleteTektonPipelineDefinitionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __deleteTektonPipelineDefinitionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const definitionId = '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTektonPipelineDefinitionParams = {
          pipelineId,
          definitionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.deleteTektonPipelineDefinition(
          deleteTektonPipelineDefinitionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineDefinition({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineDefinition();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTektonPipelineProperties', () => {
    describe('positive tests', () => {
      function __listTektonPipelinePropertiesTest() {
        // Construct the params object for operation listTektonPipelineProperties
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const name = 'prod';
        const type = ['secure', 'text'];
        const sort = 'name';
        const listTektonPipelinePropertiesParams = {
          pipelineId,
          name,
          type,
          sort,
        };

        const listTektonPipelinePropertiesResult =
          cdTektonPipelineService.listTektonPipelineProperties(listTektonPipelinePropertiesParams);

        // all methods should return a Promise
        expectToBePromise(listTektonPipelinePropertiesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/properties', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTektonPipelinePropertiesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __listTektonPipelinePropertiesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __listTektonPipelinePropertiesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTektonPipelinePropertiesParams = {
          pipelineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.listTektonPipelineProperties(listTektonPipelinePropertiesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineProperties({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineProperties();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTektonPipelineProperties', () => {
    describe('positive tests', () => {
      function __createTektonPipelinePropertiesTest() {
        // Construct the params object for operation createTektonPipelineProperties
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const name = 'prop1';
        const type = 'text';
        const value = 'https://github.com/open-toolchain/hello-tekton.git';
        const _enum = ['testString'];
        const locked = false;
        const path = 'testString';
        const createTektonPipelinePropertiesParams = {
          pipelineId,
          name,
          type,
          value,
          _enum,
          locked,
          path,
        };

        const createTektonPipelinePropertiesResult =
          cdTektonPipelineService.createTektonPipelineProperties(
            createTektonPipelinePropertiesParams
          );

        // all methods should return a Promise
        expectToBePromise(createTektonPipelinePropertiesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/properties', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.enum).toEqual(_enum);
        expect(mockRequestOptions.body.locked).toEqual(locked);
        expect(mockRequestOptions.body.path).toEqual(path);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTektonPipelinePropertiesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __createTektonPipelinePropertiesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __createTektonPipelinePropertiesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const name = 'prop1';
        const type = 'text';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelinePropertiesParams = {
          pipelineId,
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipelineProperties(
          createTektonPipelinePropertiesParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineProperties({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineProperties();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTektonPipelineProperty', () => {
    describe('positive tests', () => {
      function __getTektonPipelinePropertyTest() {
        // Construct the params object for operation getTektonPipelineProperty
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const propertyName = 'debug-pipeline';
        const getTektonPipelinePropertyParams = {
          pipelineId,
          propertyName,
        };

        const getTektonPipelinePropertyResult = cdTektonPipelineService.getTektonPipelineProperty(
          getTektonPipelinePropertyParams
        );

        // all methods should return a Promise
        expectToBePromise(getTektonPipelinePropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/properties/{property_name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.property_name).toEqual(propertyName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTektonPipelinePropertyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __getTektonPipelinePropertyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __getTektonPipelinePropertyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const propertyName = 'debug-pipeline';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTektonPipelinePropertyParams = {
          pipelineId,
          propertyName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.getTektonPipelineProperty(getTektonPipelinePropertyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineProperty({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineProperty();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceTektonPipelineProperty', () => {
    describe('positive tests', () => {
      function __replaceTektonPipelinePropertyTest() {
        // Construct the params object for operation replaceTektonPipelineProperty
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const propertyName = 'debug-pipeline';
        const name = 'prop1';
        const type = 'text';
        const value = 'https://github.com/open-toolchain/hello-tekton.git';
        const _enum = ['testString'];
        const locked = false;
        const path = 'testString';
        const replaceTektonPipelinePropertyParams = {
          pipelineId,
          propertyName,
          name,
          type,
          value,
          _enum,
          locked,
          path,
        };

        const replaceTektonPipelinePropertyResult =
          cdTektonPipelineService.replaceTektonPipelineProperty(
            replaceTektonPipelinePropertyParams
          );

        // all methods should return a Promise
        expectToBePromise(replaceTektonPipelinePropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/properties/{property_name}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.enum).toEqual(_enum);
        expect(mockRequestOptions.body.locked).toEqual(locked);
        expect(mockRequestOptions.body.path).toEqual(path);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.property_name).toEqual(propertyName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceTektonPipelinePropertyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __replaceTektonPipelinePropertyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __replaceTektonPipelinePropertyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const propertyName = 'debug-pipeline';
        const name = 'prop1';
        const type = 'text';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceTektonPipelinePropertyParams = {
          pipelineId,
          propertyName,
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.replaceTektonPipelineProperty(replaceTektonPipelinePropertyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.replaceTektonPipelineProperty({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.replaceTektonPipelineProperty();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTektonPipelineProperty', () => {
    describe('positive tests', () => {
      function __deleteTektonPipelinePropertyTest() {
        // Construct the params object for operation deleteTektonPipelineProperty
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const propertyName = 'debug-pipeline';
        const deleteTektonPipelinePropertyParams = {
          pipelineId,
          propertyName,
        };

        const deleteTektonPipelinePropertyResult =
          cdTektonPipelineService.deleteTektonPipelineProperty(deleteTektonPipelinePropertyParams);

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelinePropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/properties/{property_name}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.property_name).toEqual(propertyName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTektonPipelinePropertyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __deleteTektonPipelinePropertyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __deleteTektonPipelinePropertyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const propertyName = 'debug-pipeline';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTektonPipelinePropertyParams = {
          pipelineId,
          propertyName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.deleteTektonPipelineProperty(deleteTektonPipelinePropertyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineProperty({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineProperty();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTektonPipelineTriggers', () => {
    describe('positive tests', () => {
      function __listTektonPipelineTriggersTest() {
        // Construct the params object for operation listTektonPipelineTriggers
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const type = 'manual,scm';
        const name = 'testString';
        const eventListener = 'testString';
        const workerId = 'testString';
        const workerName = 'testString';
        const disabled = 'true';
        const tags = 'tag1,tag2';
        const listTektonPipelineTriggersParams = {
          pipelineId,
          type,
          name,
          eventListener,
          workerId,
          workerName,
          disabled,
          tags,
        };

        const listTektonPipelineTriggersResult = cdTektonPipelineService.listTektonPipelineTriggers(
          listTektonPipelineTriggersParams
        );

        // all methods should return a Promise
        expectToBePromise(listTektonPipelineTriggersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.event_listener).toEqual(eventListener);
        expect(mockRequestOptions.qs['worker.id']).toEqual(workerId);
        expect(mockRequestOptions.qs['worker.name']).toEqual(workerName);
        expect(mockRequestOptions.qs.disabled).toEqual(disabled);
        expect(mockRequestOptions.qs.tags).toEqual(tags);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTektonPipelineTriggersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __listTektonPipelineTriggersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __listTektonPipelineTriggersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTektonPipelineTriggersParams = {
          pipelineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.listTektonPipelineTriggers(listTektonPipelineTriggersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineTriggers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineTriggers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTektonPipelineTrigger', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // WorkerIdentity
      const workerIdentityModel = {
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

      // TriggerSourcePropertiesPrototype
      const triggerSourcePropertiesPrototypeModel = {
        url: 'testString',
        branch: 'testString',
        pattern: 'testString',
      };

      // TriggerSourcePrototype
      const triggerSourcePrototypeModel = {
        type: 'testString',
        properties: triggerSourcePropertiesPrototypeModel,
      };

      function __createTektonPipelineTriggerTest() {
        // Construct the params object for operation createTektonPipelineTrigger
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const type = 'manual';
        const name = 'Manual Trigger';
        const eventListener = 'pr-listener';
        const tags = ['testString'];
        const worker = workerIdentityModel;
        const maxConcurrentRuns = 3;
        const limitWaitingRuns = false;
        const enabled = true;
        const secret = genericSecretModel;
        const cron = 'testString';
        const timezone = 'testString';
        const source = triggerSourcePrototypeModel;
        const events = ['push'];
        const filter = 'testString';
        const favorite = false;
        const enableEventsFromForks = false;
        const disableDraftEvents = false;
        const createTektonPipelineTriggerParams = {
          pipelineId,
          type,
          name,
          eventListener,
          tags,
          worker,
          maxConcurrentRuns,
          limitWaitingRuns,
          enabled,
          secret,
          cron,
          timezone,
          source,
          events,
          filter,
          favorite,
          enableEventsFromForks,
          disableDraftEvents,
        };

        const createTektonPipelineTriggerResult =
          cdTektonPipelineService.createTektonPipelineTrigger(createTektonPipelineTriggerParams);

        // all methods should return a Promise
        expectToBePromise(createTektonPipelineTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.event_listener).toEqual(eventListener);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.worker).toEqual(worker);
        expect(mockRequestOptions.body.max_concurrent_runs).toEqual(maxConcurrentRuns);
        expect(mockRequestOptions.body.limit_waiting_runs).toEqual(limitWaitingRuns);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.secret).toEqual(secret);
        expect(mockRequestOptions.body.cron).toEqual(cron);
        expect(mockRequestOptions.body.timezone).toEqual(timezone);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.body.events).toEqual(events);
        expect(mockRequestOptions.body.filter).toEqual(filter);
        expect(mockRequestOptions.body.favorite).toEqual(favorite);
        expect(mockRequestOptions.body.enable_events_from_forks).toEqual(enableEventsFromForks);
        expect(mockRequestOptions.body.disable_draft_events).toEqual(disableDraftEvents);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTektonPipelineTriggerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __createTektonPipelineTriggerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __createTektonPipelineTriggerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const type = 'manual';
        const name = 'Manual Trigger';
        const eventListener = 'pr-listener';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelineTriggerParams = {
          pipelineId,
          type,
          name,
          eventListener,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipelineTrigger(createTektonPipelineTriggerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineTrigger({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineTrigger();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTektonPipelineTrigger', () => {
    describe('positive tests', () => {
      function __getTektonPipelineTriggerTest() {
        // Construct the params object for operation getTektonPipelineTrigger
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const getTektonPipelineTriggerParams = {
          pipelineId,
          triggerId,
        };

        const getTektonPipelineTriggerResult = cdTektonPipelineService.getTektonPipelineTrigger(
          getTektonPipelineTriggerParams
        );

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.trigger_id).toEqual(triggerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTektonPipelineTriggerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __getTektonPipelineTriggerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __getTektonPipelineTriggerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTektonPipelineTriggerParams = {
          pipelineId,
          triggerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.getTektonPipelineTrigger(getTektonPipelineTriggerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineTrigger({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineTrigger();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateTektonPipelineTrigger', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // WorkerIdentity
      const workerIdentityModel = {
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

      // TriggerSourcePropertiesPrototype
      const triggerSourcePropertiesPrototypeModel = {
        url: 'testString',
        branch: 'testString',
        pattern: 'testString',
      };

      // TriggerSourcePrototype
      const triggerSourcePrototypeModel = {
        type: 'testString',
        properties: triggerSourcePropertiesPrototypeModel,
      };

      function __updateTektonPipelineTriggerTest() {
        // Construct the params object for operation updateTektonPipelineTrigger
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const type = 'manual';
        const name = 'start-deploy';
        const eventListener = 'testString';
        const tags = ['testString'];
        const worker = workerIdentityModel;
        const maxConcurrentRuns = 38;
        const limitWaitingRuns = false;
        const enabled = true;
        const secret = genericSecretModel;
        const cron = 'testString';
        const timezone = 'testString';
        const source = triggerSourcePrototypeModel;
        const events = ['push'];
        const filter = 'testString';
        const favorite = false;
        const enableEventsFromForks = false;
        const disableDraftEvents = false;
        const updateTektonPipelineTriggerParams = {
          pipelineId,
          triggerId,
          type,
          name,
          eventListener,
          tags,
          worker,
          maxConcurrentRuns,
          limitWaitingRuns,
          enabled,
          secret,
          cron,
          timezone,
          source,
          events,
          filter,
          favorite,
          enableEventsFromForks,
          disableDraftEvents,
        };

        const updateTektonPipelineTriggerResult =
          cdTektonPipelineService.updateTektonPipelineTrigger(updateTektonPipelineTriggerParams);

        // all methods should return a Promise
        expectToBePromise(updateTektonPipelineTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.event_listener).toEqual(eventListener);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.worker).toEqual(worker);
        expect(mockRequestOptions.body.max_concurrent_runs).toEqual(maxConcurrentRuns);
        expect(mockRequestOptions.body.limit_waiting_runs).toEqual(limitWaitingRuns);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.secret).toEqual(secret);
        expect(mockRequestOptions.body.cron).toEqual(cron);
        expect(mockRequestOptions.body.timezone).toEqual(timezone);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.body.events).toEqual(events);
        expect(mockRequestOptions.body.filter).toEqual(filter);
        expect(mockRequestOptions.body.favorite).toEqual(favorite);
        expect(mockRequestOptions.body.enable_events_from_forks).toEqual(enableEventsFromForks);
        expect(mockRequestOptions.body.disable_draft_events).toEqual(disableDraftEvents);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.trigger_id).toEqual(triggerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTektonPipelineTriggerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __updateTektonPipelineTriggerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __updateTektonPipelineTriggerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTektonPipelineTriggerParams = {
          pipelineId,
          triggerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.updateTektonPipelineTrigger(updateTektonPipelineTriggerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.updateTektonPipelineTrigger({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.updateTektonPipelineTrigger();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTektonPipelineTrigger', () => {
    describe('positive tests', () => {
      function __deleteTektonPipelineTriggerTest() {
        // Construct the params object for operation deleteTektonPipelineTrigger
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const deleteTektonPipelineTriggerParams = {
          pipelineId,
          triggerId,
        };

        const deleteTektonPipelineTriggerResult =
          cdTektonPipelineService.deleteTektonPipelineTrigger(deleteTektonPipelineTriggerParams);

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelineTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.trigger_id).toEqual(triggerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTektonPipelineTriggerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __deleteTektonPipelineTriggerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __deleteTektonPipelineTriggerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTektonPipelineTriggerParams = {
          pipelineId,
          triggerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.deleteTektonPipelineTrigger(deleteTektonPipelineTriggerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineTrigger({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineTrigger();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('duplicateTektonPipelineTrigger', () => {
    describe('positive tests', () => {
      function __duplicateTektonPipelineTriggerTest() {
        // Construct the params object for operation duplicateTektonPipelineTrigger
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const sourceTriggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const name = 'triggerName';
        const duplicateTektonPipelineTriggerParams = {
          pipelineId,
          sourceTriggerId,
          name,
        };

        const duplicateTektonPipelineTriggerResult =
          cdTektonPipelineService.duplicateTektonPipelineTrigger(
            duplicateTektonPipelineTriggerParams
          );

        // all methods should return a Promise
        expectToBePromise(duplicateTektonPipelineTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/triggers/{source_trigger_id}/duplicate',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.source_trigger_id).toEqual(sourceTriggerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __duplicateTektonPipelineTriggerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __duplicateTektonPipelineTriggerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __duplicateTektonPipelineTriggerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const sourceTriggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const name = 'triggerName';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const duplicateTektonPipelineTriggerParams = {
          pipelineId,
          sourceTriggerId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.duplicateTektonPipelineTrigger(
          duplicateTektonPipelineTriggerParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.duplicateTektonPipelineTrigger({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.duplicateTektonPipelineTrigger();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTektonPipelineTriggerProperties', () => {
    describe('positive tests', () => {
      function __listTektonPipelineTriggerPropertiesTest() {
        // Construct the params object for operation listTektonPipelineTriggerProperties
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const name = 'prod';
        const type = 'secure,text';
        const sort = 'name';
        const listTektonPipelineTriggerPropertiesParams = {
          pipelineId,
          triggerId,
          name,
          type,
          sort,
        };

        const listTektonPipelineTriggerPropertiesResult =
          cdTektonPipelineService.listTektonPipelineTriggerProperties(
            listTektonPipelineTriggerPropertiesParams
          );

        // all methods should return a Promise
        expectToBePromise(listTektonPipelineTriggerPropertiesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.trigger_id).toEqual(triggerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTektonPipelineTriggerPropertiesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __listTektonPipelineTriggerPropertiesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __listTektonPipelineTriggerPropertiesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTektonPipelineTriggerPropertiesParams = {
          pipelineId,
          triggerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.listTektonPipelineTriggerProperties(
          listTektonPipelineTriggerPropertiesParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineTriggerProperties({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.listTektonPipelineTriggerProperties();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTektonPipelineTriggerProperties', () => {
    describe('positive tests', () => {
      function __createTektonPipelineTriggerPropertiesTest() {
        // Construct the params object for operation createTektonPipelineTriggerProperties
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const name = 'prop1';
        const type = 'text';
        const value = 'https://github.com/open-toolchain/hello-tekton.git';
        const _enum = ['testString'];
        const path = 'testString';
        const locked = false;
        const createTektonPipelineTriggerPropertiesParams = {
          pipelineId,
          triggerId,
          name,
          type,
          value,
          _enum,
          path,
          locked,
        };

        const createTektonPipelineTriggerPropertiesResult =
          cdTektonPipelineService.createTektonPipelineTriggerProperties(
            createTektonPipelineTriggerPropertiesParams
          );

        // all methods should return a Promise
        expectToBePromise(createTektonPipelineTriggerPropertiesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.enum).toEqual(_enum);
        expect(mockRequestOptions.body.path).toEqual(path);
        expect(mockRequestOptions.body.locked).toEqual(locked);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.trigger_id).toEqual(triggerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTektonPipelineTriggerPropertiesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __createTektonPipelineTriggerPropertiesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __createTektonPipelineTriggerPropertiesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const name = 'prop1';
        const type = 'text';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelineTriggerPropertiesParams = {
          pipelineId,
          triggerId,
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipelineTriggerProperties(
          createTektonPipelineTriggerPropertiesParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineTriggerProperties({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.createTektonPipelineTriggerProperties();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTektonPipelineTriggerProperty', () => {
    describe('positive tests', () => {
      function __getTektonPipelineTriggerPropertyTest() {
        // Construct the params object for operation getTektonPipelineTriggerProperty
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const propertyName = 'debug-pipeline';
        const getTektonPipelineTriggerPropertyParams = {
          pipelineId,
          triggerId,
          propertyName,
        };

        const getTektonPipelineTriggerPropertyResult =
          cdTektonPipelineService.getTektonPipelineTriggerProperty(
            getTektonPipelineTriggerPropertyParams
          );

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineTriggerPropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties/{property_name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.trigger_id).toEqual(triggerId);
        expect(mockRequestOptions.path.property_name).toEqual(propertyName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTektonPipelineTriggerPropertyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __getTektonPipelineTriggerPropertyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __getTektonPipelineTriggerPropertyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const propertyName = 'debug-pipeline';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTektonPipelineTriggerPropertyParams = {
          pipelineId,
          triggerId,
          propertyName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.getTektonPipelineTriggerProperty(
          getTektonPipelineTriggerPropertyParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineTriggerProperty({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.getTektonPipelineTriggerProperty();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceTektonPipelineTriggerProperty', () => {
    describe('positive tests', () => {
      function __replaceTektonPipelineTriggerPropertyTest() {
        // Construct the params object for operation replaceTektonPipelineTriggerProperty
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const propertyName = 'debug-pipeline';
        const name = 'prop1';
        const type = 'text';
        const value = 'https://github.com/open-toolchain/hello-tekton.git';
        const _enum = ['testString'];
        const path = 'testString';
        const locked = false;
        const replaceTektonPipelineTriggerPropertyParams = {
          pipelineId,
          triggerId,
          propertyName,
          name,
          type,
          value,
          _enum,
          path,
          locked,
        };

        const replaceTektonPipelineTriggerPropertyResult =
          cdTektonPipelineService.replaceTektonPipelineTriggerProperty(
            replaceTektonPipelineTriggerPropertyParams
          );

        // all methods should return a Promise
        expectToBePromise(replaceTektonPipelineTriggerPropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties/{property_name}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.enum).toEqual(_enum);
        expect(mockRequestOptions.body.path).toEqual(path);
        expect(mockRequestOptions.body.locked).toEqual(locked);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.trigger_id).toEqual(triggerId);
        expect(mockRequestOptions.path.property_name).toEqual(propertyName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceTektonPipelineTriggerPropertyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __replaceTektonPipelineTriggerPropertyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __replaceTektonPipelineTriggerPropertyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const propertyName = 'debug-pipeline';
        const name = 'prop1';
        const type = 'text';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceTektonPipelineTriggerPropertyParams = {
          pipelineId,
          triggerId,
          propertyName,
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.replaceTektonPipelineTriggerProperty(
          replaceTektonPipelineTriggerPropertyParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.replaceTektonPipelineTriggerProperty({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.replaceTektonPipelineTriggerProperty();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTektonPipelineTriggerProperty', () => {
    describe('positive tests', () => {
      function __deleteTektonPipelineTriggerPropertyTest() {
        // Construct the params object for operation deleteTektonPipelineTriggerProperty
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const propertyName = 'debug-pipeline';
        const deleteTektonPipelineTriggerPropertyParams = {
          pipelineId,
          triggerId,
          propertyName,
        };

        const deleteTektonPipelineTriggerPropertyResult =
          cdTektonPipelineService.deleteTektonPipelineTriggerProperty(
            deleteTektonPipelineTriggerPropertyParams
          );

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelineTriggerPropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties/{property_name}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.pipeline_id).toEqual(pipelineId);
        expect(mockRequestOptions.path.trigger_id).toEqual(triggerId);
        expect(mockRequestOptions.path.property_name).toEqual(propertyName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTektonPipelineTriggerPropertyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.enableRetries();
        __deleteTektonPipelineTriggerPropertyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdTektonPipelineService.disableRetries();
        __deleteTektonPipelineTriggerPropertyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const propertyName = 'debug-pipeline';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTektonPipelineTriggerPropertyParams = {
          pipelineId,
          triggerId,
          propertyName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.deleteTektonPipelineTriggerProperty(
          deleteTektonPipelineTriggerPropertyParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineTriggerProperty({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdTektonPipelineService.deleteTektonPipelineTriggerProperty();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});

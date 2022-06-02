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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const CdTektonPipelineV2 = require('../../dist/cd-tekton-pipeline/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const cdTektonPipelineServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://devops-api.us-south.devops.cloud.ibm.com/v2',
};

const cdTektonPipelineService = new CdTektonPipelineV2(cdTektonPipelineServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(cdTektonPipelineService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('CdTektonPipelineV2', () => {
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
      expect(CdTektonPipelineV2.getServiceUrlForRegion('us-south')).toBe('https://devops-api.us-south.devops.cloud.ibm.com/v2');      
      expect(CdTektonPipelineV2.getServiceUrlForRegion('us-east')).toBe('https://devops-api.us-east.devops.cloud.ibm.com/v2');      
      expect(CdTektonPipelineV2.getServiceUrlForRegion('eu-de')).toBe('https://devops-api.eu-de.devops.cloud.ibm.com/v2');      
      expect(CdTektonPipelineV2.getServiceUrlForRegion('eu-gb')).toBe('https://devops-api.eu-gb.devops.cloud.ibm.com/v2');      
      expect(CdTektonPipelineV2.getServiceUrlForRegion('jp-osa')).toBe('https://devops-api.jp-osa.devops.cloud.ibm.com/v2');      
      expect(CdTektonPipelineV2.getServiceUrlForRegion('jp-tok')).toBe('https://devops-api.jp-tok.devops.cloud.ibm.com/v2');      
      expect(CdTektonPipelineV2.getServiceUrlForRegion('au-syd')).toBe('https://devops-api.au-syd.devops.cloud.ibm.com/v2');      
      expect(CdTektonPipelineV2.getServiceUrlForRegion('ca-tor')).toBe('https://devops-api.ca-tor.devops.cloud.ibm.com/v2');      
      expect(CdTektonPipelineV2.getServiceUrlForRegion('br-sao')).toBe('https://devops-api.br-sao.devops.cloud.ibm.com/v2');      
    });
  });
  describe('createTektonPipeline', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // WorkerWithId
      const workerWithIdModel = {
        id: 'public',
      };

      function __createTektonPipelineTest() {
        // Construct the params object for operation createTektonPipeline
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const worker = workerWithIdModel;
        const createTektonPipelineParams = {
          id: id,
          worker: worker,
        };

        const createTektonPipelineResult = cdTektonPipelineService.createTektonPipeline(createTektonPipelineParams);

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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelineParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipeline(createTektonPipelineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        cdTektonPipelineService.createTektonPipeline({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getTektonPipeline', () => {
    describe('positive tests', () => {
      function __getTektonPipelineTest() {
        // Construct the params object for operation getTektonPipeline
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const getTektonPipelineParams = {
          id: id,
        };

        const getTektonPipelineResult = cdTektonPipelineService.getTektonPipeline(getTektonPipelineParams);

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

      // WorkerWithId
      const workerWithIdModel = {
        id: 'public',
      };

      function __updateTektonPipelineTest() {
        // Construct the params object for operation updateTektonPipeline
        const id = '94619026-912b-4d92-8f51-6c74f0692d90';
        const worker = workerWithIdModel;
        const updateTektonPipelineParams = {
          id: id,
          worker: worker,
        };

        const updateTektonPipelineResult = cdTektonPipelineService.updateTektonPipeline(updateTektonPipelineParams);

        // all methods should return a Promise
        expectToBePromise(updateTektonPipelineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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
          id: id,
        };

        const deleteTektonPipelineResult = cdTektonPipelineService.deleteTektonPipeline(deleteTektonPipelineParams);

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
        const limit = 1;
        const offset = 38;
        const status = 'succeeded';
        const triggerName = 'manual-trigger';
        const listTektonPipelineRunsParams = {
          pipelineId: pipelineId,
          limit: limit,
          offset: offset,
          status: status,
          triggerName: triggerName,
        };

        const listTektonPipelineRunsResult = cdTektonPipelineService.listTektonPipelineRuns(listTektonPipelineRunsParams);

        // all methods should return a Promise
        expectToBePromise(listTektonPipelineRunsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/pipeline_runs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
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
  });
  describe('createTektonPipelineRun', () => {
    describe('positive tests', () => {
      function __createTektonPipelineRunTest() {
        // Construct the params object for operation createTektonPipelineRun
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerName = 'Generic Webhook Trigger - 0';
        const triggerProperties = { 'key1': 'testString' };
        const secureTriggerProperties = { 'key1': 'testString' };
        const triggerHeader = { 'key1': 'testString' };
        const triggerBody = { 'key1': 'testString' };
        const createTektonPipelineRunParams = {
          pipelineId: pipelineId,
          triggerName: triggerName,
          triggerProperties: triggerProperties,
          secureTriggerProperties: secureTriggerProperties,
          triggerHeader: triggerHeader,
          triggerBody: triggerBody,
        };

        const createTektonPipelineRunResult = cdTektonPipelineService.createTektonPipelineRun(createTektonPipelineRunParams);

        // all methods should return a Promise
        expectToBePromise(createTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/pipeline_runs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.trigger_name).toEqual(triggerName);
        expect(mockRequestOptions.body.trigger_properties).toEqual(triggerProperties);
        expect(mockRequestOptions.body.secure_trigger_properties).toEqual(secureTriggerProperties);
        expect(mockRequestOptions.body.trigger_header).toEqual(triggerHeader);
        expect(mockRequestOptions.body.trigger_body).toEqual(triggerBody);
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
          pipelineId: pipelineId,
          id: id,
          includes: includes,
        };

        const getTektonPipelineRunResult = cdTektonPipelineService.getTektonPipelineRun(getTektonPipelineRunParams);

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}', 'GET');
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
          pipelineId: pipelineId,
          id: id,
        };

        const deleteTektonPipelineRunResult = cdTektonPipelineService.deleteTektonPipelineRun(deleteTektonPipelineRunParams);

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}', 'DELETE');
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
          pipelineId: pipelineId,
          id: id,
          force: force,
        };

        const cancelTektonPipelineRunResult = cdTektonPipelineService.cancelTektonPipelineRun(cancelTektonPipelineRunParams);

        // all methods should return a Promise
        expectToBePromise(cancelTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/cancel', 'POST');
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
          pipelineId: pipelineId,
          id: id,
        };

        const rerunTektonPipelineRunResult = cdTektonPipelineService.rerunTektonPipelineRun(rerunTektonPipelineRunParams);

        // all methods should return a Promise
        expectToBePromise(rerunTektonPipelineRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/rerun', 'POST');
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
          pipelineId: pipelineId,
          id: id,
        };

        const getTektonPipelineRunLogsResult = cdTektonPipelineService.getTektonPipelineRunLogs(getTektonPipelineRunLogsParams);

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineRunLogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/logs', 'GET');
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
          pipelineId: pipelineId,
          pipelineRunId: pipelineRunId,
          id: id,
        };

        const getTektonPipelineRunLogContentResult = cdTektonPipelineService.getTektonPipelineRunLogContent(getTektonPipelineRunLogContentParams);

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineRunLogContentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/pipeline_runs/{pipeline_run_id}/logs/{id}', 'GET');
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

        cdTektonPipelineService.getTektonPipelineRunLogContent(getTektonPipelineRunLogContentParams);
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
          pipelineId: pipelineId,
        };

        const listTektonPipelineDefinitionsResult = cdTektonPipelineService.listTektonPipelineDefinitions(listTektonPipelineDefinitionsParams);

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

      // DefinitionScmSource
      const definitionScmSourceModel = {
        url: 'https://github.com/IBM/tekton-tutorial.git',
        branch: 'master',
        tag: 'testString',
        path: '.tekton',
      };

      function __createTektonPipelineDefinitionTest() {
        // Construct the params object for operation createTektonPipelineDefinition
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const scmSource = definitionScmSourceModel;
        const createTektonPipelineDefinitionParams = {
          pipelineId: pipelineId,
          scmSource: scmSource,
        };

        const createTektonPipelineDefinitionResult = cdTektonPipelineService.createTektonPipelineDefinition(createTektonPipelineDefinitionParams);

        // all methods should return a Promise
        expectToBePromise(createTektonPipelineDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/definitions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.scm_source).toEqual(scmSource);
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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelineDefinitionParams = {
          pipelineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipelineDefinition(createTektonPipelineDefinitionParams);
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
          pipelineId: pipelineId,
          definitionId: definitionId,
        };

        const getTektonPipelineDefinitionResult = cdTektonPipelineService.getTektonPipelineDefinition(getTektonPipelineDefinitionParams);

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/definitions/{definition_id}', 'GET');
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

      // DefinitionScmSource
      const definitionScmSourceModel = {
        url: 'https://github.com/IBM/tekton-tutorial.git',
        branch: 'master',
        tag: 'testString',
        path: '.tekton',
      };

      function __replaceTektonPipelineDefinitionTest() {
        // Construct the params object for operation replaceTektonPipelineDefinition
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const definitionId = '94299034-d45f-4e9a-8ed5-6bd5c7bb7ada';
        const scmSource = definitionScmSourceModel;
        const serviceInstanceId = '071d8049-d984-4feb-a2ed-2a1e938918ba';
        const id = '22f92ab1-e0ac-4c65-84e7-8a4cb32dba0f';
        const replaceTektonPipelineDefinitionParams = {
          pipelineId: pipelineId,
          definitionId: definitionId,
          scmSource: scmSource,
          serviceInstanceId: serviceInstanceId,
          id: id,
        };

        const replaceTektonPipelineDefinitionResult = cdTektonPipelineService.replaceTektonPipelineDefinition(replaceTektonPipelineDefinitionParams);

        // all methods should return a Promise
        expectToBePromise(replaceTektonPipelineDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/definitions/{definition_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.scm_source).toEqual(scmSource);
        expect(mockRequestOptions.body.service_instance_id).toEqual(serviceInstanceId);
        expect(mockRequestOptions.body.id).toEqual(id);
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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceTektonPipelineDefinitionParams = {
          pipelineId,
          definitionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.replaceTektonPipelineDefinition(replaceTektonPipelineDefinitionParams);
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
          pipelineId: pipelineId,
          definitionId: definitionId,
        };

        const deleteTektonPipelineDefinitionResult = cdTektonPipelineService.deleteTektonPipelineDefinition(deleteTektonPipelineDefinitionParams);

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelineDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/definitions/{definition_id}', 'DELETE');
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

        cdTektonPipelineService.deleteTektonPipelineDefinition(deleteTektonPipelineDefinitionParams);
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
        const type = ['SECURE', 'TEXT'];
        const sort = 'name';
        const listTektonPipelinePropertiesParams = {
          pipelineId: pipelineId,
          name: name,
          type: type,
          sort: sort,
        };

        const listTektonPipelinePropertiesResult = cdTektonPipelineService.listTektonPipelineProperties(listTektonPipelinePropertiesParams);

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
        const name = 'key1';
        const type = 'TEXT';
        const value = 'https://github.com/IBM/tekton-tutorial.git';
        const _enum = ['testString'];
        const _default = 'testString';
        const path = 'testString';
        const createTektonPipelinePropertiesParams = {
          pipelineId: pipelineId,
          name: name,
          type: type,
          value: value,
          _enum: _enum,
          _default: _default,
          path: path,
        };

        const createTektonPipelinePropertiesResult = cdTektonPipelineService.createTektonPipelineProperties(createTektonPipelinePropertiesParams);

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
        expect(mockRequestOptions.body.default).toEqual(_default);
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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelinePropertiesParams = {
          pipelineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipelineProperties(createTektonPipelinePropertiesParams);
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
          pipelineId: pipelineId,
          propertyName: propertyName,
        };

        const getTektonPipelinePropertyResult = cdTektonPipelineService.getTektonPipelineProperty(getTektonPipelinePropertyParams);

        // all methods should return a Promise
        expectToBePromise(getTektonPipelinePropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/properties/{property_name}', 'GET');
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
        const name = 'key1';
        const type = 'TEXT';
        const value = 'https://github.com/IBM/tekton-tutorial.git';
        const _enum = ['testString'];
        const _default = 'testString';
        const path = 'testString';
        const replaceTektonPipelinePropertyParams = {
          pipelineId: pipelineId,
          propertyName: propertyName,
          name: name,
          type: type,
          value: value,
          _enum: _enum,
          _default: _default,
          path: path,
        };

        const replaceTektonPipelinePropertyResult = cdTektonPipelineService.replaceTektonPipelineProperty(replaceTektonPipelinePropertyParams);

        // all methods should return a Promise
        expectToBePromise(replaceTektonPipelinePropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/properties/{property_name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.enum).toEqual(_enum);
        expect(mockRequestOptions.body.default).toEqual(_default);
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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceTektonPipelinePropertyParams = {
          pipelineId,
          propertyName,
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
          pipelineId: pipelineId,
          propertyName: propertyName,
        };

        const deleteTektonPipelinePropertyResult = cdTektonPipelineService.deleteTektonPipelineProperty(deleteTektonPipelinePropertyParams);

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelinePropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/properties/{property_name}', 'DELETE');
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
          pipelineId: pipelineId,
          type: type,
          name: name,
          eventListener: eventListener,
          workerId: workerId,
          workerName: workerName,
          disabled: disabled,
          tags: tags,
        };

        const listTektonPipelineTriggersResult = cdTektonPipelineService.listTektonPipelineTriggers(listTektonPipelineTriggersParams);

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

      // TriggerDuplicateTrigger
      const triggerModel = {
        source_trigger_id: 'b3a8228f-1c82-409b-b249-7639166a0300',
        name: 'Generic Trigger- duplicated',
      };

      function __createTektonPipelineTriggerTest() {
        // Construct the params object for operation createTektonPipelineTrigger
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const trigger = triggerModel;
        const createTektonPipelineTriggerParams = {
          pipelineId: pipelineId,
          trigger: trigger,
        };

        const createTektonPipelineTriggerResult = cdTektonPipelineService.createTektonPipelineTrigger(createTektonPipelineTriggerParams);

        // all methods should return a Promise
        expectToBePromise(createTektonPipelineTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(trigger);
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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelineTriggerParams = {
          pipelineId,
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
          pipelineId: pipelineId,
          triggerId: triggerId,
        };

        const getTektonPipelineTriggerResult = cdTektonPipelineService.getTektonPipelineTrigger(getTektonPipelineTriggerParams);

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}', 'GET');
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

      // Worker
      const workerModel = {
        name: 'testString',
        type: 'private',
        id: 'testString',
      };

      // Concurrency
      const concurrencyModel = {
        max_concurrent_runs: 20,
      };

      // GenericSecret
      const genericSecretModel = {
        type: 'tokenMatches',
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
      };

      // Events
      const eventsModel = {
        push: true,
        pull_request_closed: true,
        pull_request: true,
      };

      function __updateTektonPipelineTriggerTest() {
        // Construct the params object for operation updateTektonPipelineTrigger
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const type = 'manual';
        const name = 'start-deploy';
        const eventListener = 'testString';
        const tags = ['testString'];
        const worker = workerModel;
        const concurrency = concurrencyModel;
        const disabled = true;
        const secret = genericSecretModel;
        const cron = 'testString';
        const timezone = 'Africa/Abidjan';
        const scmSource = triggerScmSourceModel;
        const events = eventsModel;
        const updateTektonPipelineTriggerParams = {
          pipelineId: pipelineId,
          triggerId: triggerId,
          type: type,
          name: name,
          eventListener: eventListener,
          tags: tags,
          worker: worker,
          concurrency: concurrency,
          disabled: disabled,
          secret: secret,
          cron: cron,
          timezone: timezone,
          scmSource: scmSource,
          events: events,
        };

        const updateTektonPipelineTriggerResult = cdTektonPipelineService.updateTektonPipelineTrigger(updateTektonPipelineTriggerParams);

        // all methods should return a Promise
        expectToBePromise(updateTektonPipelineTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.event_listener).toEqual(eventListener);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.worker).toEqual(worker);
        expect(mockRequestOptions.body.concurrency).toEqual(concurrency);
        expect(mockRequestOptions.body.disabled).toEqual(disabled);
        expect(mockRequestOptions.body.secret).toEqual(secret);
        expect(mockRequestOptions.body.cron).toEqual(cron);
        expect(mockRequestOptions.body.timezone).toEqual(timezone);
        expect(mockRequestOptions.body.scm_source).toEqual(scmSource);
        expect(mockRequestOptions.body.events).toEqual(events);
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
          pipelineId: pipelineId,
          triggerId: triggerId,
        };

        const deleteTektonPipelineTriggerResult = cdTektonPipelineService.deleteTektonPipelineTrigger(deleteTektonPipelineTriggerParams);

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelineTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}', 'DELETE');
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
  describe('listTektonPipelineTriggerProperties', () => {
    describe('positive tests', () => {
      function __listTektonPipelineTriggerPropertiesTest() {
        // Construct the params object for operation listTektonPipelineTriggerProperties
        const pipelineId = '94619026-912b-4d92-8f51-6c74f0692d90';
        const triggerId = '1bb892a1-2e04-4768-a369-b1159eace147';
        const name = 'prod';
        const type = 'SECURE,TEXT';
        const sort = 'name';
        const listTektonPipelineTriggerPropertiesParams = {
          pipelineId: pipelineId,
          triggerId: triggerId,
          name: name,
          type: type,
          sort: sort,
        };

        const listTektonPipelineTriggerPropertiesResult = cdTektonPipelineService.listTektonPipelineTriggerProperties(listTektonPipelineTriggerPropertiesParams);

        // all methods should return a Promise
        expectToBePromise(listTektonPipelineTriggerPropertiesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties', 'GET');
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
        const name = 'prod';
        const type = 'SECURE,TEXT';
        const sort = 'name';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTektonPipelineTriggerPropertiesParams = {
          pipelineId,
          triggerId,
          name,
          type,
          sort,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.listTektonPipelineTriggerProperties(listTektonPipelineTriggerPropertiesParams);
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
        const name = 'key1';
        const type = 'TEXT';
        const value = 'https://github.com/IBM/tekton-tutorial.git';
        const _enum = ['testString'];
        const _default = 'testString';
        const path = 'testString';
        const createTektonPipelineTriggerPropertiesParams = {
          pipelineId: pipelineId,
          triggerId: triggerId,
          name: name,
          type: type,
          value: value,
          _enum: _enum,
          _default: _default,
          path: path,
        };

        const createTektonPipelineTriggerPropertiesResult = cdTektonPipelineService.createTektonPipelineTriggerProperties(createTektonPipelineTriggerPropertiesParams);

        // all methods should return a Promise
        expectToBePromise(createTektonPipelineTriggerPropertiesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.enum).toEqual(_enum);
        expect(mockRequestOptions.body.default).toEqual(_default);
        expect(mockRequestOptions.body.path).toEqual(path);
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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTektonPipelineTriggerPropertiesParams = {
          pipelineId,
          triggerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.createTektonPipelineTriggerProperties(createTektonPipelineTriggerPropertiesParams);
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
          pipelineId: pipelineId,
          triggerId: triggerId,
          propertyName: propertyName,
        };

        const getTektonPipelineTriggerPropertyResult = cdTektonPipelineService.getTektonPipelineTriggerProperty(getTektonPipelineTriggerPropertyParams);

        // all methods should return a Promise
        expectToBePromise(getTektonPipelineTriggerPropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties/{property_name}', 'GET');
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

        cdTektonPipelineService.getTektonPipelineTriggerProperty(getTektonPipelineTriggerPropertyParams);
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
        const name = 'key1';
        const type = 'TEXT';
        const value = 'https://github.com/IBM/tekton-tutorial.git';
        const _enum = ['testString'];
        const _default = 'testString';
        const path = 'testString';
        const replaceTektonPipelineTriggerPropertyParams = {
          pipelineId: pipelineId,
          triggerId: triggerId,
          propertyName: propertyName,
          name: name,
          type: type,
          value: value,
          _enum: _enum,
          _default: _default,
          path: path,
        };

        const replaceTektonPipelineTriggerPropertyResult = cdTektonPipelineService.replaceTektonPipelineTriggerProperty(replaceTektonPipelineTriggerPropertyParams);

        // all methods should return a Promise
        expectToBePromise(replaceTektonPipelineTriggerPropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties/{property_name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.enum).toEqual(_enum);
        expect(mockRequestOptions.body.default).toEqual(_default);
        expect(mockRequestOptions.body.path).toEqual(path);
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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceTektonPipelineTriggerPropertyParams = {
          pipelineId,
          triggerId,
          propertyName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdTektonPipelineService.replaceTektonPipelineTriggerProperty(replaceTektonPipelineTriggerPropertyParams);
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
          pipelineId: pipelineId,
          triggerId: triggerId,
          propertyName: propertyName,
        };

        const deleteTektonPipelineTriggerPropertyResult = cdTektonPipelineService.deleteTektonPipelineTriggerProperty(deleteTektonPipelineTriggerPropertyParams);

        // all methods should return a Promise
        expectToBePromise(deleteTektonPipelineTriggerPropertyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties/{property_name}', 'DELETE');
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

        cdTektonPipelineService.deleteTektonPipelineTriggerProperty(deleteTektonPipelineTriggerPropertyParams);
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

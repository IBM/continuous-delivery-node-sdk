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

const nock = require('nock');
const CdToolchainV2 = require('../../dist/cd-toolchain/v2');

/* eslint-disable no-await-in-loop */

const { getOptions, checkUrlAndMethod, checkMediaHeaders, expectToBePromise } = unitTestUtils;

const cdToolchainServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.devops.cloud.ibm.com/toolchain/v2',
};

const cdToolchainService = new CdToolchainV2(cdToolchainServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(cdToolchainService, 'createRequest');
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
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('CdToolchainV2', () => {
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
      const testInstance = CdToolchainV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(CdToolchainV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(CdToolchainV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(CdToolchainV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = CdToolchainV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(CdToolchainV2);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new CdToolchainV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new CdToolchainV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(CdToolchainV2.DEFAULT_SERVICE_URL);
    });
  });

  describe('getServiceUrlForRegion', () => {
    test('should return undefined for invalid region', () => {
      expect(CdToolchainV2.getServiceUrlForRegion('INVALID_REGION')).toBeFalsy();
    });
    test('should return valid service url', () => {
      expect(CdToolchainV2.getServiceUrlForRegion('us-south')).toBe(
        'https://api.us-south.devops.cloud.ibm.com/toolchain/v2'
      );
      expect(CdToolchainV2.getServiceUrlForRegion('us-east')).toBe(
        'https://api.us-east.devops.cloud.ibm.com/toolchain/v2'
      );
      expect(CdToolchainV2.getServiceUrlForRegion('eu-de')).toBe(
        'https://api.eu-de.devops.cloud.ibm.com/toolchain/v2'
      );
      expect(CdToolchainV2.getServiceUrlForRegion('eu-gb')).toBe(
        'https://api.eu-gb.devops.cloud.ibm.com/toolchain/v2'
      );
      expect(CdToolchainV2.getServiceUrlForRegion('jp-osa')).toBe(
        'https://api.jp-osa.devops.cloud.ibm.com/toolchain/v2'
      );
      expect(CdToolchainV2.getServiceUrlForRegion('jp-tok')).toBe(
        'https://api.jp-tok.devops.cloud.ibm.com/toolchain/v2'
      );
      expect(CdToolchainV2.getServiceUrlForRegion('au-syd')).toBe(
        'https://api.au-syd.devops.cloud.ibm.com/toolchain/v2'
      );
      expect(CdToolchainV2.getServiceUrlForRegion('ca-tor')).toBe(
        'https://api.ca-tor.devops.cloud.ibm.com/toolchain/v2'
      );
      expect(CdToolchainV2.getServiceUrlForRegion('br-sao')).toBe(
        'https://api.br-sao.devops.cloud.ibm.com/toolchain/v2'
      );
    });
  });

  describe('listToolchains', () => {
    describe('positive tests', () => {
      function __listToolchainsTest() {
        // Construct the params object for operation listToolchains
        const resourceGroupId = 'testString';
        const limit = 1;
        const start = 'testString';
        const listToolchainsParams = {
          resourceGroupId,
          limit,
          start,
        };

        const listToolchainsResult = cdToolchainService.listToolchains(listToolchainsParams);

        // all methods should return a Promise
        expectToBePromise(listToolchainsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/toolchains', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listToolchainsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __listToolchainsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __listToolchainsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const resourceGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listToolchainsParams = {
          resourceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.listToolchains(listToolchainsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.listToolchains({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.listToolchains();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ToolchainsPager tests', () => {
      const serviceUrl = cdToolchainServiceOptions.url;
      const path = '/toolchains';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"toolchains":[{"id":"id","name":"name","description":"description","account_id":"account_id","location":"location","resource_group_id":"resource_group_id","crn":"crn","href":"href","ui_href":"ui_href","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","created_by":"created_by"}],"limit":1}';
      const mockPagerResponse2 =
        '{"total_count":2,"toolchains":[{"id":"id","name":"name","description":"description","account_id":"account_id","location":"location","resource_group_id":"resource_group_id","crn":"crn","href":"href","ui_href":"ui_href","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","created_by":"created_by"}],"limit":1}';

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
          resourceGroupId: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new CdToolchainV2.ToolchainsPager(cdToolchainService, params);
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
          resourceGroupId: 'testString',
          limit: 10,
        };
        const pager = new CdToolchainV2.ToolchainsPager(cdToolchainService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createToolchain', () => {
    describe('positive tests', () => {
      function __createToolchainTest() {
        // Construct the params object for operation createToolchain
        const name = 'TestToolchainV2';
        const resourceGroupId = '6a9a01f2cff54a7f966f803d92877123';
        const description = 'A sample toolchain to test the API';
        const createToolchainParams = {
          name,
          resourceGroupId,
          description,
        };

        const createToolchainResult = cdToolchainService.createToolchain(createToolchainParams);

        // all methods should return a Promise
        expectToBePromise(createToolchainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/toolchains', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.description).toEqual(description);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createToolchainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __createToolchainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __createToolchainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'TestToolchainV2';
        const resourceGroupId = '6a9a01f2cff54a7f966f803d92877123';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createToolchainParams = {
          name,
          resourceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.createToolchain(createToolchainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.createToolchain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.createToolchain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getToolchainById', () => {
    describe('positive tests', () => {
      function __getToolchainByIdTest() {
        // Construct the params object for operation getToolchainById
        const toolchainId = 'testString';
        const getToolchainByIdParams = {
          toolchainId,
        };

        const getToolchainByIdResult = cdToolchainService.getToolchainById(getToolchainByIdParams);

        // all methods should return a Promise
        expectToBePromise(getToolchainByIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/toolchains/{toolchain_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.toolchain_id).toEqual(toolchainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getToolchainByIdTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __getToolchainByIdTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __getToolchainByIdTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toolchainId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getToolchainByIdParams = {
          toolchainId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.getToolchainById(getToolchainByIdParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.getToolchainById({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.getToolchainById();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteToolchain', () => {
    describe('positive tests', () => {
      function __deleteToolchainTest() {
        // Construct the params object for operation deleteToolchain
        const toolchainId = 'testString';
        const deleteToolchainParams = {
          toolchainId,
        };

        const deleteToolchainResult = cdToolchainService.deleteToolchain(deleteToolchainParams);

        // all methods should return a Promise
        expectToBePromise(deleteToolchainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/toolchains/{toolchain_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.toolchain_id).toEqual(toolchainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteToolchainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __deleteToolchainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __deleteToolchainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toolchainId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteToolchainParams = {
          toolchainId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.deleteToolchain(deleteToolchainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.deleteToolchain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.deleteToolchain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateToolchain', () => {
    describe('positive tests', () => {
      function __updateToolchainTest() {
        // Construct the params object for operation updateToolchain
        const toolchainId = 'testString';
        const name = 'newToolchainName';
        const description = 'New toolchain description';
        const updateToolchainParams = {
          toolchainId,
          name,
          description,
        };

        const updateToolchainResult = cdToolchainService.updateToolchain(updateToolchainParams);

        // all methods should return a Promise
        expectToBePromise(updateToolchainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/toolchains/{toolchain_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.toolchain_id).toEqual(toolchainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateToolchainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __updateToolchainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __updateToolchainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toolchainId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateToolchainParams = {
          toolchainId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.updateToolchain(updateToolchainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.updateToolchain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.updateToolchain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTools', () => {
    describe('positive tests', () => {
      function __listToolsTest() {
        // Construct the params object for operation listTools
        const toolchainId = 'testString';
        const limit = 1;
        const start = 'testString';
        const listToolsParams = {
          toolchainId,
          limit,
          start,
        };

        const listToolsResult = cdToolchainService.listTools(listToolsParams);

        // all methods should return a Promise
        expectToBePromise(listToolsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/toolchains/{toolchain_id}/tools', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.toolchain_id).toEqual(toolchainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listToolsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __listToolsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __listToolsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toolchainId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listToolsParams = {
          toolchainId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.listTools(listToolsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.listTools({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.listTools();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ToolsPager tests', () => {
      const serviceUrl = cdToolchainServiceOptions.url;
      const path = '/toolchains/testString/tools';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"tools":[{"id":"id","resource_group_id":"resource_group_id","crn":"crn","tool_type_id":"tool_type_id","toolchain_id":"toolchain_id","toolchain_crn":"toolchain_crn","href":"href","referent":{"ui_href":"ui_href","api_href":"api_href"},"name":"name","updated_at":"2019-01-01T12:00:00.000Z","parameters":{"anyKey":"anyValue"},"state":"configured"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"tools":[{"id":"id","resource_group_id":"resource_group_id","crn":"crn","tool_type_id":"tool_type_id","toolchain_id":"toolchain_id","toolchain_crn":"toolchain_crn","href":"href","referent":{"ui_href":"ui_href","api_href":"api_href"},"name":"name","updated_at":"2019-01-01T12:00:00.000Z","parameters":{"anyKey":"anyValue"},"state":"configured"}]}';

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
          toolchainId: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new CdToolchainV2.ToolsPager(cdToolchainService, params);
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
          toolchainId: 'testString',
          limit: 10,
        };
        const pager = new CdToolchainV2.ToolsPager(cdToolchainService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createTool', () => {
    describe('positive tests', () => {
      function __createToolTest() {
        // Construct the params object for operation createTool
        const toolchainId = 'testString';
        const toolTypeId = 'draservicebroker';
        const name = 'testString';
        const parameters = { foo: 'bar' };
        const createToolParams = {
          toolchainId,
          toolTypeId,
          name,
          parameters,
        };

        const createToolResult = cdToolchainService.createTool(createToolParams);

        // all methods should return a Promise
        expectToBePromise(createToolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/toolchains/{toolchain_id}/tools', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.tool_type_id).toEqual(toolTypeId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.parameters).toEqual(parameters);
        expect(mockRequestOptions.path.toolchain_id).toEqual(toolchainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createToolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __createToolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __createToolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toolchainId = 'testString';
        const toolTypeId = 'draservicebroker';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createToolParams = {
          toolchainId,
          toolTypeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.createTool(createToolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.createTool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.createTool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getToolById', () => {
    describe('positive tests', () => {
      function __getToolByIdTest() {
        // Construct the params object for operation getToolById
        const toolchainId = 'testString';
        const toolId = 'testString';
        const getToolByIdParams = {
          toolchainId,
          toolId,
        };

        const getToolByIdResult = cdToolchainService.getToolById(getToolByIdParams);

        // all methods should return a Promise
        expectToBePromise(getToolByIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/toolchains/{toolchain_id}/tools/{tool_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.toolchain_id).toEqual(toolchainId);
        expect(mockRequestOptions.path.tool_id).toEqual(toolId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getToolByIdTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __getToolByIdTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __getToolByIdTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toolchainId = 'testString';
        const toolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getToolByIdParams = {
          toolchainId,
          toolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.getToolById(getToolByIdParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.getToolById({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.getToolById();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTool', () => {
    describe('positive tests', () => {
      function __deleteToolTest() {
        // Construct the params object for operation deleteTool
        const toolchainId = 'testString';
        const toolId = 'testString';
        const deleteToolParams = {
          toolchainId,
          toolId,
        };

        const deleteToolResult = cdToolchainService.deleteTool(deleteToolParams);

        // all methods should return a Promise
        expectToBePromise(deleteToolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/toolchains/{toolchain_id}/tools/{tool_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.toolchain_id).toEqual(toolchainId);
        expect(mockRequestOptions.path.tool_id).toEqual(toolId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteToolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __deleteToolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __deleteToolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toolchainId = 'testString';
        const toolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteToolParams = {
          toolchainId,
          toolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.deleteTool(deleteToolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.deleteTool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.deleteTool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateTool', () => {
    describe('positive tests', () => {
      function __updateToolTest() {
        // Construct the params object for operation updateTool
        const toolchainId = 'testString';
        const toolId = 'testString';
        const name = 'MyTool';
        const toolTypeId = 'draservicebroker';
        const parameters = { foo: 'bar' };
        const updateToolParams = {
          toolchainId,
          toolId,
          name,
          toolTypeId,
          parameters,
        };

        const updateToolResult = cdToolchainService.updateTool(updateToolParams);

        // all methods should return a Promise
        expectToBePromise(updateToolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/toolchains/{toolchain_id}/tools/{tool_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.tool_type_id).toEqual(toolTypeId);
        expect(mockRequestOptions.body.parameters).toEqual(parameters);
        expect(mockRequestOptions.path.toolchain_id).toEqual(toolchainId);
        expect(mockRequestOptions.path.tool_id).toEqual(toolId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateToolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.enableRetries();
        __updateToolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        cdToolchainService.disableRetries();
        __updateToolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toolchainId = 'testString';
        const toolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateToolParams = {
          toolchainId,
          toolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        cdToolchainService.updateTool(updateToolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await cdToolchainService.updateTool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await cdToolchainService.updateTool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});

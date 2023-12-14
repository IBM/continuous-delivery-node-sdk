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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.77.0-42417df0-20230811-192318
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * This swagger document describes the options and endpoints of the Toolchain API.<br><br> All calls require an
 * <strong>Authorization</strong> HTTP header to be set with a bearer token, which can be generated using the <a
 * href="https://cloud.ibm.com/apidocs/iam-identity-token-api">Identity and Access Management (IAM) API</a>.<br><br>Note
 * that all resources must have a corresponding <b>resource_group_id</b> to use the API, resources within a Cloud
 * Foundry organization cannot be accessed or modified using the API.
 *
 * API Version: 2.0.0
 */

class CdToolchainV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.devops.cloud.ibm.com/toolchain/v2';

  static DEFAULT_SERVICE_NAME: string = 'cd_toolchain';

  private static _regionalEndpoints = new Map([
    ['us-south', 'https://api.us-south.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the us-south region
    ['us-east', 'https://api.us-east.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the us-east region
    ['eu-de', 'https://api.eu-de.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the eu-de region
    ['eu-gb', 'https://api.eu-gb.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the eu-gb region
    ['jp-osa', 'https://api.jp-osa.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the jp-osa region
    ['jp-tok', 'https://api.jp-tok.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the jp-tok region
    ['au-syd', 'https://api.au-syd.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the au-syd region
    ['ca-tor', 'https://api.ca-tor.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the ca-tor region
    ['br-sao', 'https://api.br-sao.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the br-sao region
    ['eu-es', 'https://api.eu-es.devops.cloud.ibm.com/toolchain/v2'], // The toolchain API endpoint in the eu-es region
  ]);

  /**
   * Returns the service URL associated with the specified region.
   * @param region a string representing the region
   * @returns the service URL associated with the specified region or undefined
   * if no mapping for the region exists
   */
  public static getServiceUrlForRegion(region: string): string {
    return this._regionalEndpoints.get(region);
  }

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of CdToolchainV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {CdToolchainV2}
   */

  public static newInstance(options: UserOptions): CdToolchainV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new CdToolchainV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a CdToolchainV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {CdToolchainV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(CdToolchainV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * toolchains
   ************************/

  /**
   * Get a list of toolchains.
   *
   * Returns a list of toolchains that the caller is authorized to access and that meets the provided query parameters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.resourceGroupId - The resource group ID where the toolchains exist.
   * @param {number} [params.limit] - Limit the number of results.
   * @param {string} [params.start] - Pagination token.
   * @param {string} [params.name] - Exact name of toolchain to look up. This parameter is case sensitive.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainCollection>>}
   */
  public listToolchains(
    params: CdToolchainV2.ListToolchainsParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainCollection>> {
    const _params = { ...params };
    const _requiredParams = ['resourceGroupId'];
    const _validParams = ['resourceGroupId', 'limit', 'start', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'resource_group_id': _params.resourceGroupId,
      'limit': _params.limit,
      'start': _params.start,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'listToolchains');

    const parameters = {
      options: {
        url: '/toolchains',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a toolchain.
   *
   * Creates a new toolchain based off the provided parameters in the body.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Toolchain name.
   * @param {string} params.resourceGroupId - Resource group where toolchain will be created.
   * @param {string} [params.description] - Describes the toolchain.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainPost>>}
   */
  public createToolchain(
    params: CdToolchainV2.CreateToolchainParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainPost>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'resourceGroupId'];
    const _validParams = ['name', 'resourceGroupId', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'resource_group_id': _params.resourceGroupId,
      'description': _params.description,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'createToolchain');

    const parameters = {
      options: {
        url: '/toolchains',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a toolchain.
   *
   * Returns data for a single toolchain identified by its ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.toolchainId - ID of the toolchain.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.Toolchain>>}
   */
  public getToolchainById(
    params: CdToolchainV2.GetToolchainByIdParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.Toolchain>> {
    const _params = { ...params };
    const _requiredParams = ['toolchainId'];
    const _validParams = ['toolchainId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'toolchain_id': _params.toolchainId,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'getToolchainById');

    const parameters = {
      options: {
        url: '/toolchains/{toolchain_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a toolchain.
   *
   * Delete the toolchain with the specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.toolchainId - ID of the toolchain.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.EmptyObject>>}
   */
  public deleteToolchain(
    params: CdToolchainV2.DeleteToolchainParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['toolchainId'];
    const _validParams = ['toolchainId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'toolchain_id': _params.toolchainId,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteToolchain');

    const parameters = {
      options: {
        url: '/toolchains/{toolchain_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a toolchain.
   *
   * Update the toolchain with the specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.toolchainId - ID of the toolchain.
   * @param {string} [params.name] - The name of the toolchain.
   * @param {string} [params.description] - An optional description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainPatch>>}
   */
  public updateToolchain(
    params: CdToolchainV2.UpdateToolchainParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainPatch>> {
    const _params = { ...params };
    const _requiredParams = ['toolchainId'];
    const _validParams = ['toolchainId', 'name', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const path = {
      'toolchain_id': _params.toolchainId,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'updateToolchain');

    const parameters = {
      options: {
        url: '/toolchains/{toolchain_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a toolchain event.
   *
   * Creates and sends a custom event to Event Notifications. This requires an Event Notification tool. This method is
   * BETA and subject to change.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.toolchainId - ID of the toolchain to send events from.
   * @param {string} params.title - Event title.
   * @param {string} params.description - Describes the event.
   * @param {string} params.contentType - The content type of the attached data. Supported values are `text/plain`,
   * `application/json`, and `none`.
   * @param {ToolchainEventPrototypeData} [params.data] - Additional data to be added with the event. The format must
   * correspond to the value of `content_type`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainEventPost>>}
   */
  public createToolchainEvent(
    params: CdToolchainV2.CreateToolchainEventParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainEventPost>> {
    const _params = { ...params };
    const _requiredParams = ['toolchainId', 'title', 'description', 'contentType'];
    const _validParams = ['toolchainId', 'title', 'description', 'contentType', 'data', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'title': _params.title,
      'description': _params.description,
      'content_type': _params.contentType,
      'data': _params.data,
    };

    const path = {
      'toolchain_id': _params.toolchainId,
    };

    const sdkHeaders = getSdkHeaders(
      CdToolchainV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createToolchainEvent'
    );

    const parameters = {
      options: {
        url: '/toolchains/{toolchain_id}/events',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * tools
   ************************/

  /**
   * Get a list of tools bound to a toolchain.
   *
   * Returns a list of tools bound to a toolchain that the caller is authorized to access and that meet the provided
   * query parameters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.toolchainId - ID of the toolchain that tools are bound to.
   * @param {number} [params.limit] - Limit the number of results.
   * @param {string} [params.start] - Pagination token.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainToolCollection>>}
   */
  public listTools(
    params: CdToolchainV2.ListToolsParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainToolCollection>> {
    const _params = { ...params };
    const _requiredParams = ['toolchainId'];
    const _validParams = ['toolchainId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'toolchain_id': _params.toolchainId,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'listTools');

    const parameters = {
      options: {
        url: '/toolchains/{toolchain_id}/tools',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a tool.
   *
   * Provisions a new tool based off the provided parameters in the body and binds it to the specified toolchain.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.toolchainId - ID of the toolchain to bind the tool to.
   * @param {string} params.toolTypeId - The unique short name of the tool that should be provisioned. A table of
   * `tool_type_id` values corresponding to each tool integration can be found in the <a
   * href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
   * integrations page</a>.
   * @param {string} [params.name] - Name of the tool.
   * @param {JsonObject} [params.parameters] - Unique key-value pairs representing parameters to be used to create the
   * tool. A list of parameters for each tool integration can be found in the <a
   * href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
   * integrations page</a>.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainToolPost>>}
   */
  public createTool(
    params: CdToolchainV2.CreateToolParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainToolPost>> {
    const _params = { ...params };
    const _requiredParams = ['toolchainId', 'toolTypeId'];
    const _validParams = ['toolchainId', 'toolTypeId', 'name', 'parameters', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'tool_type_id': _params.toolTypeId,
      'name': _params.name,
      'parameters': _params.parameters,
    };

    const path = {
      'toolchain_id': _params.toolchainId,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'createTool');

    const parameters = {
      options: {
        url: '/toolchains/{toolchain_id}/tools',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a tool.
   *
   * Returns a tool that is bound to the provided toolchain.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.toolchainId - ID of the toolchain.
   * @param {string} params.toolId - ID of the tool bound to the toolchain.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainTool>>}
   */
  public getToolById(
    params: CdToolchainV2.GetToolByIdParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainTool>> {
    const _params = { ...params };
    const _requiredParams = ['toolchainId', 'toolId'];
    const _validParams = ['toolchainId', 'toolId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'toolchain_id': _params.toolchainId,
      'tool_id': _params.toolId,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'getToolById');

    const parameters = {
      options: {
        url: '/toolchains/{toolchain_id}/tools/{tool_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a tool.
   *
   * Delete the tool with the specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.toolchainId - ID of the toolchain.
   * @param {string} params.toolId - ID of the tool bound to the toolchain.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.EmptyObject>>}
   */
  public deleteTool(
    params: CdToolchainV2.DeleteToolParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['toolchainId', 'toolId'];
    const _validParams = ['toolchainId', 'toolId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'toolchain_id': _params.toolchainId,
      'tool_id': _params.toolId,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteTool');

    const parameters = {
      options: {
        url: '/toolchains/{toolchain_id}/tools/{tool_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a tool.
   *
   * Update the tool with the specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.toolchainId - ID of the toolchain.
   * @param {string} params.toolId - ID of the tool bound to the toolchain.
   * @param {string} [params.name] - Name of the tool.
   * @param {string} [params.toolTypeId] - The unique short name of the tool that should be provisioned or updated. A
   * table of `tool_type_id` values corresponding to each tool integration can be found in the <a
   * href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
   * integrations page</a>.
   * @param {JsonObject} [params.parameters] - Unique key-value pairs representing parameters to be used to create the
   * tool. A list of parameters for each tool integration can be found in the <a
   * href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
   * integrations page</a>.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainToolPatch>>}
   */
  public updateTool(
    params: CdToolchainV2.UpdateToolParams
  ): Promise<CdToolchainV2.Response<CdToolchainV2.ToolchainToolPatch>> {
    const _params = { ...params };
    const _requiredParams = ['toolchainId', 'toolId'];
    const _validParams = ['toolchainId', 'toolId', 'name', 'toolTypeId', 'parameters', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'tool_type_id': _params.toolTypeId,
      'parameters': _params.parameters,
    };

    const path = {
      'toolchain_id': _params.toolchainId,
      'tool_id': _params.toolId,
    };

    const sdkHeaders = getSdkHeaders(CdToolchainV2.DEFAULT_SERVICE_NAME, 'v2', 'updateTool');

    const parameters = {
      options: {
        url: '/toolchains/{toolchain_id}/tools/{tool_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace CdToolchainV2 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listToolchains` operation. */
  export interface ListToolchainsParams {
    /** The resource group ID where the toolchains exist. */
    resourceGroupId: string;
    /** Limit the number of results. */
    limit?: number;
    /** Pagination token. */
    start?: string;
    /** Exact name of toolchain to look up. This parameter is case sensitive. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createToolchain` operation. */
  export interface CreateToolchainParams {
    /** Toolchain name. */
    name: string;
    /** Resource group where toolchain will be created. */
    resourceGroupId: string;
    /** Describes the toolchain. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getToolchainById` operation. */
  export interface GetToolchainByIdParams {
    /** ID of the toolchain. */
    toolchainId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteToolchain` operation. */
  export interface DeleteToolchainParams {
    /** ID of the toolchain. */
    toolchainId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateToolchain` operation. */
  export interface UpdateToolchainParams {
    /** ID of the toolchain. */
    toolchainId: string;
    /** The name of the toolchain. */
    name?: string;
    /** An optional description. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createToolchainEvent` operation. */
  export interface CreateToolchainEventParams {
    /** ID of the toolchain to send events from. */
    toolchainId: string;
    /** Event title. */
    title: string;
    /** Describes the event. */
    description: string;
    /** The content type of the attached data. Supported values are `text/plain`, `application/json`, and `none`. */
    contentType: CreateToolchainEventConstants.ContentType | string;
    /** Additional data to be added with the event. The format must correspond to the value of `content_type`. */
    data?: ToolchainEventPrototypeData;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createToolchainEvent` operation. */
  export namespace CreateToolchainEventConstants {
    /** The content type of the attached data. Supported values are `text/plain`, `application/json`, and `none`. */
    export enum ContentType {
      APPLICATION_JSON = 'application/json',
      TEXT_PLAIN = 'text/plain',
      NONE = 'none',
    }
  }

  /** Parameters for the `listTools` operation. */
  export interface ListToolsParams {
    /** ID of the toolchain that tools are bound to. */
    toolchainId: string;
    /** Limit the number of results. */
    limit?: number;
    /** Pagination token. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTool` operation. */
  export interface CreateToolParams {
    /** ID of the toolchain to bind the tool to. */
    toolchainId: string;
    /** The unique short name of the tool that should be provisioned. A table of `tool_type_id` values corresponding
     *  to each tool integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    toolTypeId: string;
    /** Name of the tool. */
    name?: string;
    /** Unique key-value pairs representing parameters to be used to create the tool. A list of parameters for each
     *  tool integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    parameters?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getToolById` operation. */
  export interface GetToolByIdParams {
    /** ID of the toolchain. */
    toolchainId: string;
    /** ID of the tool bound to the toolchain. */
    toolId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTool` operation. */
  export interface DeleteToolParams {
    /** ID of the toolchain. */
    toolchainId: string;
    /** ID of the tool bound to the toolchain. */
    toolId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTool` operation. */
  export interface UpdateToolParams {
    /** ID of the toolchain. */
    toolchainId: string;
    /** ID of the tool bound to the toolchain. */
    toolId: string;
    /** Name of the tool. */
    name?: string;
    /** The unique short name of the tool that should be provisioned or updated. A table of `tool_type_id` values
     *  corresponding to each tool integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    toolTypeId?: string;
    /** Unique key-value pairs representing parameters to be used to create the tool. A list of parameters for each
     *  tool integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    parameters?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Model describing tool resource. */
  export interface ToolModel {
    /** Tool ID. */
    id: string;
    /** Resource group where the tool is located. */
    resource_group_id: string;
    /** Tool CRN. */
    crn: string;
    /** The unique name of the provisioned tool. A table of `tool_type_id` values corresponding to each tool
     *  integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    tool_type_id: string;
    /** ID of toolchain which the tool is bound to. */
    toolchain_id: string;
    /** CRN of toolchain which the tool is bound to. */
    toolchain_crn: string;
    /** URI representing the tool. */
    href: string;
    /** Information on URIs to access this resource through the UI or API. */
    referent: ToolModelReferent;
    /** Name of the tool. */
    name?: string;
    /** Latest tool update timestamp. */
    updated_at: string;
    /** Unique key-value pairs representing parameters to be used to create the tool. A list of parameters for each
     *  tool integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    parameters: JsonObject;
    /** Current configuration state of the tool. */
    state: string;
  }

  /** Information on URIs to access this resource through the UI or API. */
  export interface ToolModelReferent {
    /** URI representing this resource through the UI. */
    ui_href?: string;
    /** URI representing this resource through an API. */
    api_href?: string;
  }

  /** Response structure for GET toolchains. */
  export interface Toolchain {
    /** Toolchain ID. */
    id: string;
    /** Toolchain name. */
    name: string;
    /** Describes the toolchain. */
    description: string;
    /** Account ID where toolchain can be found. */
    account_id: string;
    /** Toolchain region. */
    location: string;
    /** Resource group where the toolchain is located. */
    resource_group_id: string;
    /** Toolchain CRN. */
    crn: string;
    /** URI that can be used to retrieve toolchain. */
    href: string;
    /** URL of a user-facing user interface for this toolchain. */
    ui_href: string;
    /** Toolchain creation timestamp. */
    created_at: string;
    /** Latest toolchain update timestamp. */
    updated_at: string;
    /** Identity that created the toolchain. */
    created_by: string;
  }

  /** Response structure for GET toolchains. */
  export interface ToolchainCollection {
    /** Total number of toolchains found in collection. */
    total_count: number;
    /** Maximum number of toolchains returned from collection. */
    limit: number;
    /** Information about retrieving first toolchain results from the collection. */
    first: ToolchainCollectionFirst;
    /** Information about retrieving previous toolchain results from the collection. */
    previous?: ToolchainCollectionPrevious;
    /** Information about retrieving next toolchain results from the collection. */
    next?: ToolchainCollectionNext;
    /** Information about retrieving last toolchain results from the collection. */
    last: ToolchainCollectionLast;
    /** Toolchain results returned from the collection. */
    toolchains?: ToolchainModel[];
  }

  /** Information about retrieving first toolchain results from the collection. */
  export interface ToolchainCollectionFirst {
    /** URI that can be used to get first results from the collection. */
    href: string;
  }

  /** Information about retrieving last toolchain results from the collection. */
  export interface ToolchainCollectionLast {
    /** Cursor that can be set as the 'start' query parameter to get the last set of toolchain collections. */
    start?: string;
    /** URI that can be used to get last results from the collection. */
    href: string;
  }

  /** Information about retrieving next toolchain results from the collection. */
  export interface ToolchainCollectionNext {
    /** Cursor that can be set as the 'start' query parameter to get the next set of toolchain collections. */
    start?: string;
    /** URI that can be used to get next results from the collection. */
    href: string;
  }

  /** Information about retrieving previous toolchain results from the collection. */
  export interface ToolchainCollectionPrevious {
    /** Cursor that can be set as the 'start' query parameter to get the previous set of toolchain collections. */
    start?: string;
    /** URI that can be used to get previous results from the collection. */
    href: string;
  }

  /** Response structure for POST toolchain event. */
  export interface ToolchainEventPost {
    /** Event ID. */
    id: string;
  }

  /** Additional data to be added with the event. The format must correspond to the value of `content_type`. */
  export interface ToolchainEventPrototypeData {
    /** Contains JSON data to be added with the event. `content_type` must be set to `application/json`. */
    application_json?: ToolchainEventPrototypeDataApplicationJson;
    /** Contains text data to be added with the event. `content_type` must be set to `text/plain`. */
    text_plain?: string;
  }

  /** Contains JSON data to be added with the event. `content_type` must be set to `application/json`. */
  export interface ToolchainEventPrototypeDataApplicationJson {
    /** JSON-formatted key-value pairs representing any additional information to be included with the event. */
    content: JsonObject;
  }

  /** Model describing toolchain resource. */
  export interface ToolchainModel {
    /** Toolchain ID. */
    id: string;
    /** Toolchain name. */
    name: string;
    /** Describes the toolchain. */
    description: string;
    /** Account ID where toolchain can be found. */
    account_id: string;
    /** Toolchain region. */
    location: string;
    /** Resource group where the toolchain is located. */
    resource_group_id: string;
    /** Toolchain CRN. */
    crn: string;
    /** URI that can be used to retrieve toolchain. */
    href: string;
    /** URL of a user-facing user interface for this toolchain. */
    ui_href: string;
    /** Toolchain creation timestamp. */
    created_at: string;
    /** Latest toolchain update timestamp. */
    updated_at: string;
    /** Identity that created the toolchain. */
    created_by: string;
  }

  /** Response structure for PATCH toolchain. */
  export interface ToolchainPatch {
    /** Toolchain ID. */
    id: string;
    /** Toolchain name. */
    name: string;
    /** Describes the toolchain. */
    description: string;
    /** Account ID where toolchain can be found. */
    account_id: string;
    /** Toolchain region. */
    location: string;
    /** Resource group where the toolchain is located. */
    resource_group_id: string;
    /** Toolchain CRN. */
    crn: string;
    /** URI that can be used to retrieve toolchain. */
    href: string;
    /** URL of a user-facing user interface for this toolchain. */
    ui_href: string;
    /** Toolchain creation timestamp. */
    created_at: string;
    /** Latest toolchain update timestamp. */
    updated_at: string;
    /** Identity that created the toolchain. */
    created_by: string;
  }

  /** Response structure for POST toolchain. */
  export interface ToolchainPost {
    /** Toolchain ID. */
    id: string;
    /** Toolchain name. */
    name: string;
    /** Describes the toolchain. */
    description: string;
    /** Account ID where toolchain can be found. */
    account_id: string;
    /** Toolchain region. */
    location: string;
    /** Resource group where the toolchain is located. */
    resource_group_id: string;
    /** Toolchain CRN. */
    crn: string;
    /** URI that can be used to retrieve toolchain. */
    href: string;
    /** URL of a user-facing user interface for this toolchain. */
    ui_href: string;
    /** Toolchain creation timestamp. */
    created_at: string;
    /** Latest toolchain update timestamp. */
    updated_at: string;
    /** Identity that created the toolchain. */
    created_by: string;
  }

  /** Response structure for GET tool. */
  export interface ToolchainTool {
    /** Tool ID. */
    id: string;
    /** Resource group where the tool is located. */
    resource_group_id: string;
    /** Tool CRN. */
    crn: string;
    /** The unique name of the provisioned tool. A table of `tool_type_id` values corresponding to each tool
     *  integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    tool_type_id: string;
    /** ID of toolchain which the tool is bound to. */
    toolchain_id: string;
    /** CRN of toolchain which the tool is bound to. */
    toolchain_crn: string;
    /** URI representing the tool. */
    href: string;
    /** Information on URIs to access this resource through the UI or API. */
    referent: ToolModelReferent;
    /** Name of the tool. */
    name?: string;
    /** Latest tool update timestamp. */
    updated_at: string;
    /** Unique key-value pairs representing parameters to be used to create the tool. A list of parameters for each
     *  tool integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    parameters: JsonObject;
    /** Current configuration state of the tool. */
    state: string;
  }

  /** Response structure for GET tools. */
  export interface ToolchainToolCollection {
    /** Maximum number of tools returned from collection. */
    limit: number;
    /** Total number of tools found in collection. */
    total_count: number;
    /** Information about retrieving first tool results from the collection. */
    first: ToolchainToolCollectionFirst;
    /** Information about retrieving previous tool results from the collection. */
    previous?: ToolchainToolCollectionPrevious;
    /** Information about retrieving next tool results from the collection. */
    next?: ToolchainToolCollectionNext;
    /** Information about retrieving last tool results from the collection. */
    last: ToolchainToolCollectionLast;
    /** Tool results returned from the collection. */
    tools: ToolModel[];
  }

  /** Information about retrieving first tool results from the collection. */
  export interface ToolchainToolCollectionFirst {
    /** URI that can be used to get first results from the collection. */
    href: string;
  }

  /** Information about retrieving last tool results from the collection. */
  export interface ToolchainToolCollectionLast {
    /** Cursor that can be used to get the last set of tool collections. */
    start?: string;
    /** URI that can be used to get last results from the collection. */
    href: string;
  }

  /** Information about retrieving next tool results from the collection. */
  export interface ToolchainToolCollectionNext {
    /** Cursor that can be used to get the next set of tool collections. */
    start?: string;
    /** URI that can be used to get next results from the collection. */
    href: string;
  }

  /** Information about retrieving previous tool results from the collection. */
  export interface ToolchainToolCollectionPrevious {
    /** Cursor that can be used to get the previous set of tool collections. */
    start?: string;
    /** URI that can be used to get previous results from the collection. */
    href: string;
  }

  /** Response structure for PATCH tool. */
  export interface ToolchainToolPatch {
    /** Tool ID. */
    id: string;
    /** Resource group where the tool is located. */
    resource_group_id: string;
    /** Tool CRN. */
    crn: string;
    /** The unique name of the provisioned tool. A table of `tool_type_id` values corresponding to each tool
     *  integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    tool_type_id: string;
    /** ID of toolchain which the tool is bound to. */
    toolchain_id: string;
    /** CRN of toolchain which the tool is bound to. */
    toolchain_crn: string;
    /** URI representing the tool. */
    href: string;
    /** Information on URIs to access this resource through the UI or API. */
    referent: ToolModelReferent;
    /** Name of the tool. */
    name?: string;
    /** Latest tool update timestamp. */
    updated_at: string;
    /** Unique key-value pairs representing parameters to be used to create the tool. A list of parameters for each
     *  tool integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    parameters: JsonObject;
    /** Current configuration state of the tool. */
    state: string;
  }

  /** POST tool response body. */
  export interface ToolchainToolPost {
    /** Tool ID. */
    id: string;
    /** Resource group where the tool is located. */
    resource_group_id: string;
    /** Tool CRN. */
    crn: string;
    /** The unique name of the provisioned tool. A table of `tool_type_id` values corresponding to each tool
     *  integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    tool_type_id: string;
    /** ID of toolchain which the tool is bound to. */
    toolchain_id: string;
    /** CRN of toolchain which the tool is bound to. */
    toolchain_crn: string;
    /** URI representing the tool. */
    href: string;
    /** Information on URIs to access this resource through the UI or API. */
    referent: ToolModelReferent;
    /** Name of the tool. */
    name?: string;
    /** Latest tool update timestamp. */
    updated_at: string;
    /** Unique key-value pairs representing parameters to be used to create the tool. A list of parameters for each
     *  tool integration can be found in the <a
     *  href="https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-integrations">Configuring tool
     *  integrations page</a>.
     */
    parameters: JsonObject;
    /** Current configuration state of the tool. */
    state: string;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * ToolchainsPager can be used to simplify the use of listToolchains().
   */
  export class ToolchainsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CdToolchainV2;

    protected params: CdToolchainV2.ListToolchainsParams;

    /**
     * Construct a ToolchainsPager object.
     *
     * @param {CdToolchainV2}  client - The service client instance used to invoke listToolchains()
     * @param {Object} params - The parameters to be passed to listToolchains()
     * @constructor
     * @returns {ToolchainsPager}
     */
    constructor(client: CdToolchainV2, params: CdToolchainV2.ListToolchainsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listToolchains().
     * @returns {Promise<CdToolchainV2.ToolchainModel[]>}
     */
    public async getNext(): Promise<CdToolchainV2.ToolchainModel[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listToolchains(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.toolchains;
    }

    /**
     * Returns all results by invoking listToolchains() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CdToolchainV2.ToolchainModel[]>}
     */
    public async getAll(): Promise<CdToolchainV2.ToolchainModel[]> {
      const results: ToolchainModel[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ToolsPager can be used to simplify the use of listTools().
   */
  export class ToolsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CdToolchainV2;

    protected params: CdToolchainV2.ListToolsParams;

    /**
     * Construct a ToolsPager object.
     *
     * @param {CdToolchainV2}  client - The service client instance used to invoke listTools()
     * @param {Object} params - The parameters to be passed to listTools()
     * @constructor
     * @returns {ToolsPager}
     */
    constructor(client: CdToolchainV2, params: CdToolchainV2.ListToolsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listTools().
     * @returns {Promise<CdToolchainV2.ToolModel[]>}
     */
    public async getNext(): Promise<CdToolchainV2.ToolModel[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listTools(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.tools;
    }

    /**
     * Returns all results by invoking listTools() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CdToolchainV2.ToolModel[]>}
     */
    public async getAll(): Promise<CdToolchainV2.ToolModel[]> {
      const results: ToolModel[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = CdToolchainV2;

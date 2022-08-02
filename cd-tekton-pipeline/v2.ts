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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.53.0-9710cac3-20220713-193508
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';
import { getQueryParam } from 'ibm-cloud-sdk-core';

/**
 * Continuous Delivery Tekton pipeline API definition <br><br> Maximum request payload size is 512 KB <br><br> All calls
 * require an <strong>Authorization</strong> HTTP header. <br><br> The following header is the accepted authentication
 * mechanism and required credentials for each <ul><li><b>Bearer:</b> an IBM Cloud IAM token (authorized for all
 * endpoints)</li>
 *
 * API Version: 2.0.0
 */

class CdTektonPipelineV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.devops.cloud.ibm.com/v2';

  static DEFAULT_SERVICE_NAME: string = 'cd_tekton_pipeline';

  private static _regionalEndpoints = new Map([
    ['us-south', 'https://api.us-south.devops.cloud.ibm.com/v2'], // The host URL for Tekton Pipeline Service in the us-south region.
    ['us-east', 'https://api.us-east.devops.cloud.ibm.com/v2'], // The host URL for Tekton Pipeline Service in the us-east region.
    ['eu-de', 'https://api.eu-de.devops.cloud.ibm.com/v2'], // The host URL for Tekton Pipeline Service in the eu-de region.
    ['eu-gb', 'https://api.eu-gb.devops.cloud.ibm.com/v2'], // The host URL for Tekton Pipeline Service in the eu-gb region.
    ['jp-osa', 'https://api.jp-osa.devops.cloud.ibm.com/v2'], // The host URL for Tekton Pipeline Service in the jp-osa region.
    ['jp-tok', 'https://api.jp-tok.devops.cloud.ibm.com/v2'], // The host URL for Tekton Pipeline Service in the jp-tok region.
    ['au-syd', 'https://api.au-syd.devops.cloud.ibm.com/v2'], // The host URL for Tekton Pipeline Service in the au-syd region.
    ['ca-tor', 'https://api.ca-tor.devops.cloud.ibm.com/v2'], // The host URL for Tekton Pipeline Service in the ca-tor region.
    ['br-sao', 'https://api.br-sao.devops.cloud.ibm.com/v2'], // The host URL for Tekton Pipeline Service in the br-sao region.
  ]);

  /**
   * Returns the service URL associated with the specified region.
   * @param region a string representing the region
   * @returns the service URL associated with the specified region or undefined
   * if no mapping for the region exists
   */
  public static getServiceUrlForRegion(region: string): string {
    return this._regionalEndpoints.get(region)
  }

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of CdTektonPipelineV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {CdTektonPipelineV2}
   */

  public static newInstance(options: UserOptions): CdTektonPipelineV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new CdTektonPipelineV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a CdTektonPipelineV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {CdTektonPipelineV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(CdTektonPipelineV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * pipeline
   ************************/

  /**
   * Create tekton pipeline.
   *
   * This request creates a tekton pipeline for a tekton pipeline toolchain integration, user has to use the toolchain
   * endpoint to create the tekton pipeline toolchain integration first and then use the generated UUID to create the
   * tekton pipeline with or without a specified worker.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.id] - UUID.
   * @param {WorkerWithId} [params.worker] - Worker object with worker ID only.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>>}
   */
  public createTektonPipeline(
    params?: CdTektonPipelineV2.CreateTektonPipelineParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['id', 'worker', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      'worker': _params.worker,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTektonPipeline'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines',
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
   * Get tekton pipeline data.
   *
   * This request retrieves whole tekton pipeline data.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - ID of current instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>>}
   */
  public getTektonPipeline(
    params: CdTektonPipelineV2.GetTektonPipelineParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTektonPipeline'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{id}',
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
   * Update tekton pipeline data.
   *
   * This request updates tekton pipeline data, but you can only change worker ID in this endpoint. Use other endpoints
   * such as /definitions, /triggers, and /properties for detailed updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - ID of current instance.
   * @param {WorkerWithId} [params.worker] - Worker object with worker ID only.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>>}
   */
  public updateTektonPipeline(
    params: CdTektonPipelineV2.UpdateTektonPipelineParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'worker', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'worker': _params.worker,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateTektonPipeline'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{id}',
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
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete tekton pipeline instance.
   *
   * This request deletes tekton pipeline instance that associated with the pipeline toolchain integration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - ID of current instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>>}
   */
  public deleteTektonPipeline(
    params: CdTektonPipelineV2.DeleteTektonPipelineParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTektonPipeline'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * pipelineRuns
   ************************/

  /**
   * List pipeline run records.
   *
   * This request list pipeline run records, which has data of that run, such as status, user_info, trigger and other
   * information. Default limit is 50.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {number} [params.limit] - The number of pipeline runs to return, sorted by creation time, most recent first.
   * @param {number} [params.offset] - Skip the specified number of pipeline runs.
   * @param {string} [params.status] - Filters the collection to resources with the specified status.
   * @param {string} [params.triggerName] - Filters the collection to resources with the specified trigger name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRuns>>}
   */
  public listTektonPipelineRuns(
    params: CdTektonPipelineV2.ListTektonPipelineRunsParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRuns>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'limit', 'offset', 'status', 'triggerName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'offset': _params.offset,
      'status': _params.status,
      'trigger.name': _params.triggerName,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listTektonPipelineRuns'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/pipeline_runs',
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
   * Start a trigger to create a pipelineRun.
   *
   * This request executes a trigger to create a pipelineRun.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} [params.triggerName] - Trigger name.
   * @param {JsonObject} [params.triggerProperties] - A valid single dictionary object containing string values only to
   * provide extra TEXT trigger properties or override defined TEXT type trigger properties.
   * @param {JsonObject} [params.secureTriggerProperties] - A valid single dictionary object containing string values
   * only to provide extra SECURE type trigger properties or override defined SECURE type trigger properties.
   * @param {JsonObject} [params.triggerHeader] - A valid single dictionary object with only string values to provide
   * header, use $(header.header_key_name) to access it in triggerBinding.
   * @param {JsonObject} [params.triggerBody] - A valid object to provide body, use $(body.body_key_name) to access it
   * in triggerBinding.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>>}
   */
  public createTektonPipelineRun(
    params: CdTektonPipelineV2.CreateTektonPipelineRunParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'triggerName', 'triggerProperties', 'secureTriggerProperties', 'triggerHeader', 'triggerBody', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'trigger_name': _params.triggerName,
      'trigger_properties': _params.triggerProperties,
      'secure_trigger_properties': _params.secureTriggerProperties,
      'trigger_header': _params.triggerHeader,
      'trigger_body': _params.triggerBody,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTektonPipelineRun'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/pipeline_runs',
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
   * Get a pipeline run record.
   *
   * This request retrieves detail of requested pipeline run, to get Kubernetes Resources List of this pipeline run use
   * endpoint /tekton_pipelines/{pipeline_id}/tekton_pipelinerun_resource_list/{id}.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.id - ID of current instance.
   * @param {string} [params.includes] - Defines if response includes definition metadata.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>>}
   */
  public getTektonPipelineRun(
    params: CdTektonPipelineV2.GetTektonPipelineRunParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'id'];
    const _validParams = ['pipelineId', 'id', 'includes', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'includes': _params.includes,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTektonPipelineRun'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}',
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
   * Delete a pipeline run record.
   *
   * This request deletes the requested pipeline run record.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.id - ID of current instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>>}
   */
  public deleteTektonPipelineRun(
    params: CdTektonPipelineV2.DeleteTektonPipelineRunParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'id'];
    const _validParams = ['pipelineId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTektonPipelineRun'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Cancel a pipeline run.
   *
   * This request cancels a running pipeline run, use 'force' payload in case you can't cancel a pipeline run normally.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.id - ID of current instance.
   * @param {boolean} [params.force] - Flag whether force cancel.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>>}
   */
  public cancelTektonPipelineRun(
    params: CdTektonPipelineV2.CancelTektonPipelineRunParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'id'];
    const _validParams = ['pipelineId', 'id', 'force', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'force': _params.force,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'cancelTektonPipelineRun'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/cancel',
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
   * Rerun a pipeline run.
   *
   * This request reruns a past pipeline run with same data. Request body isn't allowed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.id - ID of current instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>>}
   */
  public rerunTektonPipelineRun(
    params: CdTektonPipelineV2.RerunTektonPipelineRunParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'id'];
    const _validParams = ['pipelineId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'rerunTektonPipelineRun'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/rerun',
        method: 'POST',
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
   * Get a list of pipeline run log IDs.
   *
   * This request fetches list of log IDs of a pipeline run.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.id - ID of current instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRunLogs>>}
   */
  public getTektonPipelineRunLogs(
    params: CdTektonPipelineV2.GetTektonPipelineRunLogsParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRunLogs>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'id'];
    const _validParams = ['pipelineId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTektonPipelineRunLogs'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/logs',
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
   * Get the log content of a pipeline run step by using the step log ID.
   *
   * This request retrieves log content of a pipeline run step, to get the log ID use endpoint
   * /tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/logs.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.pipelineRunId - The tekton pipeline run ID.
   * @param {string} params.id - ID of current instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.StepLog>>}
   */
  public getTektonPipelineRunLogContent(
    params: CdTektonPipelineV2.GetTektonPipelineRunLogContentParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.StepLog>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'pipelineRunId', 'id'];
    const _validParams = ['pipelineId', 'pipelineRunId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'pipeline_run_id': _params.pipelineRunId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTektonPipelineRunLogContent'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/pipeline_runs/{pipeline_run_id}/logs/{id}',
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
  /*************************
   * definitions
   ************************/

  /**
   * List pipeline definitions.
   *
   * This request fetches pipeline definitions, which is the a collection of individual definition entries, each entry
   * is a composition of a repo url, a repo branch and a repo path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definitions>>}
   */
  public listTektonPipelineDefinitions(
    params: CdTektonPipelineV2.ListTektonPipelineDefinitionsParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definitions>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listTektonPipelineDefinitions'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/definitions',
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
   * Create a single definition.
   *
   * This request adds a single definition.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {DefinitionScmSource} [params.scmSource] - Scm source for tekton pipeline defintion.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>>}
   */
  public createTektonPipelineDefinition(
    params: CdTektonPipelineV2.CreateTektonPipelineDefinitionParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'scmSource', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'scm_source': _params.scmSource,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTektonPipelineDefinition'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/definitions',
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
   * Retrieve a single definition entry.
   *
   * This request fetches a single definition entry, which is a composition of the definition repo's url, branch and
   * directory path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.definitionId - The definition ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>>}
   */
  public getTektonPipelineDefinition(
    params: CdTektonPipelineV2.GetTektonPipelineDefinitionParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'definitionId'];
    const _validParams = ['pipelineId', 'definitionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'definition_id': _params.definitionId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTektonPipelineDefinition'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/definitions/{definition_id}',
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
   * Edit a single definition entry.
   *
   * This request replaces a single definition's repo directory path or repo branch. Its scm_source.url and
   * service_instance_id are immutable.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.definitionId - The definition ID.
   * @param {DefinitionScmSource} [params.scmSource] - Scm source for tekton pipeline defintion.
   * @param {string} [params.serviceInstanceId] - UUID.
   * @param {string} [params.id] - UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>>}
   */
  public replaceTektonPipelineDefinition(
    params: CdTektonPipelineV2.ReplaceTektonPipelineDefinitionParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'definitionId'];
    const _validParams = ['pipelineId', 'definitionId', 'scmSource', 'serviceInstanceId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'scm_source': _params.scmSource,
      'service_instance_id': _params.serviceInstanceId,
      'id': _params.id,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
      'definition_id': _params.definitionId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceTektonPipelineDefinition'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/definitions/{definition_id}',
        method: 'PUT',
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
   * Delete a single definition entry.
   *
   * This request deletes a single definition from definition list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.definitionId - The definition ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>>}
   */
  public deleteTektonPipelineDefinition(
    params: CdTektonPipelineV2.DeleteTektonPipelineDefinitionParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'definitionId'];
    const _validParams = ['pipelineId', 'definitionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'definition_id': _params.definitionId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTektonPipelineDefinition'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/definitions/{definition_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * environmentProperties
   ************************/

  /**
   * List pipeline environment properties.
   *
   * This request lists the pipeline environment properties which every pipelineRun execution has access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} [params.name] - Filters the collection to resources with the specified property name.
   * @param {string[]} [params.type] - Filters the collection to resources with the specified property type.
   * @param {string} [params.sort] - Sorts the returned properties by a property field, for properties you can sort them
   * alphabetically by "name" in ascending order or with "-name" in descending order.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.EnvProperties>>}
   */
  public listTektonPipelineProperties(
    params: CdTektonPipelineV2.ListTektonPipelinePropertiesParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.EnvProperties>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'name', 'type', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'name': _params.name,
      'type': _params.type,
      'sort': _params.sort,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listTektonPipelineProperties'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/properties',
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
   * Create pipeline environment property.
   *
   * This request creates a single pipeline environment property.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} [params.name] - Property name.
   * @param {string} [params.type] - Property type.
   * @param {string} [params.value] - String format property value.
   * @param {string[]} [params._enum] - Options for SINGLE_SELECT property type.
   * @param {string} [params._default] - Default option for SINGLE_SELECT property type.
   * @param {string} [params.path] - property path for INTEGRATION type properties.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>>}
   */
  public createTektonPipelineProperties(
    params: CdTektonPipelineV2.CreateTektonPipelinePropertiesParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'name', 'type', 'value', '_enum', '_default', 'path', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'value': _params.value,
      'enum': _params._enum,
      'default': _params._default,
      'path': _params.path,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTektonPipelineProperties'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/properties',
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
   * Get a single pipeline environment property.
   *
   * This request gets a single pipeline environment property data.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.propertyName - The property's name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>>}
   */
  public getTektonPipelineProperty(
    params: CdTektonPipelineV2.GetTektonPipelinePropertyParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'propertyName'];
    const _validParams = ['pipelineId', 'propertyName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'property_name': _params.propertyName,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTektonPipelineProperty'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/properties/{property_name}',
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
   * Replace a single pipeline environment property value.
   *
   * This request updates a single pipeline environment property value, its type or name are immutable. For any property
   * type, the entered value replaces the existing value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.propertyName - The property's name.
   * @param {string} [params.name] - Property name.
   * @param {string} [params.type] - Property type.
   * @param {string} [params.value] - String format property value.
   * @param {string[]} [params._enum] - Options for SINGLE_SELECT property type.
   * @param {string} [params._default] - Default option for SINGLE_SELECT property type.
   * @param {string} [params.path] - property path for INTEGRATION type properties.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>>}
   */
  public replaceTektonPipelineProperty(
    params: CdTektonPipelineV2.ReplaceTektonPipelinePropertyParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'propertyName'];
    const _validParams = ['pipelineId', 'propertyName', 'name', 'type', 'value', '_enum', '_default', 'path', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'value': _params.value,
      'enum': _params._enum,
      'default': _params._default,
      'path': _params.path,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
      'property_name': _params.propertyName,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceTektonPipelineProperty'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/properties/{property_name}',
        method: 'PUT',
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
   * Delete a single pipeline environment property.
   *
   * This request deletes a single pipeline environment property.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.propertyName - The property's name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>>}
   */
  public deleteTektonPipelineProperty(
    params: CdTektonPipelineV2.DeleteTektonPipelinePropertyParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'propertyName'];
    const _validParams = ['pipelineId', 'propertyName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'property_name': _params.propertyName,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTektonPipelineProperty'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/properties/{property_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * triggers
   ************************/

  /**
   * List pipeline triggers.
   *
   * This request lists pipeline triggers.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} [params.type] - filter the triggers by trigger "type", possible values are "manual", "scm",
   * "generic", "timer".
   * @param {string} [params.name] - filter the triggers by trigger "name", accept single string value.
   * @param {string} [params.eventListener] - filter the triggers by trigger "event_listener", accept single string
   * value.
   * @param {string} [params.workerId] - filter the triggers by trigger "worker.id", accept single string value.
   * @param {string} [params.workerName] - filter the triggers by trigger "worker.name", accept single string value.
   * @param {string} [params.disabled] - filter the triggers by trigger "disabled" flag, possbile state are "true" and
   * "false".
   * @param {string} [params.tags] - filter the triggers by trigger "tags", the response lists triggers if it has one
   * matching tag.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Triggers>>}
   */
  public listTektonPipelineTriggers(
    params: CdTektonPipelineV2.ListTektonPipelineTriggersParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Triggers>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'type', 'name', 'eventListener', 'workerId', 'workerName', 'disabled', 'tags', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'type': _params.type,
      'name': _params.name,
      'event_listener': _params.eventListener,
      'worker.id': _params.workerId,
      'worker.name': _params.workerName,
      'disabled': _params.disabled,
      'tags': _params.tags,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listTektonPipelineTriggers'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers',
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
   * Create a trigger or duplicate a trigger.
   *
   * This request creates a trigger or duplicate a trigger from an existing trigger.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {Trigger} [params.trigger] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>>}
   */
  public createTektonPipelineTrigger(
    params: CdTektonPipelineV2.CreateTektonPipelineTriggerParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'trigger', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.trigger;
    const path = {
      'pipeline_id': _params.pipelineId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTektonPipelineTrigger'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers',
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
   * Get a single trigger.
   *
   * This request retrieves a single trigger detail.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>>}
   */
  public getTektonPipelineTrigger(
    params: CdTektonPipelineV2.GetTektonPipelineTriggerParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId'];
    const _validParams = ['pipelineId', 'triggerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'trigger_id': _params.triggerId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTektonPipelineTrigger'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}',
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
   * Edit a single trigger entry.
   *
   * This request changes a single field or many fields of a trigger, note that some fields are immutable, and use
   * /properties to update trigger properties.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} [params.type] - Trigger type.
   * @param {string} [params.name] - Trigger name.
   * @param {string} [params.eventListener] - Event listener name.
   * @param {string[]} [params.tags] - Trigger tags array.
   * @param {Worker} [params.worker] - Trigger worker used to run the trigger, the trigger worker overrides the default
   * pipeline worker.
   * @param {Concurrency} [params.concurrency] - Concurrency object.
   * @param {boolean} [params.disabled] - Defines if this trigger is disabled.
   * @param {GenericSecret} [params.secret] - Needed only for generic trigger type. Secret used to start generic
   * trigger.
   * @param {string} [params.cron] - Needed only for timer trigger type. Cron expression for timer trigger.
   * @param {string} [params.timezone] - Needed only for timer trigger type. Timezones for timer trigger.
   * @param {TriggerScmSource} [params.scmSource] - Scm source for git type tekton pipeline trigger.
   * @param {Events} [params.events] - Needed only for git trigger type. Events object defines the events this git
   * trigger listening to.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>>}
   */
  public updateTektonPipelineTrigger(
    params: CdTektonPipelineV2.UpdateTektonPipelineTriggerParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId'];
    const _validParams = ['pipelineId', 'triggerId', 'type', 'name', 'eventListener', 'tags', 'worker', 'concurrency', 'disabled', 'secret', 'cron', 'timezone', 'scmSource', 'events', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'name': _params.name,
      'event_listener': _params.eventListener,
      'tags': _params.tags,
      'worker': _params.worker,
      'concurrency': _params.concurrency,
      'disabled': _params.disabled,
      'secret': _params.secret,
      'cron': _params.cron,
      'timezone': _params.timezone,
      'scm_source': _params.scmSource,
      'events': _params.events,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
      'trigger_id': _params.triggerId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateTektonPipelineTrigger'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}',
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
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a single trigger.
   *
   * This request deletes a single trigger.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>>}
   */
  public deleteTektonPipelineTrigger(
    params: CdTektonPipelineV2.DeleteTektonPipelineTriggerParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId'];
    const _validParams = ['pipelineId', 'triggerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'trigger_id': _params.triggerId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTektonPipelineTrigger'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * triggerProperties
   ************************/

  /**
   * List trigger environment properties.
   *
   * This request lists trigger environment properties.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} params.name - filter properties by the name of property.
   * @param {string} params.type - filter properties by the type of property, avaialble types are
   * "SECURE","TEXT","INTEGRATION","SINGLE_SELECT","APPCONFIG".
   * @param {string} params.sort - sort properties by the a property field, for properties you can only sort them by
   * "name" or "-name".
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperties>>}
   */
  public listTektonPipelineTriggerProperties(
    params: CdTektonPipelineV2.ListTektonPipelineTriggerPropertiesParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperties>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId', 'name', 'type', 'sort'];
    const _validParams = ['pipelineId', 'triggerId', 'name', 'type', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'name': _params.name,
      'type': _params.type,
      'sort': _params.sort,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
      'trigger_id': _params.triggerId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listTektonPipelineTriggerProperties'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties',
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
   * Create trigger's environment property.
   *
   * This request creates a trigger's property.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} [params.name] - Property name.
   * @param {string} [params.type] - Property type.
   * @param {string} [params.value] - String format property value.
   * @param {string[]} [params._enum] - Options for SINGLE_SELECT property type.
   * @param {string} [params._default] - Default option for SINGLE_SELECT property type.
   * @param {string} [params.path] - property path for INTEGRATION type properties.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>>}
   */
  public createTektonPipelineTriggerProperties(
    params: CdTektonPipelineV2.CreateTektonPipelineTriggerPropertiesParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId'];
    const _validParams = ['pipelineId', 'triggerId', 'name', 'type', 'value', '_enum', '_default', 'path', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'value': _params.value,
      'enum': _params._enum,
      'default': _params._default,
      'path': _params.path,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
      'trigger_id': _params.triggerId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTektonPipelineTriggerProperties'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties',
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
   * Get a trigger's environment property.
   *
   * This request retrieves a trigger's environment property.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} params.propertyName - The property's name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>>}
   */
  public getTektonPipelineTriggerProperty(
    params: CdTektonPipelineV2.GetTektonPipelineTriggerPropertyParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId', 'propertyName'];
    const _validParams = ['pipelineId', 'triggerId', 'propertyName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'trigger_id': _params.triggerId,
      'property_name': _params.propertyName,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTektonPipelineTriggerProperty'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties/{property_name}',
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
   * Replace a trigger's environment property value.
   *
   * This request updates a trigger's environment property value, its type or name are immutable. For any property type,
   * the entered value replaces the existing value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} params.propertyName - The property's name.
   * @param {string} [params.name] - Property name.
   * @param {string} [params.type] - Property type.
   * @param {string} [params.value] - String format property value.
   * @param {string[]} [params._enum] - Options for SINGLE_SELECT property type.
   * @param {string} [params._default] - Default option for SINGLE_SELECT property type.
   * @param {string} [params.path] - property path for INTEGRATION type properties.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>>}
   */
  public replaceTektonPipelineTriggerProperty(
    params: CdTektonPipelineV2.ReplaceTektonPipelineTriggerPropertyParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId', 'propertyName'];
    const _validParams = ['pipelineId', 'triggerId', 'propertyName', 'name', 'type', 'value', '_enum', '_default', 'path', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'value': _params.value,
      'enum': _params._enum,
      'default': _params._default,
      'path': _params.path,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
      'trigger_id': _params.triggerId,
      'property_name': _params.propertyName,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceTektonPipelineTriggerProperty'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties/{property_name}',
        method: 'PUT',
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
   * Delete a trigger's property.
   *
   * this request deletes a trigger's property.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} params.propertyName - The property's name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>>}
   */
  public deleteTektonPipelineTriggerProperty(
    params: CdTektonPipelineV2.DeleteTektonPipelineTriggerPropertyParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId', 'propertyName'];
    const _validParams = ['pipelineId', 'triggerId', 'propertyName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'pipeline_id': _params.pipelineId,
      'trigger_id': _params.triggerId,
      'property_name': _params.propertyName,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTektonPipelineTriggerProperty'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers/{trigger_id}/properties/{property_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
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

namespace CdTektonPipelineV2 {
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
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `createTektonPipeline` operation. */
  export interface CreateTektonPipelineParams {
    /** UUID. */
    id?: string;
    /** Worker object with worker ID only. */
    worker?: WorkerWithId;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipeline` operation. */
  export interface GetTektonPipelineParams {
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTektonPipeline` operation. */
  export interface UpdateTektonPipelineParams {
    /** ID of current instance. */
    id: string;
    /** Worker object with worker ID only. */
    worker?: WorkerWithId;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTektonPipeline` operation. */
  export interface DeleteTektonPipelineParams {
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTektonPipelineRuns` operation. */
  export interface ListTektonPipelineRunsParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The number of pipeline runs to return, sorted by creation time, most recent first. */
    limit?: number;
    /** Skip the specified number of pipeline runs. */
    offset?: number;
    /** Filters the collection to resources with the specified status. */
    status?: ListTektonPipelineRunsConstants.Status | string;
    /** Filters the collection to resources with the specified trigger name. */
    triggerName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listTektonPipelineRuns` operation. */
  export namespace ListTektonPipelineRunsConstants {
    /** Filters the collection to resources with the specified status. */
    export enum Status {
      PENDING = 'pending',
      WAITING = 'waiting',
      QUEUED = 'queued',
      RUNNING = 'running',
      CANCELLED = 'cancelled',
      CANCELLING = 'cancelling',
      FAILED = 'failed',
      ERROR = 'error',
      SUCCEEDED = 'succeeded',
    }
  }

  /** Parameters for the `createTektonPipelineRun` operation. */
  export interface CreateTektonPipelineRunParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** Trigger name. */
    triggerName?: string;
    /** A valid single dictionary object containing string values only to provide extra TEXT trigger properties or
     *  override defined TEXT type trigger properties.
     */
    triggerProperties?: JsonObject;
    /** A valid single dictionary object containing string values only to provide extra SECURE type trigger
     *  properties or override defined SECURE type trigger properties.
     */
    secureTriggerProperties?: JsonObject;
    /** A valid single dictionary object with only string values to provide header, use $(header.header_key_name) to
     *  access it in triggerBinding.
     */
    triggerHeader?: JsonObject;
    /** A valid object to provide body, use $(body.body_key_name) to access it in triggerBinding. */
    triggerBody?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipelineRun` operation. */
  export interface GetTektonPipelineRunParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** ID of current instance. */
    id: string;
    /** Defines if response includes definition metadata. */
    includes?: GetTektonPipelineRunConstants.Includes | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getTektonPipelineRun` operation. */
  export namespace GetTektonPipelineRunConstants {
    /** Defines if response includes definition metadata. */
    export enum Includes {
      DEFINITIONS = 'definitions',
    }
  }

  /** Parameters for the `deleteTektonPipelineRun` operation. */
  export interface DeleteTektonPipelineRunParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `cancelTektonPipelineRun` operation. */
  export interface CancelTektonPipelineRunParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** ID of current instance. */
    id: string;
    /** Flag whether force cancel. */
    force?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `rerunTektonPipelineRun` operation. */
  export interface RerunTektonPipelineRunParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipelineRunLogs` operation. */
  export interface GetTektonPipelineRunLogsParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipelineRunLogContent` operation. */
  export interface GetTektonPipelineRunLogContentParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The tekton pipeline run ID. */
    pipelineRunId: string;
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTektonPipelineDefinitions` operation. */
  export interface ListTektonPipelineDefinitionsParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTektonPipelineDefinition` operation. */
  export interface CreateTektonPipelineDefinitionParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** Scm source for tekton pipeline defintion. */
    scmSource?: DefinitionScmSource;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipelineDefinition` operation. */
  export interface GetTektonPipelineDefinitionParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The definition ID. */
    definitionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceTektonPipelineDefinition` operation. */
  export interface ReplaceTektonPipelineDefinitionParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The definition ID. */
    definitionId: string;
    /** Scm source for tekton pipeline defintion. */
    scmSource?: DefinitionScmSource;
    /** UUID. */
    serviceInstanceId?: string;
    /** UUID. */
    id?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTektonPipelineDefinition` operation. */
  export interface DeleteTektonPipelineDefinitionParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The definition ID. */
    definitionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTektonPipelineProperties` operation. */
  export interface ListTektonPipelinePropertiesParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** Filters the collection to resources with the specified property name. */
    name?: string;
    /** Filters the collection to resources with the specified property type. */
    type?: ListTektonPipelinePropertiesConstants.Type[] | string[];
    /** Sorts the returned properties by a property field, for properties you can sort them alphabetically by "name"
     *  in ascending order or with "-name" in descending order.
     */
    sort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listTektonPipelineProperties` operation. */
  export namespace ListTektonPipelinePropertiesConstants {
    /** Filters the collection to resources with the specified property type. */
    export enum Type {
      SECURE = 'SECURE',
      TEXT = 'TEXT',
      INTEGRATION = 'INTEGRATION',
      SINGLE_SELECT = 'SINGLE_SELECT',
      APPCONFIG = 'APPCONFIG',
    }
  }

  /** Parameters for the `createTektonPipelineProperties` operation. */
  export interface CreateTektonPipelinePropertiesParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** Property name. */
    name?: string;
    /** Property type. */
    type?: CreateTektonPipelinePropertiesConstants.Type | string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    _enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    _default?: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createTektonPipelineProperties` operation. */
  export namespace CreateTektonPipelinePropertiesConstants {
    /** Property type. */
    export enum Type {
      SECURE = 'SECURE',
      TEXT = 'TEXT',
      INTEGRATION = 'INTEGRATION',
      SINGLE_SELECT = 'SINGLE_SELECT',
      APPCONFIG = 'APPCONFIG',
    }
  }

  /** Parameters for the `getTektonPipelineProperty` operation. */
  export interface GetTektonPipelinePropertyParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The property's name. */
    propertyName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceTektonPipelineProperty` operation. */
  export interface ReplaceTektonPipelinePropertyParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The property's name. */
    propertyName: string;
    /** Property name. */
    name?: string;
    /** Property type. */
    type?: ReplaceTektonPipelinePropertyConstants.Type | string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    _enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    _default?: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceTektonPipelineProperty` operation. */
  export namespace ReplaceTektonPipelinePropertyConstants {
    /** Property type. */
    export enum Type {
      SECURE = 'SECURE',
      TEXT = 'TEXT',
      INTEGRATION = 'INTEGRATION',
      SINGLE_SELECT = 'SINGLE_SELECT',
      APPCONFIG = 'APPCONFIG',
    }
  }

  /** Parameters for the `deleteTektonPipelineProperty` operation. */
  export interface DeleteTektonPipelinePropertyParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The property's name. */
    propertyName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTektonPipelineTriggers` operation. */
  export interface ListTektonPipelineTriggersParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** filter the triggers by trigger "type", possible values are "manual", "scm", "generic", "timer". */
    type?: string;
    /** filter the triggers by trigger "name", accept single string value. */
    name?: string;
    /** filter the triggers by trigger "event_listener", accept single string value. */
    eventListener?: string;
    /** filter the triggers by trigger "worker.id", accept single string value. */
    workerId?: string;
    /** filter the triggers by trigger "worker.name", accept single string value. */
    workerName?: string;
    /** filter the triggers by trigger "disabled" flag, possbile state are "true" and "false". */
    disabled?: string;
    /** filter the triggers by trigger "tags", the response lists triggers if it has one matching tag. */
    tags?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTektonPipelineTrigger` operation. */
  export interface CreateTektonPipelineTriggerParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    trigger?: Trigger;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipelineTrigger` operation. */
  export interface GetTektonPipelineTriggerParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTektonPipelineTrigger` operation. */
  export interface UpdateTektonPipelineTriggerParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** Trigger type. */
    type?: UpdateTektonPipelineTriggerConstants.Type | string;
    /** Trigger name. */
    name?: string;
    /** Event listener name. */
    eventListener?: string;
    /** Trigger tags array. */
    tags?: string[];
    /** Trigger worker used to run the trigger, the trigger worker overrides the default pipeline worker. */
    worker?: Worker;
    /** Concurrency object. */
    concurrency?: Concurrency;
    /** Defines if this trigger is disabled. */
    disabled?: boolean;
    /** Needed only for generic trigger type. Secret used to start generic trigger. */
    secret?: GenericSecret;
    /** Needed only for timer trigger type. Cron expression for timer trigger. */
    cron?: string;
    /** Needed only for timer trigger type. Timezones for timer trigger. */
    timezone?: string;
    /** Scm source for git type tekton pipeline trigger. */
    scmSource?: TriggerScmSource;
    /** Needed only for git trigger type. Events object defines the events this git trigger listening to. */
    events?: Events;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateTektonPipelineTrigger` operation. */
  export namespace UpdateTektonPipelineTriggerConstants {
    /** Trigger type. */
    export enum Type {
      MANUAL = 'manual',
      SCM = 'scm',
      TIMER = 'timer',
      GENERIC = 'generic',
    }
  }

  /** Parameters for the `deleteTektonPipelineTrigger` operation. */
  export interface DeleteTektonPipelineTriggerParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTektonPipelineTriggerProperties` operation. */
  export interface ListTektonPipelineTriggerPropertiesParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** filter properties by the name of property. */
    name: string;
    /** filter properties by the type of property, avaialble types are
     *  "SECURE","TEXT","INTEGRATION","SINGLE_SELECT","APPCONFIG".
     */
    type: string;
    /** sort properties by the a property field, for properties you can only sort them by "name" or "-name". */
    sort: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTektonPipelineTriggerProperties` operation. */
  export interface CreateTektonPipelineTriggerPropertiesParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** Property name. */
    name?: string;
    /** Property type. */
    type?: CreateTektonPipelineTriggerPropertiesConstants.Type | string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    _enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    _default?: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createTektonPipelineTriggerProperties` operation. */
  export namespace CreateTektonPipelineTriggerPropertiesConstants {
    /** Property type. */
    export enum Type {
      SECURE = 'SECURE',
      TEXT = 'TEXT',
      INTEGRATION = 'INTEGRATION',
      SINGLE_SELECT = 'SINGLE_SELECT',
      APPCONFIG = 'APPCONFIG',
    }
  }

  /** Parameters for the `getTektonPipelineTriggerProperty` operation. */
  export interface GetTektonPipelineTriggerPropertyParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** The property's name. */
    propertyName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceTektonPipelineTriggerProperty` operation. */
  export interface ReplaceTektonPipelineTriggerPropertyParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** The property's name. */
    propertyName: string;
    /** Property name. */
    name?: string;
    /** Property type. */
    type?: ReplaceTektonPipelineTriggerPropertyConstants.Type | string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    _enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    _default?: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceTektonPipelineTriggerProperty` operation. */
  export namespace ReplaceTektonPipelineTriggerPropertyConstants {
    /** Property type. */
    export enum Type {
      SECURE = 'SECURE',
      TEXT = 'TEXT',
      INTEGRATION = 'INTEGRATION',
      SINGLE_SELECT = 'SINGLE_SELECT',
      APPCONFIG = 'APPCONFIG',
    }
  }

  /** Parameters for the `deleteTektonPipelineTriggerProperty` operation. */
  export interface DeleteTektonPipelineTriggerPropertyParams {
    /** The tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** The property's name. */
    propertyName: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Concurrency object. */
  export interface Concurrency {
    /** Defines the maximum number of concurrent runs for this trigger. */
    max_concurrent_runs?: number;
  }

  /** Tekton pipeline definition entry object. */
  export interface Definition {
    /** Scm source for tekton pipeline defintion. */
    scm_source: DefinitionScmSource;
    /** UUID. */
    service_instance_id: string;
    /** UUID. */
    id?: string;
  }

  /** Scm source for tekton pipeline defintion. */
  export interface DefinitionScmSource {
    /** General href URL. */
    url: string;
    /** A branch of the repo, branch field doesn't coexist with tag field. */
    branch?: string;
    /** A tag of the repo. */
    tag?: string;
    /** The path to the definitions yaml files. */
    path: string;
  }

  /** Pipeline definitions is a collection of individual definition entries, each entry is a composition of a repo url, repo branch/tag and a certain directory path. */
  export interface Definitions {
    /** Definition list. */
    definitions: DefinitionsDefinitionsItem[];
  }

  /** Tekton pipeline definition entry object. */
  export interface DefinitionsDefinitionsItem {
    /** Scm source for tekton pipeline defintion. */
    scm_source: DefinitionScmSource;
    /** UUID. */
    service_instance_id: string;
    /** UUID. */
    id?: string;
    /** General href URL. */
    href?: string;
  }

  /** Pipeline properties object. */
  export interface EnvProperties {
    /** Pipeline properties list. */
    properties: Property[];
  }

  /** Needed only for git trigger type. Events object defines the events this git trigger listening to. */
  export interface Events {
    /** If true, the trigger starts when tekton pipeline service receive a repo's 'push' git webhook event. */
    push?: boolean;
    /** If true, the trigger starts when tekton pipeline service receive a repo pull reqeust's 'close' git webhook
     *  event.
     */
    pull_request_closed?: boolean;
    /** If true, the trigger starts when tekton pipeline service receive a repo pull reqeust's 'open' or 'update'
     *  git webhook event.
     */
    pull_request?: boolean;
  }

  /** Needed only for generic trigger type. Secret used to start generic trigger. */
  export interface GenericSecret {
    /** Secret type. */
    type?: string;
    /** Secret value, not needed if secret type is "internalValidation". */
    value?: string;
    /** Secret location, not needed if secret type is "internalValidation". */
    source?: string;
    /** Secret name, not needed if type is "internalValidation". */
    key_name?: string;
    /** Algorithm used for "digestMatches" secret type. */
    algorithm?: string;
  }

  /** Single tekton pipeline run object. */
  export interface PipelineRun {
    /** UUID. */
    id: string;
    /** User information. */
    user_info?: UserInfo;
    /** Status of the pipeline run. */
    status: string;
    /** The aggregated definition ID used for this pipelineRun. */
    definition_id: string;
    /** worker details used in this pipelineRun. */
    worker: PipelineRunWorker;
    /** UUID. */
    pipeline_id: string;
    /** Listener name used to start the run. */
    listener_name: string;
    /** Tekton pipeline trigger object. */
    trigger: Trigger;
    /** Event parameters object passed to this pipeline run in String format, the contents depends on the type of
     *  trigger, for example, for git trigger it includes the git event payload.
     */
    event_params_blob: string;
    /** Heads passed to this pipeline run in String format, tekton pipeline service can't control the shape of the
     *  contents.
     */
    event_header_params_blob?: string;
    /** Properties used in this tekton pipeline run. */
    properties?: Property[];
    /** Standard RFC 3339 Date Time String. */
    created: string;
    /** Standard RFC 3339 Date Time String. */
    updated?: string;
    /** Dashboard URL for this pipeline run. */
    html_url: string;
  }

  /** Pipeline run logId object. */
  export interface PipelineRunLog {
    /** <podName>/<containerName> of this log. */
    name?: string;
    /** Generated log ID. */
    id?: string;
    /** API for getting log content. */
    href?: string;
  }

  /** List of pipeline run log ID object. */
  export interface PipelineRunLogs {
    logs?: PipelineRunLog[];
  }

  /** worker details used in this pipelineRun. */
  export interface PipelineRunWorker {
    /** Worker name. */
    name?: string;
    /** The agent ID of the corresponding private worker integration used for this pipelineRun. */
    agent?: string;
    /** The Service ID of the corresponding private worker integration used for this pipelineRun. */
    service_id?: string;
    /** UUID. */
    id: string;
  }

  /** Tekton pipeline runs object. */
  export interface PipelineRuns {
    /** Tekton pipeline runs list. */
    pipeline_runs: PipelineRunsPipelineRunsItem[];
    /** Skip a specified number of pipeline runs. */
    offset: number;
    /** The number of pipeline runs to return, sorted by creation time, most recent first. */
    limit: number;
    /** First page of pipeline runs. */
    first: PipelineRunsFirst;
    /** Next page of pipeline runs relative to the offset and limit. */
    next?: PipelineRunsNext;
  }

  /** First page of pipeline runs. */
  export interface PipelineRunsFirst {
    /** General href URL. */
    href: string;
  }

  /** Next page of pipeline runs relative to the offset and limit. */
  export interface PipelineRunsNext {
    /** General href URL. */
    href: string;
  }

  /** Single tekton pipeline run object. */
  export interface PipelineRunsPipelineRunsItem {
    /** UUID. */
    id: string;
    /** User information. */
    user_info?: UserInfo;
    /** Status of the pipeline run. */
    status: string;
    /** The aggregated definition ID used for this pipelineRun. */
    definition_id: string;
    /** worker details used in this pipelineRun. */
    worker: PipelineRunWorker;
    /** UUID. */
    pipeline_id: string;
    /** Listener name used to start the run. */
    listener_name: string;
    /** Tekton pipeline trigger object. */
    trigger: Trigger;
    /** Event parameters object passed to this pipeline run in String format, the contents depends on the type of
     *  trigger, for example, for git trigger it includes the git event payload.
     */
    event_params_blob: string;
    /** Heads passed to this pipeline run in String format, tekton pipeline service can't control the shape of the
     *  contents.
     */
    event_header_params_blob?: string;
    /** Properties used in this tekton pipeline run. */
    properties?: Property[];
    /** Standard RFC 3339 Date Time String. */
    created: string;
    /** Standard RFC 3339 Date Time String. */
    updated?: string;
    /** Dashboard URL for this pipeline run. */
    html_url: string;
    /** General href URL. */
    href?: string;
  }

  /** Property object. */
  export interface Property {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
  }

  /** Log object for tekton pipeline run step. */
  export interface StepLog {
    /** Step log ID. */
    id: string;
    /** The raw log content of step. */
    data: string;
  }

  /** Tekton pipeline object. */
  export interface TektonPipeline {
    /** String. */
    name: string;
    /** Pipeline status. */
    status: string;
    /** ID. */
    resource_group_id: string;
    /** Toolchain object. */
    toolchain: Toolchain;
    /** UUID. */
    id: string;
    /** Definition list. */
    definitions: Definition[];
    /** Tekton pipeline's environment properties. */
    properties: Property[];
    /** Standard RFC 3339 Date Time String. */
    updated_at: string;
    /** Standard RFC 3339 Date Time String. */
    created: string;
    /** Tekton pipeline definition document detail object. If this property is absent, the pipeline has no
     *  definitions added.
     */
    pipeline_definition?: TektonPipelinePipelineDefinition;
    /** Tekton pipeline triggers list. */
    triggers: Trigger[];
    /** Default pipeline worker used to run the pipeline. */
    worker: Worker;
    /** Dashboard URL of this pipeline. */
    html_url: string;
    /** The latest pipeline run build number. If this property is absent, the pipeline hasn't had any pipelineRuns. */
    build_number?: number;
    /** Flag whether this pipeline enabled. */
    enabled: boolean;
  }

  /** Tekton pipeline definition document detail object. If this property is absent, the pipeline has no definitions added. */
  export interface TektonPipelinePipelineDefinition {
    /** The state of pipeline definition status. */
    status?: string;
    /** UUID. */
    id?: string;
  }

  /** Toolchain object. */
  export interface Toolchain {
    /** UUID. */
    id: string;
    /** The CRN for the toolchain that containing the tekton pipeline. */
    crn: string;
  }

  /** Tekton pipeline trigger object. */
  export interface Trigger {
  }

  /** Trigger Property object. */
  export interface TriggerGenericTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    /** General href URL. */
    href?: string;
  }

  /** Trigger Property object. */
  export interface TriggerManualTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    /** General href URL. */
    href?: string;
  }

  /** Trigger properties object. */
  export interface TriggerProperties {
    /** Trigger properties list. */
    properties: TriggerPropertiesPropertiesItem[];
  }

  /** Trigger Property object. */
  export interface TriggerPropertiesPropertiesItem {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    /** General href URL. */
    href?: string;
  }

  /** Trigger Property object. */
  export interface TriggerProperty {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
  }

  /** Scm source for git type tekton pipeline trigger. */
  export interface TriggerScmSource {
    /** Needed only for git trigger type. Repo URL that listening to. */
    url: string;
    /** Needed only for git trigger type. Branch name of the repo. Branch field doesn't coexist with pattern field. */
    branch?: string;
    /** Needed only for git trigger type. Git branch or tag pattern to listen to. Please refer to
     *  https://github.com/micromatch/micromatch for pattern syntax.
     */
    pattern?: string;
    /** Needed only for git trigger type. Branch name of the repo. */
    blind_connection?: boolean;
    /** Webhook ID. */
    hook_id?: string;
  }

  /** Trigger Property object. */
  export interface TriggerScmTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    /** General href URL. */
    href?: string;
  }

  /** Trigger Property object. */
  export interface TriggerTimerTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    /** General href URL. */
    href?: string;
  }

  /** Tekton pipeline triggers object. */
  export interface Triggers {
    /** Tekton pipeline triggers list. */
    triggers: TriggersTriggersItem[];
  }

  /** Tekton pipeline trigger object. */
  export interface TriggersTriggersItem {
    /** General href URL. */
    href?: string;
  }

  /** Trigger Property object. */
  export interface TriggersTriggersItemTriggerGenericTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    /** General href URL. */
    href?: string;
  }

  /** Trigger Property object. */
  export interface TriggersTriggersItemTriggerManualTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    /** General href URL. */
    href?: string;
  }

  /** Trigger Property object. */
  export interface TriggersTriggersItemTriggerScmTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    /** General href URL. */
    href?: string;
  }

  /** Trigger Property object. */
  export interface TriggersTriggersItemTriggerTimerTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** String format property value. */
    value?: string;
    /** Options for SINGLE_SELECT property type. */
    enum?: string[];
    /** Default option for SINGLE_SELECT property type. */
    default?: string;
    /** Property type. */
    type: string;
    /** property path for INTEGRATION type properties. */
    path?: string;
    /** General href URL. */
    href?: string;
  }

  /** User information. */
  export interface UserInfo {
    /** IBM Cloud IAM ID. */
    iam_id: string;
    /** User Email address. */
    sub: string;
  }

  /** Default pipeline worker used to run the pipeline. */
  export interface Worker {
    /** worker name. */
    name?: string;
    /** worker type. */
    type?: string;
    /** Id. */
    id: string;
  }

  /** Worker object with worker ID only. */
  export interface WorkerWithId {
    id: string;
  }

  /** request body to duplicate trigger. */
  export interface TriggerDuplicateTrigger extends Trigger {
    /** source trigger ID to clone from. */
    source_trigger_id: string;
    /** name of the duplicated trigger. */
    name: string;
  }

  /** Generic trigger, which triggers pipeline when tekton pipeline service receive a valie POST event with secrets. */
  export interface TriggerGenericTrigger extends Trigger {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** Event listener name. */
    event_listener: string;
    /** Id. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggerGenericTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Trigger worker used to run the trigger, the trigger worker overrides the default pipeline worker.If not
     *  exist, this trigger uses default pipeline worker.
     */
    worker?: Worker;
    /** Concurrency object. */
    concurrency?: Concurrency;
    /** flag whether the trigger is disabled. */
    disabled: boolean;
    /** Needed only for generic trigger type. Secret used to start generic trigger. */
    secret?: GenericSecret;
  }

  /** Manual trigger. */
  export interface TriggerManualTrigger extends Trigger {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** Event listener name. */
    event_listener: string;
    /** Id. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggerManualTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Trigger worker used to run the trigger, the trigger worker overrides the default pipeline worker.If not
     *  exist, this trigger uses default pipeline worker.
     */
    worker?: Worker;
    /** Concurrency object. */
    concurrency?: Concurrency;
    /** flag whether the trigger is disabled. */
    disabled: boolean;
  }

  /** Git type trigger, which automatically triggers pipelineRun when tekton pipeline service receive a valid corresponding git event. */
  export interface TriggerScmTrigger extends Trigger {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** Event listener name. */
    event_listener: string;
    /** Id. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggerScmTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Trigger worker used to run the trigger, the trigger worker overrides the default pipeline worker.If not
     *  exist, this trigger uses default pipeline worker.
     */
    worker?: Worker;
    /** Concurrency object. */
    concurrency?: Concurrency;
    /** flag whether the trigger is disabled. */
    disabled: boolean;
    /** Scm source for git type tekton pipeline trigger. */
    scm_source?: TriggerScmSource;
    /** Needed only for git trigger type. Events object defines the events this git trigger listening to. */
    events?: Events;
    /** UUID. */
    service_instance_id?: string;
  }

  /** Timer trigger, which triggers pipelineRun according to the cron value and time zone. */
  export interface TriggerTimerTrigger extends Trigger {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** Event listener name. */
    event_listener: string;
    /** Id. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggerTimerTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Trigger worker used to run the trigger, the trigger worker overrides the default pipeline worker.If not
     *  exist, this trigger uses default pipeline worker.
     */
    worker?: Worker;
    /** Concurrency object. */
    concurrency?: Concurrency;
    /** flag whether the trigger is disabled. */
    disabled: boolean;
    /** Needed only for timer trigger type. Cron expression for timer trigger. Maximum frequency is every 5 minutes. */
    cron?: string;
    /** Needed only for timer trigger type. Timezones for timer trigger. */
    timezone?: string;
  }

  /** request body to duplicate trigger. */
  export interface TriggersTriggersItemTriggerDuplicateTrigger extends TriggersTriggersItem {
    /** source trigger ID to clone from. */
    source_trigger_id: string;
    /** name of the duplicated trigger. */
    name: string;
  }

  /** Generic trigger, which triggers pipeline when tekton pipeline service receive a valie POST event with secrets. */
  export interface TriggersTriggersItemTriggerGenericTrigger extends TriggersTriggersItem {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** Event listener name. */
    event_listener: string;
    /** Id. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggersTriggersItemTriggerGenericTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Trigger worker used to run the trigger, the trigger worker overrides the default pipeline worker.If not
     *  exist, this trigger uses default pipeline worker.
     */
    worker?: Worker;
    /** Concurrency object. */
    concurrency?: Concurrency;
    /** flag whether the trigger is disabled. */
    disabled: boolean;
    /** Needed only for generic trigger type. Secret used to start generic trigger. */
    secret?: GenericSecret;
  }

  /** Manual trigger. */
  export interface TriggersTriggersItemTriggerManualTrigger extends TriggersTriggersItem {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** Event listener name. */
    event_listener: string;
    /** Id. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggersTriggersItemTriggerManualTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Trigger worker used to run the trigger, the trigger worker overrides the default pipeline worker.If not
     *  exist, this trigger uses default pipeline worker.
     */
    worker?: Worker;
    /** Concurrency object. */
    concurrency?: Concurrency;
    /** flag whether the trigger is disabled. */
    disabled: boolean;
  }

  /** Git type trigger, which automatically triggers pipelineRun when tekton pipeline service receive a valid corresponding git event. */
  export interface TriggersTriggersItemTriggerScmTrigger extends TriggersTriggersItem {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** Event listener name. */
    event_listener: string;
    /** Id. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggersTriggersItemTriggerScmTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Trigger worker used to run the trigger, the trigger worker overrides the default pipeline worker.If not
     *  exist, this trigger uses default pipeline worker.
     */
    worker?: Worker;
    /** Concurrency object. */
    concurrency?: Concurrency;
    /** flag whether the trigger is disabled. */
    disabled: boolean;
    /** Scm source for git type tekton pipeline trigger. */
    scm_source?: TriggerScmSource;
    /** Needed only for git trigger type. Events object defines the events this git trigger listening to. */
    events?: Events;
    /** UUID. */
    service_instance_id?: string;
  }

  /** Timer trigger, which triggers pipelineRun according to the cron value and time zone. */
  export interface TriggersTriggersItemTriggerTimerTrigger extends TriggersTriggersItem {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** Event listener name. */
    event_listener: string;
    /** Id. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggersTriggersItemTriggerTimerTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Trigger worker used to run the trigger, the trigger worker overrides the default pipeline worker.If not
     *  exist, this trigger uses default pipeline worker.
     */
    worker?: Worker;
    /** Concurrency object. */
    concurrency?: Concurrency;
    /** flag whether the trigger is disabled. */
    disabled: boolean;
    /** Needed only for timer trigger type. Cron expression for timer trigger. Maximum frequency is every 5 minutes. */
    cron?: string;
    /** Needed only for timer trigger type. Timezones for timer trigger. */
    timezone?: string;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * TektonPipelineRunsPager can be used to simplify the use of listTektonPipelineRuns().
   */
  export class TektonPipelineRunsPager {
    protected _hasNext: boolean;
    protected pageContext: any;

    protected client: CdTektonPipelineV2;

    protected params: CdTektonPipelineV2.ListTektonPipelineRunsParams;

    /**
     * Construct a TektonPipelineRunsPager object.
     *
     * @param {CdTektonPipelineV2}  client - The service client instance used to invoke listTektonPipelineRuns()
     * @param {Object} params - The parameters to be passed to listTektonPipelineRuns()
     * @constructor
     * @returns {TektonPipelineRunsPager}
     */
    constructor(
      client: CdTektonPipelineV2,
      params: CdTektonPipelineV2.ListTektonPipelineRunsParams
    ) {
      if (params && params.offset) {
        throw new Error(`the params.offset field should not be set`);
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
     * Returns the next page of results by invoking listTektonPipelineRuns().
     * @returns {Promise<CdTektonPipelineV2.PipelineRunsPipelineRunsItem[]>}
     */
    public async getNext(): Promise<CdTektonPipelineV2.PipelineRunsPipelineRunsItem[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listTektonPipelineRuns(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'offset');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.pipeline_runs;
    }

    /**
     * Returns all results by invoking listTektonPipelineRuns() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CdTektonPipelineV2.PipelineRunsPipelineRunsItem[]>}
     */
    public async getAll(): Promise<CdTektonPipelineV2.PipelineRunsPipelineRunsItem[]> {
      const results: PipelineRunsPipelineRunsItem[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = CdTektonPipelineV2;

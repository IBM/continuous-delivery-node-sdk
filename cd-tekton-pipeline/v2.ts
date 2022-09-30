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
 * IBM OpenAPI SDK Code Generator Version: 3.54.2-6c0e29d4-20220824-204545
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
  getQueryParam,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Continuous Delivery Tekton pipeline API definition <br><br> Maximum request payload size is 512 KB <br><br> All calls
 * require an <strong>Authorization</strong> HTTP header. <br><br> The following header is the accepted authentication
 * mechanism and required credentials for each <ul><li><b>Bearer:</b> an IBM Cloud IAM token (authorized for all
 * endpoints)</li>
 *
 * API Version: 2.0.0
 */

class CdTektonPipelineV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.devops.cloud.ibm.com/pipeline/v2';

  static DEFAULT_SERVICE_NAME: string = 'cd_tekton_pipeline';

  private static _regionalEndpoints = new Map([
    ['us-south', 'https://api.us-south.devops.cloud.ibm.com/pipeline/v2'], // The host URL for Tekton Pipeline Service in the us-south region.
    ['us-east', 'https://api.us-east.devops.cloud.ibm.com/pipeline/v2'], // The host URL for Tekton Pipeline Service in the us-east region.
    ['eu-de', 'https://api.eu-de.devops.cloud.ibm.com/pipeline/v2'], // The host URL for Tekton Pipeline Service in the eu-de region.
    ['eu-gb', 'https://api.eu-gb.devops.cloud.ibm.com/pipeline/v2'], // The host URL for Tekton Pipeline Service in the eu-gb region.
    ['jp-osa', 'https://api.jp-osa.devops.cloud.ibm.com/pipeline/v2'], // The host URL for Tekton Pipeline Service in the jp-osa region.
    ['jp-tok', 'https://api.jp-tok.devops.cloud.ibm.com/pipeline/v2'], // The host URL for Tekton Pipeline Service in the jp-tok region.
    ['au-syd', 'https://api.au-syd.devops.cloud.ibm.com/pipeline/v2'], // The host URL for Tekton Pipeline Service in the au-syd region.
    ['ca-tor', 'https://api.ca-tor.devops.cloud.ibm.com/pipeline/v2'], // The host URL for Tekton Pipeline Service in the ca-tor region.
    ['br-sao', 'https://api.br-sao.devops.cloud.ibm.com/pipeline/v2'], // The host URL for Tekton Pipeline Service in the br-sao region.
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
   * Create Tekton pipeline.
   *
   * This request creates a Tekton pipeline for a Tekton pipeline toolchain integration. User must use the toolchain
   * endpoint to create the Tekton pipeline toolchain integration first, and then use the generated UUID to create the
   * Tekton pipeline.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.id] - UUID.
   * @param {boolean} [params.enableSlackNotifications] - Flag whether to enable slack notifications for this pipeline.
   * When enabled, pipeline run events will be published on all slack integration specified channels in the enclosing
   * toolchain.
   * @param {boolean} [params.enablePartialCloning] - Flag whether to enable partial cloning for this pipeline. When
   * partial clone is enabled, only the files contained within the paths specified in definition repositories will be
   * read and cloned. This means symbolic links may not work.
   * @param {WorkerWithId} [params.worker] - Worker object containing worker ID only. If omitted the IBM Managed shared
   * workers are used by default.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>>}
   */
  public createTektonPipeline(
    params?: CdTektonPipelineV2.CreateTektonPipelineParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'id',
      'enableSlackNotifications',
      'enablePartialCloning',
      'worker',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      'enable_slack_notifications': _params.enableSlackNotifications,
      'enable_partial_cloning': _params.enablePartialCloning,
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
   * Get Tekton pipeline data.
   *
   * This request retrieves the Tekton pipeline data for the pipeline identified by `{id}`.
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
   * Update Tekton pipeline data.
   *
   * This request updates Tekton pipeline data, but you can only change worker ID in this endpoint. Use other endpoints
   * such as /definitions, /triggers, and /properties for other configuration updates.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - ID of current instance.
   * @param {boolean} [params.enableSlackNotifications] - Flag whether to enable slack notifications for this pipeline.
   * When enabled, pipeline run events will be published on all slack integration specified channels in the enclosing
   * toolchain.
   * @param {boolean} [params.enablePartialCloning] - Flag whether to enable partial cloning for this pipeline. When
   * partial clone is enabled, only the files contained within the paths specified in definition repositories will be
   * read and cloned. This means symbolic links may not work.
   * @param {WorkerWithId} [params.worker] - Worker object containing worker ID only. If omitted the IBM Managed shared
   * workers are used by default.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>>}
   */
  public updateTektonPipeline(
    params: CdTektonPipelineV2.UpdateTektonPipelineParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TektonPipeline>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = [
      'id',
      'enableSlackNotifications',
      'enablePartialCloning',
      'worker',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'enable_slack_notifications': _params.enableSlackNotifications,
      'enable_partial_cloning': _params.enablePartialCloning,
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
            'Content-Type': 'application/merge-patch+json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete Tekton pipeline instance.
   *
   * This request deletes Tekton pipeline instance that is associated with the pipeline toolchain integration.
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
   * This request lists pipeline run records, which has data about the runs, such as status, user_info, trigger and
   * other information. Default limit is 50.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} [params.start] - A page token that identifies the start point of the list of pipeline runs. This
   * value is computed and included in the response body. Cannot be used in combination with `offset`.
   * @param {number} [params.limit] - The number of pipeline runs to return, sorted by creation time, most recent first.
   * @param {number} [params.offset] - Skip the specified number of pipeline runs. Cannot be used in combination with
   * `start`.
   * @param {string} [params.status] - Filters the collection to resources with the specified status.
   * @param {string} [params.triggerName] - Filters the collection to resources with the specified trigger name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRunsCollection>>}
   */
  public listTektonPipelineRuns(
    params: CdTektonPipelineV2.ListTektonPipelineRunsParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRunsCollection>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = [
      'pipelineId',
      'start',
      'limit',
      'offset',
      'status',
      'triggerName',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
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
   * Trigger a pipeline run.
   *
   * Trigger a new pipeline run using the named trigger, using the provided additional or override properties.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} [params.triggerName] - Trigger name.
   * @param {JsonObject} [params.triggerProperties] - An object containing string values only that provides additional
   * `text` properties, or overrides existing pipeline/trigger properties.
   * @param {JsonObject} [params.secureTriggerProperties] - An object containing string values only that provides
   * additional `secure` properties, or overrides existing `secure` pipeline/trigger properties.
   * @param {JsonObject} [params.triggerHeader] - An object containing string values only that provides the trigger
   * header. Use `$(header.header_key_name)` to access it in triggerBinding.
   * @param {JsonObject} [params.triggerBody] - An object that provides the trigger body. Use `$(body.body_key_name)` to
   * access it in triggerBinding.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>>}
   */
  public createTektonPipelineRun(
    params: CdTektonPipelineV2.CreateTektonPipelineRunParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PipelineRun>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = [
      'pipelineId',
      'triggerName',
      'triggerProperties',
      'secureTriggerProperties',
      'triggerHeader',
      'triggerBody',
      'headers',
    ];
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
   * This request retrieves details of the pipeline run identified by `{id}`. To get the Kubernetes resource list of
   * this pipeline run use the endpoint `/tekton_pipelines/{pipeline_id}/tekton_pipelinerun_resource_list/{id}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
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
   * This request deletes the pipeline run record identified by `{id}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Cancel a pipeline run.
   *
   * This request cancels a running pipeline run identified by `{id}`. Use `force: true` in the body if the pipeline run
   * can't be cancelled normally.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
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
   * This request reruns a past pipeline run, which is identified by `{id}`, with the same data. Request body isn't
   * allowed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
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
   * Get a list of pipeline run log objects.
   *
   * This request fetches a list of log data for a pipeline run identified by `{id}`. The `href` in each log entry can
   * be used to fetch that individual log.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.id - ID of current instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.LogsCollection>>}
   */
  public getTektonPipelineRunLogs(
    params: CdTektonPipelineV2.GetTektonPipelineRunLogsParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.LogsCollection>> {
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
   * Get the log content of a pipeline run step.
   *
   * This request retrieves the log content of a pipeline run step, where the step is identified by `{id}`. To get the
   * log ID use the endpoint `/tekton_pipelines/{pipeline_id}/pipeline_runs/{id}/logs`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.pipelineRunId - The Tekton pipeline run ID.
   * @param {string} params.id - ID of current instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Log>>}
   */
  public getTektonPipelineRunLogContent(
    params: CdTektonPipelineV2.GetTektonPipelineRunLogContentParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Log>> {
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
   * This request fetches pipeline definitions, which is a collection of individual definition entries. Each entry
   * consists of a repository url, a repository branch and a repository path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.DefinitionsCollection>>}
   */
  public listTektonPipelineDefinitions(
    params: CdTektonPipelineV2.ListTektonPipelineDefinitionsParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.DefinitionsCollection>> {
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
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {DefinitionScmSource} [params.scmSource] - SCM source for Tekton pipeline definition.
   * @param {string} [params.id] - UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>>}
   */
  public createTektonPipelineDefinition(
    params: CdTektonPipelineV2.CreateTektonPipelineDefinitionParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'scmSource', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'scm_source': _params.scmSource,
      'id': _params.id,
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
   * This request fetches a single definition entry, which consists of the definition repository URL, branch/tag and
   * path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
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
   * This request updates a definition entry identified by `{definition_id}`. The service_instance_id property is
   * immutable.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.definitionId - The definition ID.
   * @param {DefinitionScmSource} [params.scmSource] - SCM source for Tekton pipeline definition.
   * @param {string} [params.id] - UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>>}
   */
  public replaceTektonPipelineDefinition(
    params: CdTektonPipelineV2.ReplaceTektonPipelineDefinitionParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Definition>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'definitionId'];
    const _validParams = ['pipelineId', 'definitionId', 'scmSource', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'scm_source': _params.scmSource,
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
   * This request deletes a single definition from the definition list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * environmentProperties
   ************************/

  /**
   * List the pipeline's environment properties.
   *
   * This request lists the environment properties the pipeline identified by `{pipeline_id}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} [params.name] - Filters the collection to resources with the specified property name.
   * @param {string[]} [params.type] - Filters the collection to resources with the specified property type.
   * @param {string} [params.sort] - Sorts the returned properties by name, in ascending order using `name` or in
   * descending order using `-name`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PropertiesCollection>>}
   */
  public listTektonPipelineProperties(
    params: CdTektonPipelineV2.ListTektonPipelinePropertiesParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.PropertiesCollection>> {
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
   * Create a pipeline environment property.
   *
   * This request creates an environment property.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} [params.name] - Property name.
   * @param {string} [params.type] - Property type.
   * @param {string} [params.value] - Property value.
   * @param {string[]} [params._enum] - Options for `single_select` property type. Only needed when using
   * `single_select` property type.
   * @param {string} [params.path] - A dot notation path for `integration` type properties to select a value from the
   * tool integration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>>}
   */
  public createTektonPipelineProperties(
    params: CdTektonPipelineV2.CreateTektonPipelinePropertiesParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = ['pipelineId', 'name', 'type', 'value', '_enum', 'path', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'value': _params.value,
      'enum': _params._enum,
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
   * Get a pipeline environment property.
   *
   * This request gets the data of an environment property identified by `{property_name}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.propertyName - The property name.
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
   * Replace the value of an environment property.
   *
   * This request updates the value of an environment property identified by `{property_name}`, its type or name are
   * immutable.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.propertyName - The property name.
   * @param {string} [params.name] - Property name.
   * @param {string} [params.type] - Property type.
   * @param {string} [params.value] - Property value.
   * @param {string[]} [params._enum] - Options for `single_select` property type. Only needed when using
   * `single_select` property type.
   * @param {string} [params.path] - A dot notation path for `integration` type properties to select a value from the
   * tool integration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>>}
   */
  public replaceTektonPipelineProperty(
    params: CdTektonPipelineV2.ReplaceTektonPipelinePropertyParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Property>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'propertyName'];
    const _validParams = [
      'pipelineId',
      'propertyName',
      'name',
      'type',
      'value',
      '_enum',
      'path',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'value': _params.value,
      'enum': _params._enum,
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
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.propertyName - The property name.
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
   * This request lists pipeline triggers for the pipeline identified by `{pipeline_id}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} [params.type] - Filter the triggers by "type", accepts a comma separated list of types. Valid types
   * are "manual", "scm", "generic", and "timer".
   * @param {string} [params.name] - Filter the triggers by "name", accepts a single string value.
   * @param {string} [params.eventListener] - Filter the triggers by "event_listener", accepts a single string value.
   * @param {string} [params.workerId] - Filter the triggers by "worker.id", accepts a single string value.
   * @param {string} [params.workerName] - Filter the triggers by "worker.name", accepts a single string value.
   * @param {string} [params.disabled] - Filter the triggers by "disabled" flag, possible values are "true" or "false".
   * @param {string} [params.tags] - Filter the triggers by "tags", accepts a comma separated list of tags. The response
   * lists triggers having at least one matching tag.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggersCollection>>}
   */
  public listTektonPipelineTriggers(
    params: CdTektonPipelineV2.ListTektonPipelineTriggersParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggersCollection>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = [
      'pipelineId',
      'type',
      'name',
      'eventListener',
      'workerId',
      'workerName',
      'disabled',
      'tags',
      'headers',
    ];
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
   * Create a trigger.
   *
   * This request creates a trigger.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} [params.type] - Trigger type.
   * @param {string} [params.name] - Trigger name.
   * @param {string} [params.eventListener] - Event listener name. The name of the event listener to which the trigger
   * is associated. The event listeners are defined in the definition repositories of the Tekton pipeline.
   * @param {boolean} [params.disabled] - Flag whether the trigger is disabled. If omitted the trigger is enabled by
   * default.
   * @param {string[]} [params.tags] - Trigger tags array.
   * @param {Worker} [params.worker] - Worker used to run the trigger. If not specified the trigger will use the default
   * pipeline worker.
   * @param {number} [params.maxConcurrentRuns] - Defines the maximum number of concurrent runs for this trigger. Omit
   * this property to disable the concurrency limit.
   * @param {GenericSecret} [params.secret] - Only needed for generic webhook trigger type. Secret used to start generic
   * webhook trigger.
   * @param {string} [params.cron] - Only needed for timer triggers. Cron expression for timer trigger.
   * @param {string} [params.timezone] - Only needed for timer triggers. Timezone for timer trigger.
   * @param {TriggerScmSource} [params.scmSource] - SCM source repository for a Git trigger. Only needed for Git
   * triggers.
   * @param {Events} [params.events] - Only needed for Git triggers. Events object defines the events to which this Git
   * trigger listens.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>>}
   */
  public createTektonPipelineTrigger(
    params: CdTektonPipelineV2.CreateTektonPipelineTriggerParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId'];
    const _validParams = [
      'pipelineId',
      'type',
      'name',
      'eventListener',
      'disabled',
      'tags',
      'worker',
      'maxConcurrentRuns',
      'secret',
      'cron',
      'timezone',
      'scmSource',
      'events',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'name': _params.name,
      'event_listener': _params.eventListener,
      'disabled': _params.disabled,
      'tags': _params.tags,
      'worker': _params.worker,
      'max_concurrent_runs': _params.maxConcurrentRuns,
      'secret': _params.secret,
      'cron': _params.cron,
      'timezone': _params.timezone,
      'scm_source': _params.scmSource,
      'events': _params.events,
    };

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
   * This request retrieves a single trigger identified by `{trigger_id}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
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
   * Edit a trigger.
   *
   * This request changes a single field or many fields of the trigger identified by `{trigger_id}`. Note that some
   * fields are immutable, and use `/properties` endpoint to update trigger properties.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} [params.type] - Trigger type.
   * @param {string} [params.name] - Trigger name.
   * @param {string} [params.eventListener] - Event listener name. The name of the event listener to which the trigger
   * is associated. The event listeners are defined in the definition repositories of the Tekton pipeline.
   * @param {string[]} [params.tags] - Trigger tags array. Optional tags for the trigger.
   * @param {Worker} [params.worker] - Worker used to run the trigger. If not specified the trigger will use the default
   * pipeline worker.
   * @param {number} [params.maxConcurrentRuns] - Defines the maximum number of concurrent runs for this trigger. Omit
   * this property to disable the concurrency limit.
   * @param {boolean} [params.disabled] - Defines if this trigger is disabled.
   * @param {GenericSecret} [params.secret] - Only needed for generic webhook trigger type. Secret used to start generic
   * webhook trigger.
   * @param {string} [params.cron] - Only needed for timer triggers. Cron expression for timer trigger.
   * @param {string} [params.timezone] - Only needed for timer triggers. Timezone for timer trigger.
   * @param {TriggerScmSource} [params.scmSource] - SCM source repository for a Git trigger. Only needed for Git
   * triggers.
   * @param {Events} [params.events] - Only needed for Git triggers. Events object defines the events to which this Git
   * trigger listens.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>>}
   */
  public updateTektonPipelineTrigger(
    params: CdTektonPipelineV2.UpdateTektonPipelineTriggerParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId'];
    const _validParams = [
      'pipelineId',
      'triggerId',
      'type',
      'name',
      'eventListener',
      'tags',
      'worker',
      'maxConcurrentRuns',
      'disabled',
      'secret',
      'cron',
      'timezone',
      'scmSource',
      'events',
      'headers',
    ];
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
      'max_concurrent_runs': _params.maxConcurrentRuns,
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
            'Content-Type': 'application/merge-patch+json',
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
   * This request deletes the trigger identified by `{trigger_id}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Duplicate a trigger.
   *
   * This request duplicates a trigger from an existing trigger identified by `{source_trigger_id}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.sourceTriggerId - The ID of the trigger to duplicate.
   * @param {string} [params.name] - Trigger name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>>}
   */
  public duplicateTektonPipelineTrigger(
    params: CdTektonPipelineV2.DuplicateTektonPipelineTriggerParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.Trigger>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'sourceTriggerId'];
    const _validParams = ['pipelineId', 'sourceTriggerId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
    };

    const path = {
      'pipeline_id': _params.pipelineId,
      'source_trigger_id': _params.sourceTriggerId,
    };

    const sdkHeaders = getSdkHeaders(
      CdTektonPipelineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'duplicateTektonPipelineTrigger'
    );

    const parameters = {
      options: {
        url: '/tekton_pipelines/{pipeline_id}/triggers/{source_trigger_id}/duplicate',
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
   * triggerProperties
   ************************/

  /**
   * List trigger properties.
   *
   * This request lists trigger properties for the trigger identified by `{trigger_id}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} params.name - Filter properties by `name`.
   * @param {string} params.type - Filter properties by `type`. Valid types are `secure`, `text`, `integration`,
   * `single_select`, `appconfig`.
   * @param {string} params.sort - Sort properties by name. They can be sorted in ascending order using `name` or in
   * descending order using `-name`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerPropertiesCollection>>}
   */
  public listTektonPipelineTriggerProperties(
    params: CdTektonPipelineV2.ListTektonPipelineTriggerPropertiesParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerPropertiesCollection>> {
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
   * Create a trigger property.
   *
   * This request creates a property in the trigger identified by `{trigger_id}`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} [params.name] - Property name.
   * @param {string} [params.type] - Property type.
   * @param {string} [params.value] - Property value.
   * @param {string[]} [params._enum] - Options for `single_select` property type. Only needed for `single_select`
   * property type.
   * @param {string} [params.path] - A dot notation path for `integration` type properties to select a value from the
   * tool integration. If left blank the full tool integration data will be used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>>}
   */
  public createTektonPipelineTriggerProperties(
    params: CdTektonPipelineV2.CreateTektonPipelineTriggerPropertiesParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId'];
    const _validParams = [
      'pipelineId',
      'triggerId',
      'name',
      'type',
      'value',
      '_enum',
      'path',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'value': _params.value,
      'enum': _params._enum,
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
   * Get a trigger property.
   *
   * This request retrieves a trigger property.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} params.propertyName - The property name.
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
   * Replace a trigger property value.
   *
   * This request updates a trigger property value, type and name are immutable.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} params.propertyName - The property name.
   * @param {string} [params.name] - Property name.
   * @param {string} [params.type] - Property type.
   * @param {string} [params.value] - Property value.
   * @param {string[]} [params._enum] - Options for `single_select` property type. Only needed for `single_select`
   * property type.
   * @param {string} [params.path] - A dot notation path for `integration` type properties to select a value from the
   * tool integration. If left blank the full tool integration data will be used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>>}
   */
  public replaceTektonPipelineTriggerProperty(
    params: CdTektonPipelineV2.ReplaceTektonPipelineTriggerPropertyParams
  ): Promise<CdTektonPipelineV2.Response<CdTektonPipelineV2.TriggerProperty>> {
    const _params = { ...params };
    const _requiredParams = ['pipelineId', 'triggerId', 'propertyName'];
    const _validParams = [
      'pipelineId',
      'triggerId',
      'propertyName',
      'name',
      'type',
      'value',
      '_enum',
      'path',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'value': _params.value,
      'enum': _params._enum,
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
   * Delete a trigger property.
   *
   * This request deletes a trigger property.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pipelineId - The Tekton pipeline ID.
   * @param {string} params.triggerId - The trigger ID.
   * @param {string} params.propertyName - The property name.
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
    /** Flag whether to enable slack notifications for this pipeline. When enabled, pipeline run events will be
     *  published on all slack integration specified channels in the enclosing toolchain.
     */
    enableSlackNotifications?: boolean;
    /** Flag whether to enable partial cloning for this pipeline. When partial clone is enabled, only the files
     *  contained within the paths specified in definition repositories will be read and cloned. This means symbolic
     *  links may not work.
     */
    enablePartialCloning?: boolean;
    /** Worker object containing worker ID only. If omitted the IBM Managed shared workers are used by default. */
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
    /** Flag whether to enable slack notifications for this pipeline. When enabled, pipeline run events will be
     *  published on all slack integration specified channels in the enclosing toolchain.
     */
    enableSlackNotifications?: boolean;
    /** Flag whether to enable partial cloning for this pipeline. When partial clone is enabled, only the files
     *  contained within the paths specified in definition repositories will be read and cloned. This means symbolic
     *  links may not work.
     */
    enablePartialCloning?: boolean;
    /** Worker object containing worker ID only. If omitted the IBM Managed shared workers are used by default. */
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
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** A page token that identifies the start point of the list of pipeline runs. This value is computed and
     *  included in the response body. Cannot be used in combination with `offset`.
     */
    start?: string;
    /** The number of pipeline runs to return, sorted by creation time, most recent first. */
    limit?: number;
    /** Skip the specified number of pipeline runs. Cannot be used in combination with `start`. */
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
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** Trigger name. */
    triggerName?: string;
    /** An object containing string values only that provides additional `text` properties, or overrides existing
     *  pipeline/trigger properties.
     */
    triggerProperties?: JsonObject;
    /** An object containing string values only that provides additional `secure` properties, or overrides existing
     *  `secure` pipeline/trigger properties.
     */
    secureTriggerProperties?: JsonObject;
    /** An object containing string values only that provides the trigger header. Use `$(header.header_key_name)` to
     *  access it in triggerBinding.
     */
    triggerHeader?: JsonObject;
    /** An object that provides the trigger body. Use `$(body.body_key_name)` to access it in triggerBinding. */
    triggerBody?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipelineRun` operation. */
  export interface GetTektonPipelineRunParams {
    /** The Tekton pipeline ID. */
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
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `cancelTektonPipelineRun` operation. */
  export interface CancelTektonPipelineRunParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** ID of current instance. */
    id: string;
    /** Flag whether force cancel. */
    force?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `rerunTektonPipelineRun` operation. */
  export interface RerunTektonPipelineRunParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipelineRunLogs` operation. */
  export interface GetTektonPipelineRunLogsParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipelineRunLogContent` operation. */
  export interface GetTektonPipelineRunLogContentParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The Tekton pipeline run ID. */
    pipelineRunId: string;
    /** ID of current instance. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTektonPipelineDefinitions` operation. */
  export interface ListTektonPipelineDefinitionsParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTektonPipelineDefinition` operation. */
  export interface CreateTektonPipelineDefinitionParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** SCM source for Tekton pipeline definition. */
    scmSource?: DefinitionScmSource;
    /** UUID. */
    id?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTektonPipelineDefinition` operation. */
  export interface GetTektonPipelineDefinitionParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The definition ID. */
    definitionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceTektonPipelineDefinition` operation. */
  export interface ReplaceTektonPipelineDefinitionParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The definition ID. */
    definitionId: string;
    /** SCM source for Tekton pipeline definition. */
    scmSource?: DefinitionScmSource;
    /** UUID. */
    id?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTektonPipelineDefinition` operation. */
  export interface DeleteTektonPipelineDefinitionParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The definition ID. */
    definitionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTektonPipelineProperties` operation. */
  export interface ListTektonPipelinePropertiesParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** Filters the collection to resources with the specified property name. */
    name?: string;
    /** Filters the collection to resources with the specified property type. */
    type?: ListTektonPipelinePropertiesConstants.Type[] | string[];
    /** Sorts the returned properties by name, in ascending order using `name` or in descending order using `-name`. */
    sort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listTektonPipelineProperties` operation. */
  export namespace ListTektonPipelinePropertiesConstants {
    /** Filters the collection to resources with the specified property type. */
    export enum Type {
      SECURE = 'secure',
      TEXT = 'text',
      INTEGRATION = 'integration',
      SINGLE_SELECT = 'single_select',
      APPCONFIG = 'appconfig',
    }
  }

  /** Parameters for the `createTektonPipelineProperties` operation. */
  export interface CreateTektonPipelinePropertiesParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** Property name. */
    name?: string;
    /** Property type. */
    type?: CreateTektonPipelinePropertiesConstants.Type | string;
    /** Property value. */
    value?: string;
    /** Options for `single_select` property type. Only needed when using `single_select` property type. */
    _enum?: string[];
    /** A dot notation path for `integration` type properties to select a value from the tool integration. */
    path?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createTektonPipelineProperties` operation. */
  export namespace CreateTektonPipelinePropertiesConstants {
    /** Property type. */
    export enum Type {
      SECURE = 'secure',
      TEXT = 'text',
      INTEGRATION = 'integration',
      SINGLE_SELECT = 'single_select',
      APPCONFIG = 'appconfig',
    }
  }

  /** Parameters for the `getTektonPipelineProperty` operation. */
  export interface GetTektonPipelinePropertyParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The property name. */
    propertyName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceTektonPipelineProperty` operation. */
  export interface ReplaceTektonPipelinePropertyParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The property name. */
    propertyName: string;
    /** Property name. */
    name?: string;
    /** Property type. */
    type?: ReplaceTektonPipelinePropertyConstants.Type | string;
    /** Property value. */
    value?: string;
    /** Options for `single_select` property type. Only needed when using `single_select` property type. */
    _enum?: string[];
    /** A dot notation path for `integration` type properties to select a value from the tool integration. */
    path?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceTektonPipelineProperty` operation. */
  export namespace ReplaceTektonPipelinePropertyConstants {
    /** Property type. */
    export enum Type {
      SECURE = 'secure',
      TEXT = 'text',
      INTEGRATION = 'integration',
      SINGLE_SELECT = 'single_select',
      APPCONFIG = 'appconfig',
    }
  }

  /** Parameters for the `deleteTektonPipelineProperty` operation. */
  export interface DeleteTektonPipelinePropertyParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The property name. */
    propertyName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTektonPipelineTriggers` operation. */
  export interface ListTektonPipelineTriggersParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** Filter the triggers by "type", accepts a comma separated list of types. Valid types are "manual", "scm",
     *  "generic", and "timer".
     */
    type?: string;
    /** Filter the triggers by "name", accepts a single string value. */
    name?: string;
    /** Filter the triggers by "event_listener", accepts a single string value. */
    eventListener?: string;
    /** Filter the triggers by "worker.id", accepts a single string value. */
    workerId?: string;
    /** Filter the triggers by "worker.name", accepts a single string value. */
    workerName?: string;
    /** Filter the triggers by "disabled" flag, possible values are "true" or "false". */
    disabled?: string;
    /** Filter the triggers by "tags", accepts a comma separated list of tags. The response lists triggers having at
     *  least one matching tag.
     */
    tags?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTektonPipelineTrigger` operation. */
  export interface CreateTektonPipelineTriggerParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** Trigger type. */
    type?: CreateTektonPipelineTriggerConstants.Type | string;
    /** Trigger name. */
    name?: string;
    /** Event listener name. The name of the event listener to which the trigger is associated. The event listeners
     *  are defined in the definition repositories of the Tekton pipeline.
     */
    eventListener?: string;
    /** Flag whether the trigger is disabled. If omitted the trigger is enabled by default. */
    disabled?: boolean;
    /** Trigger tags array. */
    tags?: string[];
    /** Worker used to run the trigger. If not specified the trigger will use the default pipeline worker. */
    worker?: Worker;
    /** Defines the maximum number of concurrent runs for this trigger. Omit this property to disable the
     *  concurrency limit.
     */
    maxConcurrentRuns?: number;
    /** Only needed for generic webhook trigger type. Secret used to start generic webhook trigger. */
    secret?: GenericSecret;
    /** Only needed for timer triggers. Cron expression for timer trigger. */
    cron?: string;
    /** Only needed for timer triggers. Timezone for timer trigger. */
    timezone?: string;
    /** SCM source repository for a Git trigger. Only needed for Git triggers. */
    scmSource?: TriggerScmSource;
    /** Only needed for Git triggers. Events object defines the events to which this Git trigger listens. */
    events?: Events;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createTektonPipelineTrigger` operation. */
  export namespace CreateTektonPipelineTriggerConstants {
    /** Trigger type. */
    export enum Type {
      MANUAL = 'manual',
      SCM = 'scm',
      TIMER = 'timer',
      GENERIC = 'generic',
    }
  }

  /** Parameters for the `getTektonPipelineTrigger` operation. */
  export interface GetTektonPipelineTriggerParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTektonPipelineTrigger` operation. */
  export interface UpdateTektonPipelineTriggerParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** Trigger type. */
    type?: UpdateTektonPipelineTriggerConstants.Type | string;
    /** Trigger name. */
    name?: string;
    /** Event listener name. The name of the event listener to which the trigger is associated. The event listeners
     *  are defined in the definition repositories of the Tekton pipeline.
     */
    eventListener?: string;
    /** Trigger tags array. Optional tags for the trigger. */
    tags?: string[];
    /** Worker used to run the trigger. If not specified the trigger will use the default pipeline worker. */
    worker?: Worker;
    /** Defines the maximum number of concurrent runs for this trigger. Omit this property to disable the
     *  concurrency limit.
     */
    maxConcurrentRuns?: number;
    /** Defines if this trigger is disabled. */
    disabled?: boolean;
    /** Only needed for generic webhook trigger type. Secret used to start generic webhook trigger. */
    secret?: GenericSecret;
    /** Only needed for timer triggers. Cron expression for timer trigger. */
    cron?: string;
    /** Only needed for timer triggers. Timezone for timer trigger. */
    timezone?: string;
    /** SCM source repository for a Git trigger. Only needed for Git triggers. */
    scmSource?: TriggerScmSource;
    /** Only needed for Git triggers. Events object defines the events to which this Git trigger listens. */
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
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `duplicateTektonPipelineTrigger` operation. */
  export interface DuplicateTektonPipelineTriggerParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The ID of the trigger to duplicate. */
    sourceTriggerId: string;
    /** Trigger name. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTektonPipelineTriggerProperties` operation. */
  export interface ListTektonPipelineTriggerPropertiesParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** Filter properties by `name`. */
    name: string;
    /** Filter properties by `type`. Valid types are `secure`, `text`, `integration`, `single_select`, `appconfig`. */
    type: string;
    /** Sort properties by name. They can be sorted in ascending order using `name` or in descending order using
     *  `-name`.
     */
    sort: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTektonPipelineTriggerProperties` operation. */
  export interface CreateTektonPipelineTriggerPropertiesParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** Property name. */
    name?: string;
    /** Property type. */
    type?: CreateTektonPipelineTriggerPropertiesConstants.Type | string;
    /** Property value. */
    value?: string;
    /** Options for `single_select` property type. Only needed for `single_select` property type. */
    _enum?: string[];
    /** A dot notation path for `integration` type properties to select a value from the tool integration. If left
     *  blank the full tool integration data will be used.
     */
    path?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createTektonPipelineTriggerProperties` operation. */
  export namespace CreateTektonPipelineTriggerPropertiesConstants {
    /** Property type. */
    export enum Type {
      SECURE = 'secure',
      TEXT = 'text',
      INTEGRATION = 'integration',
      SINGLE_SELECT = 'single_select',
      APPCONFIG = 'appconfig',
    }
  }

  /** Parameters for the `getTektonPipelineTriggerProperty` operation. */
  export interface GetTektonPipelineTriggerPropertyParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** The property name. */
    propertyName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceTektonPipelineTriggerProperty` operation. */
  export interface ReplaceTektonPipelineTriggerPropertyParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** The property name. */
    propertyName: string;
    /** Property name. */
    name?: string;
    /** Property type. */
    type?: ReplaceTektonPipelineTriggerPropertyConstants.Type | string;
    /** Property value. */
    value?: string;
    /** Options for `single_select` property type. Only needed for `single_select` property type. */
    _enum?: string[];
    /** A dot notation path for `integration` type properties to select a value from the tool integration. If left
     *  blank the full tool integration data will be used.
     */
    path?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceTektonPipelineTriggerProperty` operation. */
  export namespace ReplaceTektonPipelineTriggerPropertyConstants {
    /** Property type. */
    export enum Type {
      SECURE = 'secure',
      TEXT = 'text',
      INTEGRATION = 'integration',
      SINGLE_SELECT = 'single_select',
      APPCONFIG = 'appconfig',
    }
  }

  /** Parameters for the `deleteTektonPipelineTriggerProperty` operation. */
  export interface DeleteTektonPipelineTriggerPropertyParams {
    /** The Tekton pipeline ID. */
    pipelineId: string;
    /** The trigger ID. */
    triggerId: string;
    /** The property name. */
    propertyName: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Tekton pipeline definition entry object. */
  export interface Definition {
    /** SCM source for Tekton pipeline definition. */
    scm_source: DefinitionScmSource;
    /** UUID. */
    id?: string;
  }

  /** SCM source for Tekton pipeline definition. */
  export interface DefinitionScmSource {
    /** URL of the definition repository. */
    url: string;
    /** A branch from the repo. One of branch or tag must be specified, but only one or the other. */
    branch?: string;
    /** A tag from the repo. One of branch or tag must be specified, but only one or the other. */
    tag?: string;
    /** The path to the definition's yaml files. */
    path: string;
    /** ID of the SCM repository service instance. */
    service_instance_id?: string;
  }

  /** Pipeline definitions is a collection of individual definition entries, each entry consists of a repository URL, branch/tag and path. */
  export interface DefinitionsCollection {
    /** Definition list. */
    definitions: DefinitionsCollectionDefinitionsItem[];
  }

  /** Tekton pipeline definition entry object. */
  export interface DefinitionsCollectionDefinitionsItem {
    /** SCM source for Tekton pipeline definition. */
    scm_source: DefinitionScmSource;
    /** UUID. */
    id?: string;
    /** URL of the definition repository. */
    href?: string;
  }

  /** Only needed for Git triggers. Events object defines the events to which this Git trigger listens. */
  export interface Events {
    /** If true, the trigger listens for 'push' Git webhook events. */
    push?: boolean;
    /** If true, the trigger listens for 'close pull request' Git webhook events. */
    pull_request_closed?: boolean;
    /** If true, the trigger listens for 'open pull request' or 'update pull request' Git webhook events. */
    pull_request?: boolean;
  }

  /** Only needed for generic webhook trigger type. Secret used to start generic webhook trigger. */
  export interface GenericSecret {
    /** Secret type. */
    type?: string;
    /** Secret value, not needed if secret type is `internal_validation`. */
    value?: string;
    /** Secret location, not needed if secret type is `internal_validation`. */
    source?: string;
    /** Secret name, not needed if type is `internal_validation`. */
    key_name?: string;
    /** Algorithm used for `digest_matches` secret type. Only needed for `digest_matches` secret type. */
    algorithm?: string;
  }

  /** Log object for Tekton pipeline run step. */
  export interface Log {
    /** The raw log content of step. */
    data?: string;
    /** API for getting log content. */
    href?: string;
    /** Step log ID. */
    id: string;
    /** <podName>/<containerName> of this log. */
    name?: string;
  }

  /** List of pipeline run log objects. */
  export interface LogsCollection {
    /** The list of pipeline run log objects. */
    logs?: Log[];
  }

  /** Single Tekton pipeline run object. */
  export interface PipelineRun {
    /** UUID. */
    id: string;
    /** User information. */
    user_info?: UserInfo;
    /** Status of the pipeline run. */
    status: string;
    /** The aggregated definition ID used for this pipeline run. */
    definition_id: string;
    /** worker details used in this pipeline run. */
    worker: PipelineRunWorker;
    /** UUID. */
    pipeline_id: string;
    /** Listener name used to start the run. */
    listener_name: string;
    /** Tekton pipeline trigger. */
    trigger: Trigger;
    /** Event parameters object passed to this pipeline run in String format, the contents depends on the type of
     *  trigger, for example, for Git trigger it includes the Git event payload.
     */
    event_params_blob: string;
    /** Headers passed to this pipeline run in String format. */
    event_header_params_blob?: string;
    /** Properties used in this Tekton pipeline run. */
    properties?: Property[];
    /** Standard RFC 3339 Date Time String. */
    created_at?: string;
    /** Standard RFC 3339 Date Time String. */
    updated_at?: string;
    /** URL for the details page of this pipeline run. */
    run_url: string;
  }

  /** worker details used in this pipeline run. */
  export interface PipelineRunWorker {
    /** Name of the worker. Computed based on the worker ID. */
    name?: string;
    /** The agent ID of the corresponding private worker integration used for this pipeline run. */
    agent?: string;
    /** The Service ID of the corresponding private worker integration used for this pipeline run. */
    service_id?: string;
    /** UUID. */
    id: string;
  }

  /** Tekton pipeline runs object. */
  export interface PipelineRunsCollection {
    /** Tekton pipeline runs list. */
    pipeline_runs: PipelineRunsCollectionPipelineRunsItem[];
    /** Skip a specified number of pipeline runs. */
    offset: number;
    /** The number of pipeline runs to return, sorted by creation time, most recent first. */
    limit: number;
    /** First page of pipeline runs. */
    first: PipelineRunsCollectionFirst;
    /** Next page of pipeline runs relative to the `start` and `limit` params, or relative to the `offset` and
     *  `limit` params, depending on which of `start` or `offset` were used in the request.
     */
    next?: PipelineRunsCollectionNext;
    /** Last page of pipeline runs relative to the `start` and `limit` params, or relative to the `offset` and
     *  `limit` params, depending on which of `start` or `offset` were used in the request.
     */
    last?: PipelineRunsCollectionLast;
  }

  /** First page of pipeline runs. */
  export interface PipelineRunsCollectionFirst {
    /** General href URL. */
    href: string;
  }

  /** Last page of pipeline runs relative to the `start` and `limit` params, or relative to the `offset` and `limit` params, depending on which of `start` or `offset` were used in the request. */
  export interface PipelineRunsCollectionLast {
    /** General href URL. */
    href: string;
  }

  /** Next page of pipeline runs relative to the `start` and `limit` params, or relative to the `offset` and `limit` params, depending on which of `start` or `offset` were used in the request. */
  export interface PipelineRunsCollectionNext {
    /** General href URL. */
    href: string;
  }

  /** Single Tekton pipeline run object. */
  export interface PipelineRunsCollectionPipelineRunsItem {
    /** UUID. */
    id: string;
    /** User information. */
    user_info?: UserInfo;
    /** Status of the pipeline run. */
    status: string;
    /** The aggregated definition ID used for this pipeline run. */
    definition_id: string;
    /** worker details used in this pipeline run. */
    worker: PipelineRunWorker;
    /** UUID. */
    pipeline_id: string;
    /** Listener name used to start the run. */
    listener_name: string;
    /** Tekton pipeline trigger. */
    trigger: Trigger;
    /** Event parameters object passed to this pipeline run in String format, the contents depends on the type of
     *  trigger, for example, for Git trigger it includes the Git event payload.
     */
    event_params_blob: string;
    /** Headers passed to this pipeline run in String format. */
    event_header_params_blob?: string;
    /** Properties used in this Tekton pipeline run. */
    properties?: Property[];
    /** Standard RFC 3339 Date Time String. */
    created_at?: string;
    /** Standard RFC 3339 Date Time String. */
    updated_at?: string;
    /** URL for the details page of this pipeline run. */
    run_url: string;
    /** API URL for interacting with the pipeline run. */
    href?: string;
  }

  /** Pipeline properties object. */
  export interface PropertiesCollection {
    /** Pipeline properties list. */
    properties: Property[];
  }

  /** Property object. */
  export interface Property {
    /** Property name. */
    name: string;
    /** Property value. */
    value?: string;
    /** Options for `single_select` property type. Only needed when using `single_select` property type. */
    enum?: string[];
    /** Property type. */
    type: string;
    /** A dot notation path for `integration` type properties to select a value from the tool integration. */
    path?: string;
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
    updated_at?: string;
    /** Standard RFC 3339 Date Time String. */
    created_at?: string;
    /** Tekton pipeline definition object. If this property is absent or empty, the pipeline has no definitions
     *  added.
     */
    pipeline_definition?: TektonPipelinePipelineDefinition;
    /** Tekton pipeline triggers list. */
    triggers: Trigger[];
    /** Default pipeline worker used to run the pipeline. */
    worker: Worker;
    /** URL for this pipeline showing the list of pipeline runs. */
    runs_url: string;
    /** The latest pipeline run build number. If this property is absent, the pipeline hasn't had any pipeline runs. */
    build_number?: number;
    /** Flag whether to enable slack notifications for this pipeline. When enabled, pipeline run events will be
     *  published on all slack integration specified channels in the enclosing toolchain.
     */
    enable_slack_notifications?: boolean;
    /** Flag whether to enable partial cloning for this pipeline. When partial clone is enabled, only the files
     *  contained within the paths specified in definition repositories will be read and cloned. This means symbolic
     *  links may not work.
     */
    enable_partial_cloning?: boolean;
    /** Flag whether this pipeline is enabled. */
    enabled: boolean;
  }

  /** Tekton pipeline definition object. If this property is absent or empty, the pipeline has no definitions added. */
  export interface TektonPipelinePipelineDefinition {
    /** The pipeline definition status. */
    status?: string;
    /** UUID. */
    id?: string;
  }

  /** Toolchain object. */
  export interface Toolchain {
    /** UUID. */
    id: string;
    /** The CRN for the toolchain that contains the Tekton pipeline. */
    crn: string;
  }

  /** Tekton pipeline trigger. */
  export interface Trigger {}

  /** Trigger property object. */
  export interface TriggerGenericTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** Property value. Can be empty and should be omitted for `single_select` property type. */
    value?: string;
    /** Options for `single_select` property type. Only needed for `single_select` property type. */
    enum?: string[];
    /** Property type. */
    type: string;
    /** A dot notation path for `integration` type properties to select a value from the tool integration. If left
     *  blank the full tool integration data will be used.
     */
    path?: string;
    /** API URL for interacting with the trigger property. */
    href?: string;
  }

  /** Trigger property object. */
  export interface TriggerManualTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** Property value. Can be empty and should be omitted for `single_select` property type. */
    value?: string;
    /** Options for `single_select` property type. Only needed for `single_select` property type. */
    enum?: string[];
    /** Property type. */
    type: string;
    /** A dot notation path for `integration` type properties to select a value from the tool integration. If left
     *  blank the full tool integration data will be used.
     */
    path?: string;
    /** API URL for interacting with the trigger property. */
    href?: string;
  }

  /** Trigger properties object. */
  export interface TriggerPropertiesCollection {
    /** Trigger properties list. */
    properties: TriggerPropertiesCollectionPropertiesItem[];
  }

  /** Trigger property object. */
  export interface TriggerPropertiesCollectionPropertiesItem {
    /** Property name. */
    name: string;
    /** Property value. Can be empty and should be omitted for `single_select` property type. */
    value?: string;
    /** Options for `single_select` property type. Only needed for `single_select` property type. */
    enum?: string[];
    /** Property type. */
    type: string;
    /** A dot notation path for `integration` type properties to select a value from the tool integration. If left
     *  blank the full tool integration data will be used.
     */
    path?: string;
    /** API URL for interacting with the trigger property. */
    href?: string;
  }

  /** Trigger property object. */
  export interface TriggerProperty {
    /** Property name. */
    name: string;
    /** Property value. Can be empty and should be omitted for `single_select` property type. */
    value?: string;
    /** Options for `single_select` property type. Only needed for `single_select` property type. */
    enum?: string[];
    /** Property type. */
    type: string;
    /** A dot notation path for `integration` type properties to select a value from the tool integration. If left
     *  blank the full tool integration data will be used.
     */
    path?: string;
  }

  /** SCM source repository for a Git trigger. Only needed for Git triggers. */
  export interface TriggerScmSource {
    /** URL of the repository to which the trigger is listening. */
    url: string;
    /** Name of a branch from the repo. One of branch or tag must be specified, but only one or the other. */
    branch?: string;
    /** Git branch or tag pattern to listen to. Please refer to https://github.com/micromatch/micromatch for pattern
     *  syntax.
     */
    pattern?: string;
    /** True if the repository server is not addressable on the public internet. IBM Cloud will not be able to
     *  validate the connection details you provide.
     */
    blind_connection?: boolean;
    /** ID of the webhook from the repo. Computed upon creation of the trigger. */
    hook_id?: string;
    /** ID of the repository service instance. */
    service_instance_id?: string;
  }

  /** Trigger property object. */
  export interface TriggerScmTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** Property value. Can be empty and should be omitted for `single_select` property type. */
    value?: string;
    /** Options for `single_select` property type. Only needed for `single_select` property type. */
    enum?: string[];
    /** Property type. */
    type: string;
    /** A dot notation path for `integration` type properties to select a value from the tool integration. If left
     *  blank the full tool integration data will be used.
     */
    path?: string;
    /** API URL for interacting with the trigger property. */
    href?: string;
  }

  /** Trigger property object. */
  export interface TriggerTimerTriggerPropertiesItem {
    /** Property name. */
    name: string;
    /** Property value. Can be empty and should be omitted for `single_select` property type. */
    value?: string;
    /** Options for `single_select` property type. Only needed for `single_select` property type. */
    enum?: string[];
    /** Property type. */
    type: string;
    /** A dot notation path for `integration` type properties to select a value from the tool integration. If left
     *  blank the full tool integration data will be used.
     */
    path?: string;
    /** API URL for interacting with the trigger property. */
    href?: string;
  }

  /** Tekton pipeline triggers object. */
  export interface TriggersCollection {
    /** Tekton pipeline triggers list. */
    triggers: Trigger[];
  }

  /** User information. */
  export interface UserInfo {
    /** IBM Cloud IAM ID. */
    iam_id: string;
    /** User email address. */
    sub: string;
  }

  /** Default pipeline worker used to run the pipeline. */
  export interface Worker {
    /** Name of the worker. Computed based on the worker ID. */
    name?: string;
    /** Type of the worker. Computed based on the worker ID. */
    type?: string;
    /** ID of the worker. */
    id: string;
  }

  /** Worker object containing worker ID only. If omitted the IBM Managed shared workers are used by default. */
  export interface WorkerWithId {
    /** ID of the worker. */
    id: string;
  }

  /** Generic webhook trigger, which triggers a pipeline run when the Tekton Pipeline Service receives a POST event with secrets. */
  export interface TriggerGenericTrigger extends Trigger {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** API URL for interacting with the trigger. */
    href?: string;
    /** Event listener name. The name of the event listener to which the trigger is associated. The event listeners
     *  are defined in the definition repositories of the Tekton pipeline.
     */
    event_listener: string;
    /** ID. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggerGenericTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Worker used to run the trigger. If not specified the trigger will use the default pipeline worker. */
    worker?: Worker;
    /** Defines the maximum number of concurrent runs for this trigger. Omit this property to disable the
     *  concurrency limit.
     */
    max_concurrent_runs?: number;
    /** Flag whether the trigger is disabled. If omitted the trigger is enabled by default. */
    disabled: boolean;
    /** Only needed for generic webhook trigger type. Secret used to start generic webhook trigger. */
    secret?: GenericSecret;
    /** Webhook URL that can be used to trigger pipeline runs. */
    webhook_url?: string;
  }

  /** Manual trigger. */
  export interface TriggerManualTrigger extends Trigger {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** API URL for interacting with the trigger. */
    href?: string;
    /** Event listener name. The name of the event listener to which the trigger is associated. The event listeners
     *  are defined in the definition repositories of the Tekton pipeline.
     */
    event_listener: string;
    /** ID. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggerManualTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Worker used to run the trigger. If not specified the trigger will use the default pipeline worker. */
    worker?: Worker;
    /** Defines the maximum number of concurrent runs for this trigger. Omit this property to disable the
     *  concurrency limit.
     */
    max_concurrent_runs?: number;
    /** Flag whether the trigger is disabled. If omitted the trigger is enabled by default. */
    disabled: boolean;
  }

  /** Git type trigger, which automatically triggers a pipeline run when the Tekton Pipeline Service receives a corresponding Git webhook event. */
  export interface TriggerScmTrigger extends Trigger {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** API URL for interacting with the trigger. */
    href?: string;
    /** Event listener name. The name of the event listener to which the trigger is associated. The event listeners
     *  are defined in the definition repositories of the Tekton pipeline.
     */
    event_listener: string;
    /** ID. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggerScmTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Worker used to run the trigger. If not specified the trigger will use the default pipeline worker. */
    worker?: Worker;
    /** Defines the maximum number of concurrent runs for this trigger. Omit this property to disable the
     *  concurrency limit.
     */
    max_concurrent_runs?: number;
    /** Flag whether the trigger is disabled. If omitted the trigger is enabled by default. */
    disabled: boolean;
    /** SCM source repository for a Git trigger. Only needed for Git triggers. */
    scm_source?: TriggerScmSource;
    /** Only needed for Git triggers. Events object defines the events to which this Git trigger listens. */
    events?: Events;
  }

  /** Timer trigger, which triggers pipeline run according to the cron value and time zone. */
  export interface TriggerTimerTrigger extends Trigger {
    /** Trigger type. */
    type: string;
    /** Trigger name. */
    name: string;
    /** API URL for interacting with the trigger. */
    href?: string;
    /** Event listener name. The name of the event listener to which the trigger is associated. The event listeners
     *  are defined in the definition repositories of the Tekton pipeline.
     */
    event_listener: string;
    /** ID. */
    id?: string;
    /** Trigger properties. */
    properties?: TriggerTimerTriggerPropertiesItem[];
    /** Trigger tags array. */
    tags?: string[];
    /** Worker used to run the trigger. If not specified the trigger will use the default pipeline worker. */
    worker?: Worker;
    /** Defines the maximum number of concurrent runs for this trigger. Omit this property to disable the
     *  concurrency limit.
     */
    max_concurrent_runs?: number;
    /** Flag whether the trigger is disabled. If omitted the trigger is enabled by default. */
    disabled: boolean;
    /** Only needed for timer triggers. Cron expression for timer trigger. Maximum frequency is every 5 minutes. */
    cron?: string;
    /** Only needed for timer triggers. Timezone for timer trigger. */
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
     * Returns the next page of results by invoking listTektonPipelineRuns().
     * @returns {Promise<CdTektonPipelineV2.PipelineRunsCollectionPipelineRunsItem[]>}
     */
    public async getNext(): Promise<CdTektonPipelineV2.PipelineRunsCollectionPipelineRunsItem[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listTektonPipelineRuns(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'start');
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
     * @returns {Promise<CdTektonPipelineV2.PipelineRunsCollectionPipelineRunsItem[]>}
     */
    public async getAll(): Promise<CdTektonPipelineV2.PipelineRunsCollectionPipelineRunsItem[]> {
      const results: PipelineRunsCollectionPipelineRunsItem[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = CdTektonPipelineV2;

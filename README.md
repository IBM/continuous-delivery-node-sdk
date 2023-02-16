
# IBM Cloud Continuous Delivery Node.js SDK 0.3.0

[![Build Status](https://app.travis-ci.com/IBM/continuous-delivery-node-sdk.svg?branch=main)](https://app.travis-ci.com/github/IBM/continuous-delivery-node-sdk)
[![npm](https://img.shields.io/npm/v/@ibm-cloud/continuous-delivery)](https://npmjs.com/package/@ibm-cloud/continuous-delivery)
[![Release](https://img.shields.io/github/v/release/IBM/continuous-delivery-node-sdk)](https://github.com/IBM/continuous-delivery-node-sdk/releases/latest)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Node.js client library to interact with various [Continuous Delivery APIs](https://cloud.ibm.com/apidocs?category=continuous-delivery).

Disclaimer: this SDK is being released initially as a **pre-release** version.
Changes might occur which impact applications that use this SDK.

## Table of Contents

<!--
  The TOC below is generated using the `markdown-toc` node package.

      https://github.com/jonschlinkert/markdown-toc

  You should regenerate the TOC after making changes to this file.

      npx markdown-toc -i README.md
  -->

<!-- toc -->

- [IBM Cloud Continuous Delivery Node.js SDK 0.3.0](#ibm-cloud-continuous-delivery-nodejs-sdk-v030)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Migration](#migration)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Using the SDK](#using-the-sdk)
  - [Questions](#questions)
  - [Issues](#issues)
  - [Open source @ IBM](#open-source--ibm)
  - [Contributing](#contributing)
  - [License](#license)

<!-- tocstop -->

<!-- --------------------------------------------------------------- -->
## Overview

The IBM Cloud Continuous Delivery Node.js SDK allows developers to programmatically interact with the following
IBM Cloud services:

Service Name | Import Path
--- | ---
[Toolchain API](https://cloud.ibm.com/apidocs/toolchain?code=node) | @ibm-cloud/continuous-delivery/cd-toolchain/v2
[Tekton Pipeline API](https://cloud.ibm.com/apidocs/tekton-pipeline?code=node) | @ibm-cloud/continuous-delivery/cd-tektonpipeline/v2

Table 1. IBM Cloud services

<!-- --------------------------------------------------------------- -->
## Migration

`ibm-continuous-delivery` package has been deprecated! 
The IBM Continuous Delivery Node SDK is now available as `@ibm-cloud/continuous-delivery`.

To migrate to the new package, you can use the commands listed below:

```
npm uninstall ibm-continuous-delivery
npm install @ibm-cloud/continuous-delivery
```

You will also need to modify any references to the old package `ibm-continuous-delivery` within import/require statements so they reflect the new package `@ibm-cloud/continuous-delivery`.  Here is an example:

```javascript

// 'require' statements that reflect the old package name:
const CdToolchainV2 = require("ibm-continuous-delivery/cd-toolchain/v2");
const CdTektonPipelineV2 = require("ibm-continuous-delivery/cd-tekton-pipeline/v2");

// Modify this to reflect the new package name:
const CdToolchainV2 = require("@ibm-cloud/continuous-delivery/cd-toolchain/v2");
const CdTektonPipelineV2 = require("@ibm-cloud/continuous-delivery/cd-tekton-pipeline/v2");

```

## Prerequisites

- You need an [IBM Cloud][ibm-cloud-onboarding] account.
- **Node.js >=14**: This SDK is tested with Node.js versions 14 and up. It may work on previous versions but this is not officially supported.

[ibm-cloud-onboarding]: http://cloud.ibm.com/registration

## Installation

The current version of this SDK: 0.3.0

```sh
npm install @ibm-cloud/continuous-delivery
```

## Using the SDK

For general SDK usage information, see [IBM Cloud SDK Common README](https://github.com/IBM/ibm-cloud-sdk-common/blob/main/README.md).

## Questions

If you are having difficulties using this SDK or have a question about the IBM Cloud services,
please ask a question at
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Issues

If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/IBM/continuous-delivery-node-sdk/issues).
Before that, please search for similar issues. It's possible someone has
already encountered this issue.

## Open source @ IBM

Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md).

## License

This project is released under the Apache 2.0 license.
The license's full text can be found in
[LICENSE](LICENSE).

const rootPrefix = '../..',
  ValidateSlackApiAppId = require(rootPrefix + '/middlewares/authentication/ApiAppId'),
  ValidateSlackChannel = require(rootPrefix + '/middlewares/authentication/Channel'),
  ValidateSlackSignature = require(rootPrefix + '/middlewares/authentication/Signature'),
  ValidateSlackUser = require(rootPrefix + '/middlewares/authentication/User'),
  ValidateRawBodyParams = require(rootPrefix + '/middlewares/authentication/RawBodyParams'),
  ValidateRequestHeaders = require(rootPrefix + '/middlewares/authentication/RequestHeaders'),
  ValidateRequestDomain = require(rootPrefix + '/middlewares/authentication/RequestDomain');

/**
 * Class for Authenticator.
 *
 * @class
 */
class Authenticator {
  /**
   * Function to validate slack Api app ID.
   * This method won't be called in case of slash command routes routes. This will be called only for interactive routes.
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {Promise<void>}
   */
  async validateSlackApiAppId(req, res, next) {
    const authResponse = await new ValidateSlackApiAppId({
      rawBody: req.rawBody,
      requestHeaders: req.headers,
      slackRequestParams: req.body
    }).perform();

    if (authResponse.isFailure()) {
      return res.status(200).json('Something went wrong.');
    }

    next();
  }

  /**
   * Function to validate slack channel.
   * This method won't be called in case of interactive routes. This will be called only for slash commands routes.
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {Promise<void>}
   */
  async validateSlackChannel(req, res, next) {
    const authResponse = await new ValidateSlackChannel({
      rawBody: req.rawBody,
      requestHeaders: req.headers,
      slackRequestParams: req.body
    }).perform();

    if (authResponse.isFailure()) {
      return res.status(200).json('Something went wrong.');
    }

    next();
  }

  /**
   * Function to validate slack signature.
   *
   * @param {object} requestRawBody
   * @param {object} requestHeaders
   * @param {object} requestBody
   * @returns {Promise<void>}
   */
  async validateSlackSignature(requestRawBody, requestHeaders, requestBody) {
    const authResponse = await new ValidateSlackSignature({
      rawBody: requestRawBody,
      requestHeaders: requestHeaders,
      slackRequestParams: requestBody
    }).perform();

    if (authResponse.isFailure()) {
      throw new Error('Invalid Slack Signature')
    }
  }

  /**
   * Function to validate slack user.
   *
   * @param {object} requestRawBody
   * @param {object} requestHeaders
   * @param {object} requestBody
   * @returns {Promise<void>}
   */
  async validateSlackUser(requestRawBody, requestHeaders, requestBody) {
    const authResponse = await new ValidateSlackUser({
      rawBody: requestRawBody,
      requestHeaders: requestHeaders,
      slackRequestParams: requestBody
    }).perform();

    if (authResponse.isFailure()) {
      throw new Error('Invalid Slack User')
    }
  }

  /**
   * Function to validate raw body params
   *
   * @param {object} requestRawBody
   * @returns {Promise<void>}
   */
  async validateRawBodyParams(requestRawBody) {
    const authResponse = await new ValidateRawBodyParams({
      rawBody: requestRawBody
    }).perform();

    if (authResponse.isFailure()) {
      throw new Error('Invalid raw body params')
    }
  }

  /**
   * Function to validate request headers
   *
   * @param {object} requestHeaders
   * @returns {Promise<void>}
   */
  async validateRequestHeaders(requestHeaders) {
    const authResponse = await new ValidateRequestHeaders({
      requestHeaders: requestHeaders
    }).perform();

    if (authResponse.isFailure()) {
      throw new Error('Invalid request headers')
    }
  }

  /**
   * Function to validate request domain
   *
   * @param {object} requestBody
   * @returns {Promise<void>}
   */
  async validateRequestDomain(requestBody) {
    const authResponse = await new ValidateRequestDomain({
      slackRequestParams: requestBody
    }).perform();

    if (authResponse.isFailure()) {
      throw new Error('Invalid request domain')
    }
  }
}

module.exports = new Authenticator();

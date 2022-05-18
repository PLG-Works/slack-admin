const rootPrefix = '../..',
configProvider = require(rootPrefix + '/lib/configProvider');

let _slackAppConfigById = null;

/**
 * Class for slack app constants.
 *
 * @class SlackAppConstants
 */
class SlackAppConstants {
  constructor() {
    const oThis = this;

    oThis._setSlackAppConfigById();
  }

  getSigningSecretForAppId(appId) {
    const appConfig = _slackAppConfigById[appId];

    if (!appConfig) return '';

    return appConfig.secret;
  }

  getBotTokenForAppId(appId) {
    const appConfig = _slackAppConfigById[appId];

    if (!appConfig) return '';

    return appConfig.bot_token;
  }

  _setSlackAppConfigById() {

    const configs = configProvider.getFor('app_config');

    if (!Array.isArray(configs)) {
        throw new Error('Array of Object is required.');
    }

    _slackAppConfigById = {};

    for( let index =0; index < configs.length ; index++ ) {
        const config = configs[index];
        _slackAppConfigById[config.id] = {
            id: config.id,
            secret: config.secret,
            bot_token: config.bot_token
        };
    }
  }
}

module.exports = new SlackAppConstants();
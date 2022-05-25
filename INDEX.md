<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [SlackAdmin][1]
    *   [Parameters][2]
    *   [middlewares][3]
    *   [commonMiddlewares][4]
    *   [interactiveEndpointMiddlewares][5]
    *   [slashCommandMiddlewares][6]
    *   [interactiveElements][7]

## SlackAdmin

[index.js:29-116][8]

Class for Slack Admin.

### Parameters

*   `appConfigs` **[array][9]** 
*   `whitelistedChannelIds` **[object][10]** 
*   `domain` **[string][11]** 
*   `whitelistedUsers` **[array][9]** 

### middlewares

[index.js:44-62][12]

Slack admin middlewares

Returns **{validateSignature: Authenticator.validateSlackSignature, assignParams, extractResponseUrlFromPayload, extractResponseUrlFromBody, validateSlackChannel: Authenticator.validateSlackChannel, extractText, extractSlackParams, validateSlackApiAppId: Authenticator.validateSlackApiAppId, formatPayload, sanitizeHeaderParams: Sanitizer.sanitizeHeaderParams, parseApiParameters, sanitizeBodyAndQuery: Sanitizer.sanitizeBodyAndQuery, sanitizeDynamicUrlParams: Sanitizer.sanitizeDynamicUrlParams, validateSlackUser: Authenticator.validateSlackUser, extractTriggerId}** 

### commonMiddlewares

[index.js:69-78][13]

Slack admin common middlewares

Returns **[Array][9]<(any | Sanitizer.sanitizeBodyAndQuery | Authenticator.validateSlackSignature)>** 

### interactiveEndpointMiddlewares

[index.js:85-94][14]

Slack admin interactive endpoints middlewares

Returns **[Array][9]<(Sanitizer.sanitizeDynamicUrlParams | Sanitizer.sanitizeHeaderParams | Authenticator.validateSlackApiAppId | any)>** 

### slashCommandMiddlewares

[index.js:101-103][15]

Slack command middlewares

Returns **[Array][9]<(Authenticator.validateSlackChannel | any)>** 

### interactiveElements

[index.js:110-115][16]

Slack interactive element middlewares

Returns **{Message, Modal}** 

[1]: #slackadmin

[2]: #parameters

[3]: #middlewares

[4]: #commonmiddlewares

[5]: #interactiveendpointmiddlewares

[6]: #slashcommandmiddlewares

[7]: #interactiveelements

[8]: https://github.com/PLG-Works/slack-admin/blob/42b5cbe7078f1e2eb48ff2b7273d1a7ca9d1d615/index.js#L29-L116 "Source code on GitHub"

[9]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[10]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[12]: https://github.com/PLG-Works/slack-admin/blob/42b5cbe7078f1e2eb48ff2b7273d1a7ca9d1d615/index.js#L44-L62 "Source code on GitHub"

[13]: https://github.com/PLG-Works/slack-admin/blob/42b5cbe7078f1e2eb48ff2b7273d1a7ca9d1d615/index.js#L69-L78 "Source code on GitHub"

[14]: https://github.com/PLG-Works/slack-admin/blob/42b5cbe7078f1e2eb48ff2b7273d1a7ca9d1d615/index.js#L85-L94 "Source code on GitHub"

[15]: https://github.com/PLG-Works/slack-admin/blob/42b5cbe7078f1e2eb48ff2b7273d1a7ca9d1d615/index.js#L101-L103 "Source code on GitHub"

[16]: https://github.com/PLG-Works/slack-admin/blob/42b5cbe7078f1e2eb48ff2b7273d1a7ca9d1d615/index.js#L110-L115 "Source code on GitHub"

### slackAdmin usage

```javascript
router.use(slackAdmin.commonMiddlewares);

// interactive-endpoint specific middlewares
router.post('/interactive-endpoint', 
    slackAdmin.interactiveEndpointMiddlewares, 
    async function(req, res, next) {
        // your business logic
    }
);

// '/' command specific middlewares
router.use(slackAdmin.slashCommandMiddlewares);
```
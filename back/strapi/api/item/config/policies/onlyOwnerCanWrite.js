'use strict';

/**
 * `onlyOwnerCanWrite` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  const {user, route, i18n, getLocale, isPreferredLocale, session, ...context} = ctx.state;
  console.log('In onlyOwnerCanWrite policy.', session);

  ctx.unauthorized(`You're not allowed to perform this action!`);

  //await next();
};

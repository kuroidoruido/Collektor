"use strict";

/**
 * `isOwner` policy.
 */

module.exports = async (ctx, next) => {
  const { role, id } = ctx.state.user;

  // defined only when a specific collection is ask
  const fieldId = ctx.params.id;

  if (typeof fieldId !== "undefined") {
    Item.fetchAll({ id: fieldId, owner: id }).then(result => {
      if (!result && role.type !== "administrator") {
        return ctx.unauthorized("You are not allowed to perform this action.");
      }
    });
  } else {
    if(typeof ctx.query.owner === 'undefined' && role !== "administrator") {
       ctx.query.owner = id;
    }
  }

  await next();
};
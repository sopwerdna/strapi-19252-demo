'use strict';

/**
 * task controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({ strapi }) => ({
  async findCustom(ctx) {
    console.log("in custom find controller");
    return strapi.controller("api::task.task").findOne(ctx);
  }
}));

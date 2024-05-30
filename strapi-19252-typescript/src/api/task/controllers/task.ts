/**
 * task controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::task.task', ({ strapi }) => ({
  async findCustom(ctx) {
    console.log("in custom find controller");
    return strapi.controller("api::task.task").findOne(ctx);
  }
}));

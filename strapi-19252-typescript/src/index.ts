export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  async register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(/*{ strapi }*/) {
    let newTask = await strapi.entityService.create("api::task.task", {
      data: {
        visible: true,
      },
    });
    let newUser = await strapi.entityService.create("plugin::users-permissions.user", {
      data: {
        username: `test${newTask.id}`,
        email: "a@b.com"
      },
    });


    const task = await strapi.entityService.findOne("api::task.task", newTask.id, {
      populate: ["users"],
    });
    console.log("new task from entityService, users should be empty", task, task.users.length);

    const updatedTask = await strapi.entityService.update("api::task.task", newTask.id, {
      data: {
        users: { connect: [{id: 1}, {id: 2}]},
      },
      populate: ["users"],
    });
    console.log("updated task, users should contain 1 and 2", updatedTask);
    console.log("users should not be empty", updatedTask.users.length, updatedTask.users.map(u => u.id));
  },
};

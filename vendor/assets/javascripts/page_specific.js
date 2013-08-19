/*
 * This is a page-specific JavaScript framework (primarily for Rails).
 *
 * It allows you to target JS to run on all pages, for a specific action on all pages (e.g. index),
 * for all actions for a specific controller, or for one page (specific controller/action).
 *
 * See README file for installation info and examples.
 */

PageSpecific = {

  init: function(application, debug) {
    var controllerName = $('body').attr('data-controller_name');
    var actionName = $('body').attr('data-action_name');
    var controllerSpecificCodeClassname;
    var actionMethodName;

    PageSpecific.debugging = debug;

    if (controllerName != undefined) {
      controllerSpecificCodeClassname = PageSpecific.camelize(controllerName);
      PageSpecific.debug('controllerSpecificCodeClassname = '+ controllerSpecificCodeClassname);
    }
    if (actionName != undefined) {
      actionMethodName = PageSpecific.camelize(actionName, true) + 'Action';
      PageSpecific.debug('actionMethodName = '+ actionMethodName);
    }

    if (application.PageSpecific &&
        application.PageSpecific.AllControllers) {
      if (application.PageSpecific.AllControllers.allActions) {
        PageSpecific.debug('calling AllControllers.allActions');
        application.PageSpecific.AllControllers.allActions();
      }
      if (actionMethodName && application.PageSpecific.AllControllers[actionMethodName]) {
        application.PageSpecific.AllControllers[actionMethodName]();
      }
    }

    if (controllerSpecificCodeClassname && application.PageSpecific[controllerSpecificCodeClassname]) {
      PageSpecific.debug('detected '+ controllerSpecificCodeClassname);
      if (application.PageSpecific[controllerSpecificCodeClassname].allActions) {
        PageSpecific.debug('calling '+ controllerSpecificCodeClassname +'.allActions');
        application.PageSpecific[controllerSpecificCodeClassname].allActions();
      }

      if (actionMethodName && application.PageSpecific[controllerSpecificCodeClassname][actionMethodName]) {
        PageSpecific.debug('calling '+ controllerSpecificCodeClassname + "." + actionMethodName);
        application.PageSpecific[controllerSpecificCodeClassname][actionMethodName]();
      }
    }
  },

  camelize: function(str, lowerFirstChar) {
    var newStr = str.replace(/[_-](.)/g, function(match, firstChar) {
      return firstChar.toUpperCase();
    });
    if (lowerFirstChar) {
      return newStr;
    } else {
      return newStr.replace(/^(.)/, function(match, firstChar) {
        return firstChar.toUpperCase();
      });
    }
  },

  debug: function(message) {
    if (PageSpecific.debugging) {
      console.debug('PageSpecific: ' + message);
    }
  }
};

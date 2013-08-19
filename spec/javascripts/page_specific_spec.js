DummyAppWithoutPageSpecific = {};

DummyAppWithoutAllControllers = {
  PageSpecific: {
  }
};

DummyAppWithAllControllers = {
  PageSpecific: {
    AllControllers: {
    }
  }
};

DummyApplication = {
  PageSpecific: {
    AllControllers: {
      allActions: function() {},
      someactionAction: function() {}
    },
    TestOneController: {
      // This controller-specific class has neither allActions nor an action-specifc method
    },
    TestTwoController: {
      // This controller has both allActions and an action-specific method
      allActions: function() {},
      someactionAction: function() {
        console.debug('someactionAction was called');
      },
      dashedActionAction: function() {
        // should be invoked for action "dashed-action"
      }
    }
  }
};

describe("PageSpecific", function() {
  var $appClassToTest;

  describe(".init", function() {

    describe("for an app that doesn't have a PageSpecific class", function() {
      beforeEach(function() {
        appClassToTest = DummyAppWithoutPageSpecific;
      });

      it("should not throw an exception", function() {
        expect(function() {
          PageSpecific.init(appClassToTest);
        }).not.toThrow();
      });
    });

    describe("for an app that doesn't have AllControllers", function() {
      beforeEach(function() {
        appClassToTest = DummyAppWithoutAllControllers;
      });

      it("should not throw an exception", function() {
        expect(function() {
          PageSpecific.init(appClassToTest);
        }).not.toThrow();
      });
    });

    describe("for an app that does have AllControllers", function() {
      beforeEach(function() {
        appClassToTest = DummyAppWithAllControllers;
      });

      describe("for an app that doesn't have AllControllers.allActions or a AllControllers.<current action>Action method", function() {
        beforeEach(function() {
          $('body').attr('data-controller_name', 'irrelevant_controller');
          $('body').attr('data-action_name', 'someaction');
        });

        it("should not throw an exception", function() {
          expect(function() {
            PageSpecific.init(appClassToTest);
          }).not.toThrow();
        });
      });

      describe("for an app that does have AllControllers.allActions and a AllControllers.<current action>Action method", function() {
        beforeEach(function() {
          appClassToTest = DummyApplication;
        });

        it("should invoke App.PageSpecific.AllControllers.allActions method", function() {
          spyOn(DummyApplication.PageSpecific.AllControllers, 'allActions');
          PageSpecific.init(appClassToTest);
          expect(DummyApplication.PageSpecific.AllControllers.allActions).toHaveBeenCalled();
        });

        it("should invoke App.PageSpecific.AllControllers.<currentaction>Action", function() {
          spyOn(DummyApplication.PageSpecific.AllControllers, 'someactionAction');
          PageSpecific.init(appClassToTest);
          expect(DummyApplication.PageSpecific.AllControllers.someactionAction).toHaveBeenCalled();
        });
      });
    });
  });

  describe("for a page whose body doesn't have data-controller_name or data-action_name attributes", function() {
    it("should not throw an exception", function() {
      expect(function() {
        PageSpecific.init(DummyApplication);
      }).not.toThrow();
    });
  });

  describe("if there is no controller-specific class for this controller", function() {
    beforeEach(function() {
      $('body').attr('data-controller_name', 'missing_controller');
      $('body').attr('data-action_name', 'someaction');
    });

    it("should not throw an exception", function() {
      expect(function() {
        PageSpecific.init(DummyApplication);
      }).not.toThrow();
    });
  });

  describe("if the controller-specific class does not have an all-actions method or action-specifc method", function() {
    beforeEach(function() {
      $('body').attr('data-controller_name', 'test_one_controller');
      $('body').attr('data-action_name', 'someaction');
    });

    it("should not throw an exception", function() {
      expect(function() {
        PageSpecific.init(DummyApplication);
      }).not.toThrow();
    });
  });

  describe("if the controller-specific class has an all-actions method", function() {
    beforeEach(function() {
      $('body').attr('data-controller_name', 'test_two_controller');
      $('body').attr('data-action_name', 'someaction');
    });

    it("should call the controller-specific AllActions method", function() {
      spyOn(DummyApplication.PageSpecific.TestTwoController, 'allActions');
      PageSpecific.init(DummyApplication);
      expect(DummyApplication.PageSpecific.TestTwoController.allActions).toHaveBeenCalled();
    });
  });

  describe("if the controller-specific class has an action method for this action", function() {
    beforeEach(function() {
      $('body').attr('data-controller_name', 'test_two_controller');
      $('body').attr('data-action_name', 'someaction');
    });

    it("should call the controller+action specific method", function() {
      spyOn(DummyApplication.PageSpecific.TestTwoController, 'someactionAction');
      PageSpecific.init(DummyApplication);
      expect(DummyApplication.PageSpecific.TestTwoController.someactionAction).toHaveBeenCalled();
    });
  });

  describe("when the action has a dash in it", function() {
    beforeEach(function() {
      $('body').attr('data-controller_name', 'test_two_controller');
      $('body').attr('data-action_name', 'dashed-action');
    });

    it("should convert the dashed action to camelcase and call the controller+action specific method", function() {
      spyOn(DummyApplication.PageSpecific.TestTwoController, 'dashedActionAction');
      PageSpecific.init(DummyApplication);
      expect(DummyApplication.PageSpecific.TestTwoController.dashedActionAction).toHaveBeenCalled();
    });
  });
});

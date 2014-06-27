// Test that HTTPS Everywhere component is installed and accessible

const { Cc, Ci } = require("chrome");

let HTTPSEverywhere = Cc["@eff.org/https-everywhere;1"]
                        .getService(Ci.nsISupports)
                        .wrappedJSObject;

exports["test httpse installed"] = function(assert) {
  assert.equal(typeof HTTPSEverywhere, "object",
               "Test that HTTPSEverywhere is defined");
  assert.equal(typeof HTTPSEverywhere.observe, "function",
               "Test that HTTPSEverywhere.observe is a function");
};

exports["test httpse potentiallyApplicableRulesets"] = function(assert) {
  let HTTPSRules = HTTPSEverywhere.https_rules;
  assert.deepEqual(HTTPSRules.potentiallyApplicableRulesets("www.eff.org").length,
              1,
              "Test that HTTPSE finds one applicable rule for www.eff.org");
}

require("sdk/test").run(exports);

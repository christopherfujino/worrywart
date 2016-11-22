/*
 *  var inc = new Incident({
 *    type: "weather",
 *    intensity: 5
 *  });
 */

function Incident (desc) {
  this.type = this.sanitize(desc.type);
  if(desc.intensity >= 1 && desc.intensity <= 10) {
    this.intensity = desc.intensity;
  } else this.intensity = 5;
  this.date = new Date();
}

Incident.prototype.sanitize = function (string) {
  if (typeof string !== "string" || string.length === 0) return "misc";
  string = string.toLowerCase();
  var regExpTest = /\w/;
  while(!regExpTest.test(string[0])) {
    string = string.slice(1);
  }
  while(!regExpTest.test(string[string.length - 1])) {
    string = string.slice(0, string.length -1);
  }
  return string;
};

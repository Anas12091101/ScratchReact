export function convertFormDataToJSON(formData) {
  var object = {};
  formData.forEach((value, key) => (object[key] = value));
  return object;
}

function errorHandler(err) { // 404  "404"
  var result = "";
  var codeType = err.toString()[0]; // 1, 2, 3, 4, 5  ... first letter of 
  switch (codeType) {
    case "1":
      break;
    case "2":
      break;
    case "3":
      result = redirectionError(err);
      break;
    case "4":
      result = clientError(err);
      break;
    case "5":
      result = serverError(err);
      break;
    default:
      break;
  }
  return result;
}

function clientError(err) {
  // 404
  switch (err) {
    case 401:
      return "Yo man, you can't be here";
    case 402:
      return "Yo man, got some cash punk?";
    case 403:
      return "Hehehehe, assour lihyot kan!";
    case 404:
      return "Yo man, are you lost? aint nothing here for you";

    default:
      return err;
  }
}
function serverError(err) {
  switch (err) {
    case 501:
      break;
    case 502:
      break;
    case 503:
      break;
    case 504:
      break;

    default:
      console.log(err);
      break;
  }
}

function redirectionError(err) {
  switch (err) {
    case 301:
      break;
    case 302:
      break;
    case 303:
      break;
    case 304:
      break;

    default:
      console.log(err);
      break;
  }
}

export { errorHandler };





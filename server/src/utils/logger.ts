import debug from "debug";

const log = {
  info: debug("app:info"),
  error: debug("app:error"),
  warn: debug("app:warn"),
};

export default log;

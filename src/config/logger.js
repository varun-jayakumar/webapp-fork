import { createLogger, format, transports, config } from "winston";
const { combine, timestamp, label, prettyPrint, colorize } = format;

const logger = createLogger({
  levels: config.npm.levels,
  format: combine(format.json(), timestamp()),
  defaultMeta: { service: "webapp-service" },
  transports: [],
});

if (process.env.NODE_ENV === "production") {
  logger.add(new transports.File({ filename: "/var/log/webapp/webapp.log" }));
} else {
  logger.add(
    new transports.Console({
      format: format.json(),
    })
  );
}

logger.error("test error loggger level");
logger.debug("test debug logger level");
logger.warn("test warn logger level");
logger.info("test warn logger level");

export default logger;

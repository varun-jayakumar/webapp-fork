import { createLogger, format, transports, config } from "winston";
const { combine, timestamp } = format;

const logger = createLogger({
  level: "debug",
  format: combine(format.json(), timestamp()),
  defaultMeta: { service: "webapp-service" },
  transports: [],
});

if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.File({
      filename: "/var/log/webapp/webapp.log",
      format: format.combine(timestamp(), format.json()),
    })
  );
} else {
  logger.add(
    new transports.Console({
      format: format.json(),
    })
  );
}

export default logger;

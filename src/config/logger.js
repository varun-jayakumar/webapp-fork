import { createLogger, format, transports, config } from "winston";
const { combine, timestamp, label, prettyPrint, colorize } = format;

const logger = createLogger({
  levels: config.npm.levels,
  format: combine(format.json(), timestamp()),
  defaultMeta: { service: "webapp-service" },
  transports: [new transports.File({ filename: "/var/log/webapp/webapp.log" })],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.json(),
    })
  );
}

export default logger;

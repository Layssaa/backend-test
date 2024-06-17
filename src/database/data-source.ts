import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from "../config";
import { User } from "../entity/User";

export const DbSource = new DataSource({
  type: "postgres",
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],

  migrations: ["src/database/migration/*.ts"],
  subscribers: [],
});

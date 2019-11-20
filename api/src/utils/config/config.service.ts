import * as dotenv from "dotenv";
import * as Joi from "@hapi/joi";

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const config = this.parseConfig(dotenv.config().parsed);
    this.envConfig = this.validateInput(config);
  }

  parseConfig(config) {
    const { DB_URL, PORT, NODE_ENV } = process.env;
    return {
      DB_URL: DB_URL || config.DB_URL,
      PORT: PORT || config.PORT,
      NODE_ENV: NODE_ENV || config.NODE_ENV
    };
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get port(): string {
    return this.envConfig.PORT;
  }

  get dbURL(): string {
    return this.envConfig.DB_URL;
  }

  get env(): string {
    return this.envConfig.NODE_ENV;
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(["development", "production", "test", "provision"])
        .default("development"),
      PORT: Joi.number().default(4000),
      DB_URL: Joi.string().required()
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

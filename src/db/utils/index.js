import s from "sequelize";

const Sequelize = s.Sequelize;

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Success");
  } catch (error) {
    console.log(`Unable to connect due to following error: ${error}`);
  }
};
test();

export default sequelize;

import Sequelize, { Model } from 'sequelize';

class WorkSchedule extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default WorkSchedule;

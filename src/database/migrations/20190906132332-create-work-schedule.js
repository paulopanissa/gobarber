module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('work_schedules', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('work_schedules');
  },
};

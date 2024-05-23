module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'id',
        }
      }
    });
  
    Request.associate = (models) => {
      Request.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee'
      });
    };
  
    return Request;
  };
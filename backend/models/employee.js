module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hire_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Employee.associate = (models) => {
    Employee.hasMany(models.Request, {
      foreignKey: "employee_id",
      as: "requests",
    });
  };

  return Employee;
};

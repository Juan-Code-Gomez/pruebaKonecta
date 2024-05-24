const employeeController = require('../../controllers/employeeController');
const db = require('../../models');

jest.mock('../../models'); 

describe('Employee Controller', () => {
  describe('createEmployee', () => {
    it('should create a new employee and return it', async () => {
      const req = {
        body: { name: 'John Doe', position: 'Developer', hire_date: '2023-01-01', salary: 60000 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      db.Employee.create.mockResolvedValue(req.body);

      await employeeController.createEmployee(req, res);

      expect(db.Employee.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should handle errors', async () => {
      const req = { body: { name: 'John Doe', position: 'Developer', hire_date: '2023-01-01', salary: 60000 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const errorMessage = 'Failed to create employee'; 
      db.Employee.create.mockRejectedValue(new Error(errorMessage));

      await employeeController.createEmployee(req, res);

      expect(db.Employee.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage }); 
    });
  });
});

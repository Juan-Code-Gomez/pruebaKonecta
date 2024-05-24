const requestController = require('../../controllers/requestController');
const db = require('../../models');

jest.mock('../../models'); // Mockea todo el módulo de models

describe('Request Controller', () => {
  describe('getAllRequests', () => {
    it('should retrieve all requests with pagination', async () => {
      const req = {
        query: { page: 1, limit: 10 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const requests = {
        count: 2,
        rows: [
          { id: 1, code: 'REQ001', description: 'Request 1' },
          { id: 2, code: 'REQ002', description: 'Request 2' }
        ]
      };

      db.Request.findAndCountAll.mockResolvedValue(requests);

      await requestController.getAllRequests(req, res);

      expect(db.Request.findAndCountAll).toHaveBeenCalledWith({
        where: {},
        limit: 10,
        offset: 0,
        include: [
          {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "name"],
          },
        ],
      });
      expect(res.json).toHaveBeenCalledWith({
        totalItems: requests.count,
        totalPages: 1,
        currentPage: 1,
        data: requests.rows,
      });
    });

    it('should handle errors', async () => {
      const req = { query: { page: 1, limit: 10 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const errorMessage = 'Failed to retrieve requests';
      db.Request.findAndCountAll.mockRejectedValue(new Error(errorMessage));

      await requestController.getAllRequests(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('createRequest', () => {
    it('should create a new request and return it', async () => {
      const req = {
        body: { code: 'REQ001', description: 'Request 1', summary: 'Summary', status: 'Open', employee_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      db.Request.create.mockResolvedValue(req.body);

      await requestController.createRequest(req, res);

      expect(db.Request.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should handle errors', async () => {
      const req = {
        body: { code: 'REQ001', description: 'Request 1', summary: 'Summary', status: 'Open', employee_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const errorMessage = 'Failed to create request';
      db.Request.create.mockRejectedValue(new Error(errorMessage));

      await requestController.createRequest(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('deleteRequest', () => {
    it('should delete a request and return 204', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      db.Request.destroy.mockResolvedValue(1); // Mockea que 1 fila fue afectada (eliminada)

      await requestController.deleteRequest(req, res);

      expect(db.Request.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledWith("Successfully Removed");
    });

    it('should handle errors', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const errorMessage = 'Failed to delete request';
      db.Request.destroy.mockRejectedValue(new Error(errorMessage));

      await requestController.deleteRequest(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
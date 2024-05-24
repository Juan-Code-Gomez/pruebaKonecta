import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import RequestList from "../../src/components/Request/RequestList";
import api from "../../src/services/api";

jest.mock("../../src/services/api");

describe('RequestList Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: MemoryRouter });
  };

  it('renders loading state initially', () => {
    // Mock the API call to resolve with an empty data set
    api.get.mockResolvedValueOnce({ data: { data: [], totalPages: 1, currentPage: 1 } });

    renderWithRouter(<RequestList />);

    // Check that the loading text is displayed initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message on fetch error', async () => {
    // Mock the API call to reject with an error
    api.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    renderWithRouter(<RequestList />);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('An error occurred while fetching requests.')).toBeInTheDocument();
    });
  });

  it('renders list of requests', async () => {
    const requests = [
      { id: 1, code: 'REQ001', description: 'Request 1', summary: 'Summary 1', status: 'Open', employee: { name: 'John Doe' }, createdAt: '2023-01-01T00:00:00Z' },
      { id: 2, code: 'REQ002', description: 'Request 2', summary: 'Summary 2', status: 'Closed', employee: { name: 'Jane Smith' }, createdAt: '2023-01-02T00:00:00Z' },
    ];

    // Mock the API call to resolve with a list of requests
    api.get.mockResolvedValueOnce({ data: { data: requests, totalPages: 1, currentPage: 1 } });

    renderWithRouter(<RequestList />);

    // Wait for the requests to be displayed
    await waitFor(() => {
      expect(screen.getByText('REQ001')).toBeInTheDocument();
      expect(screen.getByText('Request 1')).toBeInTheDocument();
      expect(screen.getByText('Summary 1')).toBeInTheDocument();
      expect(screen.getByText('Open')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('1/1/2023, 12:00:00 AM')).toBeInTheDocument();

      expect(screen.getByText('REQ002')).toBeInTheDocument();
      expect(screen.getByText('Request 2')).toBeInTheDocument();
      expect(screen.getByText('Summary 2')).toBeInTheDocument();
      expect(screen.getByText('Closed')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('1/2/2023, 12:00:00 AM')).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    const requestsPage1 = [
      { id: 1, code: 'REQ001', description: 'Request 1', summary: 'Summary 1', status: 'Open', employee: { name: 'John Doe' }, createdAt: '2023-01-01T00:00:00Z' },
    ];
    const requestsPage2 = [
      { id: 2, code: 'REQ002', description: 'Request 2', summary: 'Summary 2', status: 'Closed', employee: { name: 'Jane Smith' }, createdAt: '2023-01-02T00:00:00Z' },
    ];

    // Mock the API call to resolve with different pages
    api.get
      .mockResolvedValueOnce({ data: { data: requestsPage1, totalPages: 2, currentPage: 1 } })
      .mockResolvedValueOnce({ data: { data: requestsPage2, totalPages: 2, currentPage: 2 } });

    renderWithRouter(<RequestList />);

    // Wait for the first page of requests to be displayed
    await waitFor(() => {
      expect(screen.getByText('REQ001')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Siguiente'));

    // Wait for the second page of requests to be displayed
    await waitFor(() => {
      expect(screen.getByText('REQ002')).toBeInTheDocument();
    });
  });

  it('opens and closes the modal', async () => {
    renderWithRouter(<RequestList />);

    fireEvent.click(screen.getByText('Crear solicitud'));

    // Wait for the modal to be displayed
    await waitFor(() => {
      expect(screen.getByText('Crear Solicitud')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cerrar'));

    // Wait for the modal to be closed
    await waitFor(() => {
      expect(screen.queryByText('Crear Solicitud')).not.toBeInTheDocument();
    });
  });
});
type ApiResponse<T> = {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string | Record<string, any>;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export default ApiResponse;

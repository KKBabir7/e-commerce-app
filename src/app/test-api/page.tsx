'use client';

import { useState, useEffect } from 'react';

export default function TestApiPage() {
  const [apiResponses, setApiResponses] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testApis() {
      try {
        const apis = [
          { name: 'All Products', url: 'https://mm-assesment-server.vercel.app/api/v1/products' },
          { name: 'Categories', url: 'https://mm-assesment-server.vercel.app/api/v1/products/categories' },
          { name: 'Jewelry Category', url: 'https://mm-assesment-server.vercel.app/api/v1/products/category/jewelery' },
          { name: 'Single Product', url: 'https://mm-assesment-server.vercel.app/api/v1/products/1' }
        ];

        const responses: any = {};

        for (const api of apis) {
          try {
            const response = await fetch(api.url);
            const data = await response.json();
            responses[api.name] = {
              url: api.url,
              status: response.status,
              statusText: response.statusText,
              data: data,
              headers: Object.fromEntries(response.headers.entries())
            };
          } catch (err) {
            responses[api.name] = {
              url: api.url,
              error: err instanceof Error ? err.message : 'Unknown error'
            };
          }
        }

        setApiResponses(responses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    testApis();
  }, []);

  if (loading) return <div className="p-8">Testing APIs...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">API Test Results</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {Object.entries(apiResponses).map(([name, response]: [string, any]) => (
        <div key={name} className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-sm text-gray-600 mb-2">URL: {response.url}</p>
          
          {response.status && (
            <div className="mb-2">
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                response.status >= 200 && response.status < 300 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                Status: {response.status} {response.statusText}
              </span>
            </div>
          )}
          
          {response.error ? (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded">
              <strong>Error:</strong> {response.error}
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Response Data:</h3>
              <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
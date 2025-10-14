import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AuthCallback = () => {
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const handleAuthCallback = () => {
      try {
        
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userStr = params.get('user');
        const error = params.get('error');

        if (error) {
          setStatus('error');
          console.error('Auth error:', error);
          setTimeout(() => {
            window.location.href = '/signup?error=' + error;
          }, 2000);
          return;
        }

        if (!token || !userStr) {
          setStatus('error');
          console.error('Missing token or user data');
          setTimeout(() => {
            window.location.href = '/signup?error=missing_data';
          }, 2000);
          return;
        }

        // Parse user data
        const user = JSON.parse(decodeURIComponent(userStr));

        // Store auth data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setStatus('success');

        // Redirect to dashboard or home
        setTimeout(() => {
          window.location.href = '/'; // Change to your dashboard route
        }, 1500);

      } catch (err) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setTimeout(() => {
          window.location.href = '/signup?error=callback_failed';
        }, 2000);
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-12 text-center">
          {status === 'processing' && (
            <>
              <div className="w-16 h-16 mx-auto mb-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Authenticating...
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Please wait while we sign you in
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Success!
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Redirecting to your dashboard...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Authentication Failed
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Redirecting back to sign up...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;
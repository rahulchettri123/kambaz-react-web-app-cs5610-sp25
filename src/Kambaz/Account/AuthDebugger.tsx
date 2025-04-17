import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkAuthStatus } from './client';
import { Button, Card } from 'react-bootstrap';

export default function AuthDebugger() {
  const [serverStatus, setServerStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get current user from Redux store
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const checkAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const status = await checkAuthStatus();
      setServerStatus(status);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="auth-debugger mt-4">
      <h3>Authentication Debugger</h3>
      
      <Card className="mb-3">
        <Card.Header>Client-Side Authentication State</Card.Header>
        <Card.Body>
          <div>
            <strong>Authenticated: </strong>
            {currentUser ? 'Yes' : 'No'}
          </div>
          {currentUser && (
            <>
              <div><strong>User ID: </strong>{currentUser._id}</div>
              <div><strong>Username: </strong>{currentUser.username}</div>
              <div><strong>Role: </strong>{currentUser.role}</div>
            </>
          )}
        </Card.Body>
      </Card>
      
      <Card className="mb-3">
        <Card.Header>Server-Side Authentication Check</Card.Header>
        <Card.Body>
          <Button 
            onClick={checkAuth} 
            disabled={isLoading}
            className="mb-3">
            {isLoading ? 'Checking...' : 'Check Server Auth Status'}
          </Button>
          
          {error && (
            <div className="alert alert-danger">
              Error: {error}
            </div>
          )}
          
          {serverStatus && (
            <div className="mt-3">
              <div>
                <strong>Server reports authenticated: </strong>
                {serverStatus.authenticated ? 'Yes' : 'No'}
              </div>
              
              {serverStatus.authenticated && serverStatus.user && (
                <>
                  <div><strong>User ID: </strong>{serverStatus.user._id}</div>
                  <div><strong>Username: </strong>{serverStatus.user.username}</div>
                  <div><strong>Role: </strong>{serverStatus.user.role}</div>
                </>
              )}
              
              {!serverStatus.authenticated && (
                <div className="text-danger">
                  {serverStatus.message || 'Not authenticated on server'}
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Header>Authentication Troubleshooting</Card.Header>
        <Card.Body>
          <ul>
            <li>If you're authenticated on the client but not on the server, there's a cookie/session issue.</li>
            <li>Check your browser's developer tools → Application → Cookies to ensure cookies are being set.</li>
            <li>Ensure your server's CORS settings are correctly configured.</li>
            <li>Try signing out and signing back in.</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
} 
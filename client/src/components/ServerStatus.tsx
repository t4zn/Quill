import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function ServerStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [serverInfo, setServerInfo] = useState<any>(null);

  const checkServer = async () => {
    setStatus('checking');
    try {
      const response = await fetch('/api/test');
      if (response.ok) {
        const data = await response.json();
        setServerInfo(data);
        setStatus('connected');
      } else {
        setStatus('disconnected');
      }
    } catch (error) {
      console.error('Server check failed:', error);
      setStatus('disconnected');
    }
  };

  useEffect(() => {
    checkServer();
  }, []);

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {status === 'checking' && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === 'connected' && <CheckCircle className="h-4 w-4 text-green-500" />}
          {status === 'disconnected' && <XCircle className="h-4 w-4 text-red-500" />}
          
          <span className="font-medium">
            Server Status: {status === 'checking' ? 'Checking...' : status === 'connected' ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        <Button variant="outline" size="sm" onClick={checkServer}>
          Refresh
        </Button>
      </div>
      
      {serverInfo && (
        <div className="mt-2 text-sm text-muted-foreground">
          Last check: {new Date(serverInfo.timestamp).toLocaleTimeString()}
        </div>
      )}
      
      {status === 'disconnected' && (
        <div className="mt-2 text-sm text-red-600">
          Make sure the server is running with: npm run dev
        </div>
      )}
    </Card>
  );
}
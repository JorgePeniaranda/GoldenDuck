import { toast } from 'sonner';
import { POSTLogin } from "../api/login";
import { AlertsMessages } from "../messages/alerts";
import { LoginDTO } from "../types/dto";

export async function login(data: LoginDTO): Promise<void> {
  const response = Promise.resolve(POSTLogin(data));

  toast.promise(response, {
    loading: 'Loading...',
    success: () => {
      window.location.href = '/dashboard';
      return AlertsMessages.success;
    },
    error: (error) => {
      return error.message;
    }
  });
}
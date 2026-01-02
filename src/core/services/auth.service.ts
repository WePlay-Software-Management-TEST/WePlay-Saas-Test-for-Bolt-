import { supabase } from './supabase.client';
import { type RegistrationStepsFrom } from '../../features/signup/models/signup.models';
import { type UserAttributesState } from 'core/models/userContext.model';

export async function sendEmailConfirmation (userEmail: string): Promise<any> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: Math.random().toString(36).slice(-16),
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) throw error;
    return data.user;
  } catch (error) {
    console.log('Error signing up:', error);
    throw error;
  }
}

export async function reSendEmailVerification (userEmail: string): Promise<any> {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: userEmail
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.log('Error Resending Validation E-mail', error);
  }
}

export async function changeDefaultPassword (userEmail: string, newPassword: string, type = 'newUser', tempPass?: string | null): Promise<void> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
  } catch (e) {
    console.log(e);
  }
}

export async function createAccount (form: RegistrationStepsFrom, userId: string, businessID: string): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session');
  }
}

export async function createInviteAccount (form: RegistrationStepsFrom, type: string = 'ADMIN'): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();

  if (!session || !user) {
    throw new Error('No active session or user');
  }
}

export async function loginRequest (
  { username, password }:
  { username: string, password: string }
): Promise<UserAttributesState> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
  });

  if (error) throw error;
  if (!data.user || !data.session) throw new Error('Login failed');

  const userAttributes: UserAttributesState = {
    id: data.user.id,
    username: data.user.email || '',
    attributes: {
      email: data.user.email || '',
      sub: data.user.id,
      email_verified: data.user.email_confirmed_at !== null
    },
    idToken: data.session.access_token
  };

  return userAttributes;
}

export async function forgotPasswordRequest (username: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(username, {
    redirectTo: `${window.location.origin}/changepassword`
  });

  if (error) throw error;
}

export async function changePasswordRequest (user: string, code: string, password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) throw error;
}

export async function signOut (): Promise<void> {
  await supabase.auth.signOut();
}

export async function inviteUser (email: string, role: string): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session');
  }
}

export async function removeUser (data: any): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session');
  }
}

export async function listUsersQuery (getAll = false): Promise<any> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session');
  }

  return { data: { listContacts: { items: [] } } };
}

export async function getCurrentSession (): Promise<{ idToken: string }> {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    throw new Error('No active session');
  }

  return { idToken: session.access_token };
}

export async function getCurrentUser (): Promise<any> {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('No authenticated user');
  }

  return {
    username: user.email,
    attributes: {
      email: user.email,
      sub: user.id
    }
  };
}

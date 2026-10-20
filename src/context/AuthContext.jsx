import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);
const DEMO_USER_STORAGE_KEY = 'veyra_active_user';

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to extract a friendly user object from Supabase user or session
  const mapSupabaseUser = (supabaseUser) => {
    if (!supabaseUser) return null;
    const metadata = supabaseUser.user_metadata || {};
    const nameFromEmail = supabaseUser.email ? supabaseUser.email.split('@')[0] : 'Collector';
    const formattedName =
      metadata.full_name ||
      metadata.name ||
      (nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));

    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      name: formattedName,
      role: metadata.role || 'collector',
      studio: metadata.studio || null,
      isSupabase: true
    };
  };

  // Restore session and subscribe to auth changes
  useEffect(() => {
    let mounted = true;

    if (isSupabaseConfigured && supabase) {
      // 1. Fetch current active session from Supabase
      supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
        if (!mounted) return;
        if (error) {
          console.warn('Supabase getSession warning:', error.message);
        }
        if (initialSession) {
          setSession(initialSession);
          setUser(mapSupabaseUser(initialSession.user));
        } else {
          // If no Supabase session, check if there was a local demo user
          const savedDemo = localStorage.getItem(DEMO_USER_STORAGE_KEY);
          if (savedDemo) {
            try {
              setUser(JSON.parse(savedDemo));
            } catch (e) {
              setUser(null);
            }
          }
        }
        setLoading(false);
      });

      // 2. Listen to live Supabase auth state changes (login, logout, token refresh)
      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        if (!mounted) return;
        setSession(currentSession);
        if (currentSession?.user) {
          setUser(mapSupabaseUser(currentSession.user));
          localStorage.removeItem(DEMO_USER_STORAGE_KEY);
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    } else {
      // Supabase credentials pending: restore demo session from localStorage
      try {
        const savedDemo = localStorage.getItem(DEMO_USER_STORAGE_KEY);
        if (savedDemo) {
          setUser(JSON.parse(savedDemo));
        }
      } catch (e) {
        setUser(null);
      }
      setLoading(false);
    }
  }, []);

  // Save demo user if not using Supabase
  useEffect(() => {
    if (!isSupabaseConfigured) {
      if (user && !user.isSupabase) {
        localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(user));
      } else if (!user) {
        localStorage.removeItem(DEMO_USER_STORAGE_KEY);
      }
    }
  }, [user]);

  // Sign in with Email and Password
  const signIn = async (email, password) => {
    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    if (isSupabaseConfigured && supabase) {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      setLoading(false);

      if (error) {
        return { success: false, error: error.message };
      }

      const appUser = mapSupabaseUser(data.user);
      setUser(appUser);
      setSession(data.session);
      addToast(`Welcome back, ${appUser.name}.`);
      return { success: true };
    }

    // Demo fallback when Supabase keys are not yet configured in .env.local
    const nameFromEmail = email.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    const demoUser = {
      id: 'demo-' + Date.now(),
      name: formattedName,
      email,
      role: 'collector',
      isSupabase: false
    };
    setUser(demoUser);
    addToast(`Signed in as ${demoUser.name} (Demo session).`);
    return { success: true, isDemo: true };
  };

  // Sign up with Name, Email, Password, and Role
  const signUp = async ({ name, email, password, role }) => {
    if (!name || !email || !password) {
      return { success: false, error: 'Please complete all required fields.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    if (isSupabaseConfigured && supabase) {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            role: role || 'collector'
          }
        }
      });
      setLoading(false);

      if (error) {
        return { success: false, error: error.message };
      }

      // Check if email confirmation is required by Supabase project settings
      if (data.user && !data.session) {
        addToast(`Confirmation link sent to ${email}. Please check your inbox.`);
        return {
          success: true,
          needsEmailConfirmation: true,
          message: 'Please check your email to confirm your account.'
        };
      }

      const appUser = mapSupabaseUser(data.user);
      setUser(appUser);
      setSession(data.session);
      addToast(`Account created. Welcome to VEYRA, ${name}.`);
      return { success: true };
    }

    // Demo fallback when Supabase keys are not yet configured
    const demoUser = {
      id: 'demo-' + Date.now(),
      name,
      email,
      role: role || 'collector',
      isSupabase: false
    };
    setUser(demoUser);
    addToast(`Account created for ${name} (Demo session).`);
    return { success: true, isDemo: true };
  };

  // Google OAuth Client-side initiation
  const signInWithGoogle = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/explore`
          }
        });
        if (error) {
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message || 'Google sign-in error.' };
      }
    }

    addToast(
      'Google OAuth requires VITE_SUPABASE_URL, API key in .env.local, and Google credentials in Supabase Dashboard.'
    );
    return {
      success: false,
      error: 'Supabase credentials pending in .env.local.'
    };
  };

  // Sign out
  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    addToast('Signed out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        isAuthenticated: !!user,
        isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

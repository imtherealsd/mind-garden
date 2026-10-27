import { useState, useEffect } from 'react';
import { 
  X, 
  Cloud, 
  LogOut, 
  RotateCw, 
  ShieldCheck, 
  User, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Gamepad2
} from 'lucide-react';
import { 
  signInWithGoogle, 
  signInWithFacebook,
  signInWithPlayGames,
  signOutUser, 
  subscribeToAuthChanges, 
  saveGardenToCloud, 
  loadGardenFromCloud
} from '../utils/firebase';

export function AuthModal({ 
  isOpen, 
  onClose, 
  gardenState,
  onRestoreFromCloud 
}) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleSignIn = async (providerType) => {
    setIsLoading(true);
    setActiveProvider(providerType);
    setErrorMsg('');
    setStatusMsg('');

    try {
      let res;
      if (providerType === 'google') res = await signInWithGoogle();
      else if (providerType === 'facebook') res = await signInWithFacebook();
      else if (providerType === 'playgames') res = await signInWithPlayGames();

      if (res && res.success) {
        setUser(res.user);
        setStatusMsg(`✨ Connected via ${providerType === 'google' ? 'Google' : providerType === 'facebook' ? 'Facebook' : 'Play Games'}!`);

        // Check if cloud data exists
        const cloudData = await loadGardenFromCloud(res.user.uid);
        if (cloudData && onRestoreFromCloud) {
          if ((!gardenState.growth || gardenState.growth === 0) && cloudData.growth > 0) {
            onRestoreFromCloud(cloudData);
            setStatusMsg('🌸 Restored your sanctuary progress!');
          } else {
            await handleSyncNow(res.user.uid);
          }
        } else {
          await handleSyncNow(res.user.uid);
        }
      }
    } catch (err) {
      console.error('Sign-In Notice:', err);
      setErrorMsg(err.message || 'Sign-In could not be completed.');
    } finally {
      setIsLoading(false);
      setActiveProvider(null);
      setTimeout(() => setStatusMsg(''), 3500);
    }
  };

  const handleSyncNow = async (targetUid = user?.uid) => {
    if (!targetUid) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        seedType: gardenState.seedType,
        growth: gardenState.growth,
        essence: gardenState.essence,
        unlockedDecorations: gardenState.unlockedDecorations,
        activeDecorations: gardenState.activeDecorations,
        allPlants: gardenState.allPlants,
        streak: gardenState.streak,
        subscription: gardenState.subscription,
        stressHistory: gardenState.stressHistory
      };

      const success = await saveGardenToCloud(targetUid, payload);
      if (success) {
        setStatusMsg('☁️ Sanctuary backup synced to Cloud!');
      } else {
        setErrorMsg('Sync failed. Please check internet connection.');
      }
    } catch (e) {
      setErrorMsg('Failed to sync data to cloud.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleRestoreFromCloud = async () => {
    if (!user?.uid) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const cloudData = await loadGardenFromCloud(user.uid);
      if (cloudData) {
        if (onRestoreFromCloud) {
          onRestoreFromCloud(cloudData);
        }
        setStatusMsg('🌸 Restored your sanctuary progress from the cloud!');
      } else {
        setErrorMsg('No existing backup found.');
      }
    } catch (e) {
      setErrorMsg('Could not fetch cloud data.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOutUser();
      setUser(null);
      setStatusMsg('Logged out. Your local sanctuary remains safe.');
    } catch (e) {
      setErrorMsg('Logout failed.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMsg(''), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-[400px] max-h-[90dvh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 text-slate-100 p-5 shadow-2xl relative scrollbar-none">
        
        {/* Header row */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-display font-bold text-white">Cloud Sanctuary Backup</h3>
              <p className="text-[10px] text-slate-400">Protect your plants, streaks & VIP status</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback Alerts */}
        {statusMsg && (
          <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold text-center flex items-center justify-center gap-1.5 animate-in zoom-in-95">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-3 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-medium flex items-center space-x-2 animate-in zoom-in-95">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* User Card */}
        {user ? (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border border-emerald-400/30" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-white leading-tight">{user.displayName || 'Mind Gardener'}</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{user.email}</div>
                  <div className="text-[9px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Cloud Backup Active</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Sync Controls */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSyncNow()}
                disabled={isLoading}
                className="py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs hover:bg-emerald-500/25 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                {isLoading ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Cloud className="w-3.5 h-3.5" />}
                <span>Sync to Cloud</span>
              </button>

              <button
                onClick={handleRestoreFromCloud}
                disabled={isLoading}
                className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-xs hover:bg-white/10 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Restore Backup</span>
              </button>
            </div>

            {/* Cloud Protection Notice */}
            <div className="p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/15 text-[10px] text-slate-300 space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Protected Sanctuary Data
              </div>
              <p className="text-slate-400 leading-relaxed">
                Your plant stage ({gardenState.growth}%), habit streaks ({gardenState.streak} days), essence balance, and VIP subscription status are synced securely.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <Cloud className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">Protect Your Mindful Journey</h4>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
                Link an account to safeguard your living plants, watering streaks, and VIP subscription across devices.
              </p>
            </div>

            {/* Social Logins Stack */}
            <div className="space-y-2.5 pt-1">
              {/* Google Sign In */}
              <button
                onClick={() => handleSignIn('google')}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-2xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 shadow-md shadow-white/5 cursor-pointer"
              >
                {isLoading && activeProvider === 'google' ? (
                  <RotateCw className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              {/* Facebook Sign In */}
              <button
                onClick={() => handleSignIn('facebook')}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                {isLoading && activeProvider === 'facebook' ? (
                  <RotateCw className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
                <span>Continue with Facebook</span>
              </button>

              {/* Play Games / Cloud Sanctuary ID */}
              <button
                onClick={() => handleSignIn('playgames')}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-200 font-bold text-xs active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                {isLoading && activeProvider === 'playgames' ? (
                  <RotateCw className="w-4 h-4 animate-spin text-slate-200" />
                ) : (
                  <Gamepad2 className="w-4 h-4 text-emerald-400" />
                )}
                <span>Continue with Play Games</span>
              </button>
            </div>

            <div className="text-[10px] text-slate-500 pt-1">
              100% Private • Cloud Encrypted • Free Forever
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

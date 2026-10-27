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
  Gamepad2,
  Crown,
  Heart,
  Target,
  Flame,
  Calendar,
  Save,
  Radio,
  Edit3
} from 'lucide-react';
import { 
  signInWithGoogle, 
  signInWithFacebook,
  signInWithPlayGames,
  signInWithEmail,
  signUpWithEmail,
  signInWithOneTapProfile,
  signOutUser, 
  saveUserProfile,
  subscribeToAuthChanges, 
  computeSanctuaryTitle,
  CARETAKER_AVATARS,
  MINDFULNESS_GOALS,
  AGE_BRACKETS
} from '../utils/firebase';
import { cloudSyncService } from '../utils/cloudSyncService';

export function ProfileModal({ 
  isOpen, 
  onClose, 
  gardenState,
  onRestoreFromCloud,
  isPlusMember = false,
  onOpenSubscriptionModal
}) {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'stats' | 'sync'
  const [authView, setAuthView] = useState('social'); // 'social' | 'quick' | 'email'
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Editable Profile fields
  const [displayName, setDisplayName] = useState('');
  const [ageBracket, setAgeBracket] = useState('25 – 34');
  const [mindfulnessGoal, setMindfulnessGoal] = useState('Stress & Anxiety Relief');
  const [dailyTargetMinutes, setDailyTargetMinutes] = useState(5);
  const [selectedAvatar, setSelectedAvatar] = useState('🌱');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  // Email form fields
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Quick One-tap fields
  const [quickName, setQuickName] = useState('');
  const [quickEmail, setQuickEmail] = useState('');

  // Realtime Sync status
  const [syncInfo, setSyncInfo] = useState({
    status: 'idle',
    formattedTime: 'Just now',
    isRealtimeEnabled: true
  });

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setDisplayName(currentUser.displayName || 'Mind Gardener');
        setAgeBracket(currentUser.ageBracket || '25 – 34');
        setMindfulnessGoal(currentUser.mindfulnessGoal || 'Stress & Anxiety Relief');
        setDailyTargetMinutes(currentUser.dailyTargetMinutes || 5);
        setSelectedAvatar(currentUser.avatarEmoji || '🌱');
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen for sync service changes
  useEffect(() => {
    const unsubSync = cloudSyncService.subscribe((info) => {
      setSyncInfo(info);
    });
    return () => unsubSync();
  }, []);

  if (!isOpen) return null;

  const currentTitle = computeSanctuaryTitle(gardenState.streak, gardenState.stressHistory?.length || 0);

  // Handle Save Profile Changes
  const handleSaveProfile = async () => {
    if (!user?.uid) return;
    setIsLoading(true);
    setErrorMsg('');
    setStatusMsg('');

    try {
      const updated = await saveUserProfile(user.uid, {
        displayName: displayName.trim() || 'Mind Gardener',
        ageBracket,
        mindfulnessGoal,
        dailyTargetMinutes,
        avatarEmoji: selectedAvatar
      });
      setUser(updated);
      setIsEditingAvatar(false);
      setStatusMsg('✨ Caretaker profile updated!');
    } catch (e) {
      setErrorMsg('Could not save profile changes.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  // Sign In Handlers
  const handleSocialSignIn = async (providerType) => {
    setIsLoading(true);
    setErrorMsg('');
    setStatusMsg('');

    try {
      let res;
      if (providerType === 'google') res = await signInWithGoogle();
      else if (providerType === 'facebook') res = await signInWithFacebook();
      else if (providerType === 'playgames') res = await signInWithPlayGames();

      if (res && res.success) {
        setUser(res.user);
        setStatusMsg(`✨ Welcome, ${res.user.displayName}!`);
        await handleInitialSync(res.user.uid);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Sign in could not be completed.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleQuickSignIn = async (e) => {
    e.preventDefault();
    if (!quickName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setStatusMsg('');

    try {
      const res = await signInWithOneTapProfile(
        quickName.trim(),
        quickEmail.trim(),
        ageBracket,
        mindfulnessGoal,
        selectedAvatar
      );
      if (res && res.success) {
        setUser(res.user);
        setStatusMsg(`✨ Welcome, ${res.user.displayName}!`);
        await handleInitialSync(res.user.uid);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create caretaker account.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setStatusMsg('');

    try {
      let res;
      if (isSignUp) {
        res = await signUpWithEmail(emailInput.trim(), passwordInput.trim(), displayName || emailInput.split('@')[0], {
          ageBracket,
          mindfulnessGoal,
          avatarEmoji: selectedAvatar
        });
      } else {
        res = await signInWithEmail(emailInput.trim(), passwordInput.trim());
      }

      if (res && res.success) {
        setUser(res.user);
        setStatusMsg(isSignUp ? '✨ Account created successfully!' : '✨ Welcome back!');
        await handleInitialSync(res.user.uid);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleInitialSync = async (uid) => {
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
    await cloudSyncService.forceSyncNow(uid, payload);
  };

  const handleManualSync = async () => {
    if (!user?.uid) return;
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
      const ok = await cloudSyncService.forceSyncNow(user.uid, payload);
      if (ok) {
        setStatusMsg('☁️ Realtime cloud backup confirmed!');
      } else {
        setErrorMsg('Could not reach cloud. Local backup is intact.');
      }
    } catch {
      setErrorMsg('Sync error occurred.');
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
      <div className="w-full max-w-[420px] max-h-[90dvh] flex flex-col rounded-3xl border border-white/10 bg-slate-950 text-slate-100 shadow-2xl relative overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 shrink-0 bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold">
              {user ? (user.avatarEmoji || '🌱') : <User className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-xs font-display font-bold text-white flex items-center gap-1.5">
                <span>{user ? user.displayName || 'Caretaker Profile' : 'Connect Sanctuary Profile'}</span>
                {user && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Cloud Active" />
                )}
              </h3>
              <p className="text-[10px] text-slate-400">
                {user ? currentTitle : 'Sync streaks, plants & VIP status'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback Alerts */}
        {statusMsg && (
          <div className="mx-4 mt-3 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold text-center flex items-center justify-center gap-1.5 animate-in zoom-in-95">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mx-4 mt-3 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-medium flex items-center space-x-2 animate-in zoom-in-95">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
          {user ? (
            <>
              {/* Tab Navigation for Logged-In Users */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900/80 rounded-xl border border-white/5">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'stats'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sanctuary
                </button>
                <button
                  onClick={() => setActiveTab('sync')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'sync'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Realtime Sync
                </button>
              </div>

              {/* TAB 1: CARETAKER PROFILE DETAILS */}
              {activeTab === 'profile' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Hero Identity Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <button
                          onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                          className="w-13 h-13 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-2xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-md"
                          title="Change Caretaker Avatar"
                        >
                          {user.photoURL ? (
                            <img src={user.photoURL} alt={displayName} className="w-full h-full rounded-2xl object-cover" />
                          ) : (
                            <span>{selectedAvatar}</span>
                          )}
                        </button>
                        <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-slate-950 border border-emerald-400 text-[8px] text-emerald-400">
                          <Edit3 className="w-2.5 h-2.5" />
                        </span>
                      </div>

                      <div>
                        <div className="text-sm font-display font-bold text-white flex items-center gap-1.5">
                          <span>{displayName || 'Mind Gardener'}</span>
                        </div>
                        <div className="text-[10px] text-emerald-400 font-semibold">{currentTitle}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{user.email}</div>
                      </div>
                    </div>

                    {isPlusMember ? (
                      <span className="text-[9px] font-extrabold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                        <Crown className="w-3 h-3 text-amber-400" /> VIP
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full shrink-0">
                        Free Tier
                      </span>
                    )}
                  </div>

                  {/* Avatar Picker Drawer */}
                  {isEditingAvatar && (
                    <div className="p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/20 space-y-2 animate-in zoom-in-95">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Choose Sanctuary Avatar
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                        {CARETAKER_AVATARS.map((av) => (
                          <button
                            key={av.id}
                            onClick={() => {
                              setSelectedAvatar(av.emoji);
                              setIsEditingAvatar(false);
                            }}
                            className={`p-2 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer border ${
                              selectedAvatar === av.emoji
                                ? 'bg-emerald-500/20 border-emerald-400 scale-110 shadow-sm shadow-emerald-500/20'
                                : 'bg-white/5 border-white/5 hover:bg-white/10'
                            }`}
                            title={av.label}
                          >
                            <span>{av.emoji}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-300">Caretaker Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your preferred name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  {/* Age Bracket Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <span>Age Group</span>
                      <span className="text-[10px] text-slate-500 font-normal">(Personalizes mindfulness rhythm)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {AGE_BRACKETS.map((bracket) => (
                        <button
                          key={bracket}
                          type="button"
                          onClick={() => setAgeBracket(bracket)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                            ageBracket === bracket
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-inner'
                              : 'bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/5'
                          }`}
                        >
                          {bracket}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mindfulness Goal Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Primary Mindful Focus</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {MINDFULNESS_GOALS.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setMindfulnessGoal(goal)}
                          className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border leading-snug ${
                            mindfulnessGoal === goal
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-inner'
                              : 'bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/5'
                          }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Daily Target Minutes */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-300">Daily Stillness Commitment</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[3, 5, 10, 15].map((mins) => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => setDailyTargetMinutes(mins)}
                          className={`py-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                            dailyTargetMinutes === mins
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                              : 'bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/5'
                          }`}
                        >
                          {mins} mins
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save Profile Button */}
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-display font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
                  >
                    {isLoading ? <RotateCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Caretaker Profile</span>
                  </button>
                </div>
              )}

              {/* TAB 2: SANCTUARY STATS & PROGRESS */}
              {activeTab === 'stats' && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="text-center pb-1">
                    <h4 className="text-xs font-bold text-slate-300">Sanctuary Milestones</h4>
                    <p className="text-[10px] text-slate-500">Living records nurtured by your presence</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Watering Habit</div>
                      <div className="text-xl font-display font-black text-amber-400 mt-1 flex items-center justify-center gap-1">
                        <Flame className="w-4 h-4 fill-current" />
                        <span>{gardenState.streak} Days</span>
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">Consecutive check-ins</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Check-Ins</div>
                      <div className="text-xl font-display font-black text-emerald-400 mt-1">
                        {gardenState.stressHistory?.length || 0}
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">Emotional logs recorded</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Current Companion</span>
                      <span className="font-bold text-white capitalize">{gardenState.seedType || 'None'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Plant Growth</span>
                      <span className="font-mono font-bold text-emerald-400">{gardenState.growth}%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Essence Balance</span>
                      <span className="font-mono font-bold text-garden-gold">{gardenState.essence} ★</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Active Decor</span>
                      <span className="font-bold text-white">{gardenState.activeDecorations?.length || 0} items placed</span>
                    </div>
                  </div>

                  {/* Plus Upgrade or VIP Perks Banner */}
                  {isPlusMember ? (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-yellow-500/5 border border-amber-500/30 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <div>
                          <div className="text-xs font-bold text-white">Mind Garden Plus VIP</div>
                          <div className="text-[10px] text-amber-200">2x Essence & Unlimited Companions Active</div>
                        </div>
                      </div>
                    </div>
                  ) : onOpenSubscriptionModal && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenSubscriptionModal();
                      }}
                      className="w-full p-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <div>
                          <div className="text-xs font-bold text-white">Upgrade to Mind Garden Plus</div>
                          <div className="text-[10px] text-slate-400">All 3 botanical species & 2x essence</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-300">View →</span>
                    </button>
                  )}
                </div>
              )}

              {/* TAB 3: REALTIME CLOUD SYNC */}
              {activeTab === 'sync' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Realtime Status Card */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${
                          syncInfo.status === 'syncing' 
                            ? 'bg-amber-400 animate-spin' 
                            : syncInfo.status === 'offline' 
                            ? 'bg-slate-500' 
                            : 'bg-emerald-400 animate-pulse'
                        }`} />
                        <div>
                          <div className="text-xs font-bold text-white">
                            {syncInfo.status === 'syncing' ? 'Syncing to Cloud...' : syncInfo.status === 'offline' ? 'Offline Mode' : 'Realtime Sync Active'}
                          </div>
                          <div className="text-[10px] text-slate-400">Last backup: {syncInfo.formattedTime}</div>
                        </div>
                      </div>

                      {/* Realtime Auto-Sync Switch */}
                      <button
                        onClick={() => cloudSyncService.setRealtimeEnabled(!syncInfo.isRealtimeEnabled)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
                          syncInfo.isRealtimeEnabled
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-white/5 text-slate-400 border-white/10'
                        }`}
                      >
                        {syncInfo.isRealtimeEnabled ? 'Auto-Sync ON' : 'Paused'}
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                      When enabled, your plant growth, daily emotional check-ins, essence, and VIP subscription automatically push to your secure cloud sanctuary in real time.
                    </p>
                  </div>

                  {/* Manual Sync / Restore Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleManualSync}
                      disabled={isLoading}
                      className="py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs hover:bg-emerald-500/25 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      {isLoading ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Cloud className="w-3.5 h-3.5" />}
                      <span>Sync to Cloud Now</span>
                    </button>

                    <button
                      onClick={async () => {
                        if (onRestoreFromCloud && user?.uid) {
                          await onRestoreFromCloud();
                          setStatusMsg('🌸 Restored latest cloud snapshot!');
                        }
                      }}
                      disabled={isLoading}
                      className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-xs hover:bg-white/10 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>Restore Cloud Backup</span>
                    </button>
                  </div>

                  {/* Sign Out Card */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[10px] text-slate-500">
                      Signed in via {user.provider || 'Sanctuary ID'}
                    </div>
                    <button
                      onClick={handleSignOut}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* NON-LOGGED IN VIEW: ULTRA STABLE SIGN-IN */
            <div className="space-y-4 text-center py-2 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <Cloud className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">Protect Your Mindful Sanctuary</h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
                  Save plant growth, watering streaks, and VIP status securely to the cloud with real-time sync.
                </p>
              </div>

              {/* Auth Mode Toggle */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900/80 rounded-xl border border-white/5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setAuthView('quick')}
                  className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    authView === 'quick' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Quick Sign-In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthView('social')}
                  className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    authView === 'social' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Social
                </button>
                <button
                  type="button"
                  onClick={() => setAuthView('email')}
                  className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    authView === 'email' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Email
                </button>
              </div>

              {/* VIEW 1: ONE-TAP QUICK CARETAKER SIGN-IN */}
              {authView === 'quick' && (
                <form onSubmit={handleQuickSignIn} className="space-y-3 text-left animate-in fade-in">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">Your Caretaker Name</label>
                    <input
                      type="text"
                      required
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      placeholder="e.g. alex@mindgarden.app"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">Age Group</label>
                    <select
                      value={ageBracket}
                      onChange={(e) => setAgeBracket(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                    >
                      {AGE_BRACKETS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer mt-2"
                  >
                    {isLoading ? <RotateCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Start Realtime Cloud Sync</span>
                  </button>
                </form>
              )}

              {/* VIEW 2: SOCIAL SIGN IN (GOOGLE, FACEBOOK, PLAY GAMES) */}
              {authView === 'social' && (
                <div className="space-y-2.5 animate-in fade-in">
                  {/* Google */}
                  <button
                    onClick={() => handleSocialSignIn('google')}
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-2xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 shadow-md shadow-white/5 cursor-pointer"
                  >
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
                    <span>Continue with Google</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => handleSocialSignIn('facebook')}
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Continue with Facebook</span>
                  </button>

                  {/* Play Games */}
                  <button
                    onClick={() => handleSocialSignIn('playgames')}
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-200 font-bold text-xs active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
                  >
                    <Gamepad2 className="w-4 h-4 text-emerald-400" />
                    <span>Continue with Play Games</span>
                  </button>
                </div>
              )}

              {/* VIEW 3: EMAIL / PASSWORD */}
              {authView === 'email' && (
                <form onSubmit={handleEmailAuth} className="space-y-3 text-left animate-in fade-in">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">Password</label>
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer mt-2"
                  >
                    {isLoading ? <RotateCw className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}
                    <span>{isSignUp ? 'Create Cloud Account' : 'Sign In & Connect'}</span>
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-[10px] text-emerald-400 hover:underline cursor-pointer"
                    >
                      {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
                    </button>
                  </div>
                </form>
              )}

              <div className="text-[10px] text-slate-500 pt-1">
                🔒 100% Private • Cloud Encrypted • Seamless Multi-Device Sync
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

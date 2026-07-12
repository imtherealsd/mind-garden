import { Shield, Lock, FileText, Mail, Globe, Database, UserCheck, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export function PrivacyPolicy() {
  // Set page metadata dynamically for SEO
  useEffect(() => {
    document.title = "Privacy Policy | Mind Garden";
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    
    if (metaDesc) {
      metaDesc.setAttribute("content", "Learn how Mind Garden protects your privacy and manages your personal information.");
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = "Learn how Mind Garden protects your privacy and manages your personal information.";
      document.head.appendChild(newMeta);
    }

    return () => {
      document.title = "Mind Garden";
      if (metaDesc) {
        metaDesc.setAttribute("content", originalDesc || "Mind Garden - Gamified Stress Management");
      }
    };
  }, []);

  return (
    <article className="space-y-8 text-slate-300 pb-12">
      {/* Beautiful Hero Section */}
      <section className="text-center space-y-3 py-6 border-b border-white/5 animate-float-slow">
        <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-2 shadow-inner">
          <Shield className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-display font-bold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          Your privacy matters. Learn how Mind Garden collects, uses, and protects your information.
        </p>
      </section>

      {/* Metadata / Last Updated */}
      <div className="flex justify-between items-center text-[11px] text-slate-500 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
        <div className="flex items-center space-x-1.5">
          <FileText className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">Document Status</span>
        </div>
        <span className="font-medium">Last Updated: July 2026</span>
      </div>

      {/* Intro Section */}
      <section className="space-y-2">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          1. Introduction
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed pl-3.5">
          Welcome to <strong>Mind Garden</strong>. We are committed to providing a peaceful, gamified sanctuary for stress management. This Privacy Policy describes how we handle information in our application. We respect your digital privacy and ensure that all personal data is handled responsibly.
        </p>
      </section>

      {/* Information We Collect */}
      <section className="space-y-2">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          2. Information We Collect
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed pl-3.5">
          Mind Garden operates as a fully local application. We do not collect or request any personal identification details (such as names, phone numbers, or physical addresses) during onboarding or game play.
        </p>
      </section>

      {/* Mood & Journal Data */}
      <section className="space-y-3">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          3. Mood & Journal Data
        </h2>
        <div className="pl-3.5 space-y-2">
          <p className="text-xs text-slate-400 leading-relaxed">
            Any stress level check-ins, journal entries, and growth records are processed locally on your device to dynamically determine your plant's growth curve and cosmetic unlocks.
          </p>
          <div className="p-3 rounded-xl border border-rose-500/10 bg-rose-500/5 text-rose-300 text-[11px] leading-relaxed flex items-start space-x-2">
            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Zero Server Upload:</strong> Your daily stress check-ins and journal entries are strictly private. They are never sent to external servers or accessible by third parties.
            </span>
          </div>
        </div>
      </section>

      {/* Cookies & Local Storage */}
      <section className="space-y-2">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          4. Cookies & Local Storage
        </h2>
        <div className="pl-3.5 space-y-2 text-xs text-slate-400 leading-relaxed">
          <p>
            To persist your plant level, check-in history logs, and unlockable shop items across sessions, Mind Garden uses browser local storage.
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[11px]">
            <li><strong>Local Storage:</strong> Stores your active seedType, plant growth percentage, earned essence particles, and check-in timeline records.</li>
            <li><strong>Muted Settings:</strong> Persists your audio preference.</li>
          </ul>
        </div>
      </section>

      {/* Third-Party Services */}
      <section className="space-y-2">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          5. Third-Party Services
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed pl-3.5">
          Mind Garden runs independently without loading external ad frameworks, social logins, or third-party behavioral analytics tracking SDKs. We do not sell, rent, or lease any local data to third-party advertisers.
        </p>
      </section>

      {/* Data Security */}
      <section className="space-y-2">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          6. Data Security
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed pl-3.5">
          Because your history is stored directly on your local device storage, the security of your logs is bound to your physical device. We recommend securing your device using modern lock screen protections (biometrics, passcode) to safeguard your data.
        </p>
      </section>

      {/* Children's Privacy */}
      <section className="space-y-2">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          7. Children's Privacy
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed pl-3.5">
          Mind Garden is suitable for users of all ages. Because we do not collect personal identifying information, we do not knowingly solicit or collect data from children under the age of 13.
        </p>
      </section>

      {/* Your Rights */}
      <section className="space-y-2">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          8. Your Rights
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed pl-3.5">
          You have full authority over your data. You can access, export, or completely destroy your logs at any time using the settings available within the app.
        </p>
      </section>

      {/* Data Deletion Request */}
      <section className="space-y-3">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          9. Data Deletion Request
        </h2>
        <div className="pl-3.5 space-y-2 text-xs text-slate-400 leading-relaxed">
          <p>
            If you wish to wipe all data from Mind Garden, you can trigger a full deletion inside the application:
          </p>
          <div className="p-3.5 rounded-xl border border-white/5 bg-slate-950/40 text-[11px] leading-relaxed space-y-1.5">
            <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>How to Reset Locally</span>
            </div>
            <p>
              Tap the <strong>Reset Icon (Rotate)</strong> in the top header bar, then confirm reset. This will immediately purge all local database tables, plant progression, and stress log files.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="space-y-3">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          10. Contact Information
        </h2>
        <div className="pl-3.5 space-y-2.5">
          <p className="text-xs text-slate-400 leading-relaxed">
            If you have any questions about this Privacy Policy, please feel free to reach out to us:
          </p>
          <div className="space-y-1.5 text-[11px] bg-white/[0.02] border border-white/5 p-3.5 rounded-xl">
            <div className="flex items-center space-x-2 text-slate-300">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>Developer:</strong> Mind Garden</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>Support Email:</strong> <a href="mailto:mindgarden.app@gmail.com" className="text-emerald-400 hover:underline">mindgarden.app@gmail.com</a></span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>Website:</strong> <a href="https://mind-garden-gilt.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">https://mind-garden-gilt.vercel.app/</a></span>
            </div>
          </div>
        </div>
      </section>

      {/* Changes to This Policy */}
      <section className="space-y-2">
        <h2 className="text-base font-display font-semibold text-slate-100 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          11. Changes to This Policy
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed pl-3.5">
          We may update our Privacy Policy from time to time. Any changes will be posted on this page, with the updated status date clearly visible at the top and bottom of the document.
        </p>
      </section>

      {/* Beautiful Footer */}
      <footer className="text-center pt-8 border-t border-white/5 text-[10px] text-slate-500 space-y-1 font-display">
        <p>Mind Garden • Grow Your Mind In Peace</p>
        <p>Last Updated: July 2026</p>
      </footer>
    </article>
  );
}

// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto">
      <div className="h-1.5 w-full bg-blue-600"></div>
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">SageAlpha AI</h3>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              AI Equity Research Platform<br/>
              sagealpha.ai@sagealpha.ai
            </p>
          </div>

          {/* Office Address Col */}
          <div className="md:col-span-7 lg:col-span-5 flex flex-col gap-2">
            <h4 className="text-sm font-bold text-slate-800">Office Address</h4>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              SNo 8 1A 1B Office No 110, Commerce Center<br />
              Shiva, Pimpri Waghire, Pune, Pune City,<br />
              Maharashtra, India, 411017
            </p>
          </div>

          <div className="md:col-span-12 lg:col-span-3 grid grid-cols-2 gap-8 lg:gap-4">
            {/* Product Col */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Product</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">API</a></li>
              </ul>
            </div>

            {/* Company Col */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Company</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Terms</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-slate-100 flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-slate-400">
            © 2026 SageAlpha AI · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

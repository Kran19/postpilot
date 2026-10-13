'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Eye, 
  Trash2, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { whatsappService } from '@/lib/services/whatsappService';
import { WhatsAppTemplate } from '@/lib/types/whatsapp';

export default function WhatsAppTemplatesPage() {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<WhatsAppTemplate | null>(null);

  useEffect(() => {
    whatsappService.getTemplates('ws-acme').then(setTemplates);
  }, []);

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.bodyText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesLanguage = languageFilter === 'all' || t.language === languageFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesLanguage;
  });

  const handleDelete = (id: string) => {
    whatsappService.deleteTemplate(id).then(() => {
      setTemplates(prev => prev.filter(t => t.id !== id));
      if (previewTemplate?.id === id) setPreviewTemplate(null);
    });
  };

  return (
    <AppShell title="WhatsApp Templates">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Header & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">WhatsApp Message Templates</h2>
              <span className="text-xs font-bold text-[#15803D] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full border border-[#D0EADB]">
                {templates.length} Total
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Pre-approved Meta HSM templates for outbound notifications and marketing broadcasts outside the 24h window.
            </p>
          </div>

          <Link href="/app/whatsapp/templates/new">
            <button className="px-4 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Create WhatsApp Template</span>
            </button>
          </Link>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates by name, content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#FAFAFA] border border-gray-200 text-xs text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="MARKETING">Marketing</option>
              <option value="UTILITY">Utility</option>
              <option value="AUTHENTICATION">Authentication</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#FAFAFA] border border-gray-200 text-xs text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Meta Review</option>
              <option value="draft">Draft</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* Language Filter */}
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="bg-[#FAFAFA] border border-gray-200 text-xs text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Languages</option>
              <option value="en_US">English (US)</option>
              <option value="es">Spanish</option>
              <option value="pt_BR">Portuguese</option>
            </select>
          </div>
        </div>

        {/* Templates Table */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFDFB] border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Template Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Language</th>
                  <th className="py-3.5 px-4">Meta Status</th>
                  <th className="py-3.5 px-4">Used In Automations</th>
                  <th className="py-3.5 px-4">Last Updated</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {filteredTemplates.map((t) => (
                  <tr key={t.id} className="hover:bg-[#FAFAFA] transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-gray-900 leading-tight">{t.name}</div>
                      <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5 max-w-xs">{t.bodyText}</p>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        t.category === 'MARKETING' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        t.category === 'UTILITY' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                        'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {t.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-gray-600">
                      {t.language}
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        t.status === 'approved' ? 'bg-[#EAF5EE] text-[#1E7E34] border border-[#D0EADB]' :
                        t.status === 'pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        t.status === 'rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {t.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />}
                        {t.status === 'pending' && <Clock className="w-3 h-3 text-amber-600 animate-spin" />}
                        {t.status === 'rejected' && <AlertCircle className="w-3 h-3 text-rose-500" />}
                        <span className="capitalize">{t.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-900">{t.usageCount.toLocaleString()}</span>
                      <span className="text-gray-400 text-[10px] ml-1">runs</span>
                    </td>

                    <td className="py-4 px-4 text-gray-400 font-mono text-[11px]">
                      {new Date(t.lastUpdated).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewTemplate(t)}
                          title="Preview Template"
                          className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          title="Delete Template"
                          className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal / Drawer for Live Preview */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6 space-y-4 relative">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-gray-900">{previewTemplate.name}</h3>
                </div>
                <button 
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Realistic Phone Bubble */}
              <div className="bg-[#EFEAE2] p-4 rounded-xl border border-[#D9D2C7] space-y-3">
                <div className="bg-white rounded-2xl rounded-tl-xs p-4 shadow-xs space-y-2 text-xs border border-gray-200/70">
                  {previewTemplate.headerType === 'TEXT' && previewTemplate.headerContent && (
                    <h5 className="font-bold text-gray-900">{previewTemplate.headerContent}</h5>
                  )}
                  <p className="whitespace-pre-line leading-relaxed text-gray-800 font-medium">
                    {previewTemplate.bodyText}
                  </p>
                  {previewTemplate.footerText && (
                    <p className="text-[10px] text-gray-400 pt-1">{previewTemplate.footerText}</p>
                  )}

                  {previewTemplate.buttons.length > 0 && (
                    <div className="pt-2 border-t border-gray-100 space-y-1.5">
                      {previewTemplate.buttons.map(b => (
                        <div key={b.id} className="w-full text-center py-2 bg-[#F6F7F9] rounded-lg text-emerald-700 font-bold text-xs flex items-center justify-center gap-1">
                          {b.type === 'URL' && <ExternalLink className="w-3 h-3" />}
                          <span>{b.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs pt-1 text-gray-500">
                <span>Category: <strong>{previewTemplate.category}</strong></span>
                <span>Language: <strong>{previewTemplate.language}</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

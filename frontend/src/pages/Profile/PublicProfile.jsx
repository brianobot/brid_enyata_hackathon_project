import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield, MapPin, Globe, Phone, Mail, 
  MessageSquare, ExternalLink, Star, Building2, Flag, 
  AlertCircle, Loader2, ArrowLeft, BadgeCheck, Scale, 
  FileCheck, ShieldCheck, Globe2
} from "lucide-react";
import PlainNavbar from '../../components/navbar/PlainNavbar';
import Footer from "../../components/Footer";
import api from "../../api/axios";

// ─── REDESIGNED HELPER COMPONENTS ─────────────────────────────────────────────

function NewTrustScoreCircle({ score }) {
  const normalizedScore = score ?? 0;
  // Use professional SaaS color palette (Blue for solid trust, Gray for new)
  const color = normalizedScore > 70 ? 'text-blue-600' : normalizedScore > 40 ? 'text-blue-500' : 'text-red-400';
  
  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
        <circle
          cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="8" fill="transparent"
          strokeDasharray={464.9} // 2 * PI * 74
          strokeDashoffset={464.9 - (464.9 * normalizedScore) / 100}
          strokeLinecap="round"
          className={`${color} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-black text-slate-950 tracking-tight">{normalizedScore}</span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1">Trust Score</span>
      </div>
    </div>
  );
}

function NewComplianceItem({ label, isVerified, icon: IconComponent, description }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-3xl transition-all hover:border-slate-200">
      <div className={`p-3 rounded-2xl flex-shrink-0 ${isVerified ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
        {IconComponent ? <IconComponent className="w-6 h-6" /> : null}
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-base font-bold text-slate-900">{label}</span>
          {isVerified ? (
            <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50/50 px-3 py-1 rounded-full border border-blue-100">
              <BadgeCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wide">Verified</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              <AlertCircle className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wide">Pending</span>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{description || "Verification pending review by compliance team."}</p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function RedesignedPublicProfile() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [business, setBusiness] = useState(location.state?.business || null);
  const [loading, setLoading] = useState(!location.state?.business);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!business) {
      const fetchBusiness = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/businesses/${id}`);
          setBusiness(response.data);
        } catch (err) {
          setError("This business profile could not be retrieved. It may be inactive or private.");
          console.error("Profile Fetch Error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBusiness();
    }
  }, [id, business]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-900 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading professional credibility profile...</p>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <div className="p-4 bg-red-100 rounded-2xl mb-5 text-red-600">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Profile Not Available</h2>
        <p className="text-slate-500 mt-2 max-w-sm font-medium">{error}</p>
        <button onClick={() => navigate('/')} className="mt-8 bg-slate-900 text-white px-7 py-3 rounded-xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-all">
          <ArrowLeft className="w-4 h-4" /> BACK TO HOME PAGE
        </button>
      </div>
    );
  }

  const isFullyVerified = business.cac_is_verified && business.tin_is_verified;

  return (
    <div className="mt-[200px]">
      <PlainNavbar />


      {/* 2. Main overlapping Profile Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-36 relative z-20">
                <button
            onClick={() => navigate('/')}
            className="group flex items-center pt-10 pl-5 gap-2 text-slate-400 hover:text-blue-900 mb-8 transition-colors text-sm font-bold"
          >
            <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            BACK TO HOME PAGE
        </button>
        {/* The overlapping Main Header Card */}
        <div className="bg-white p-10  border border-slate-100 shadow-xl rounded-xl shadow-blue-950/5 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-6">
              {/* Refined Icon Block */}
              <div className="w-24 h-24 bg-gray-200 rounded-[22px] flex items-center justify-center text-white flex-shrink-0">
                <Building2 className="w-12 h-12" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <h1 className="text-4xl font-bold  tracking-tight">{business.business_name || business.name}</h1>
                  {isFullyVerified && (
                    <div className="p-1 bg-blue-100 rounded-full border border-blue-200">
                      <BadgeCheck className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-slate-500 text-base font-semibold">
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> {business.business_address || business.location || "Nigeria"}</span>
                  <span className="w-1.5 h-1.5 bg-slate-200 rounded-full hidden md:block" />
                  <a href={`http://${business.business_website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <Globe2 className="w-4 h-4 text-blue-400" /> {business.business_website || "No website"}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <button disabled cursor className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center gap-2.5">
                <Globe className="w-4 h-4" /> Business Website
              </button>
              
            </div>
          </div>
        </div>

        {/* 3. Refined Grid Layout (Stronger architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Essential Details */}
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white p-10 rounded-[16px] border border-slate-100 shadow-xl shadow-gray-950/5">
              <h2 className="text-2xl font-bold text-slate-950 mb-5 tracking-tight">Corporate Overview</h2>
              <p className="text-slate-600 leading-relaxed font-medium text-base">
                {business.business_description || "This business has successfully completed key foundational verification steps. A custom business description has not been provided yet by the profile owner."}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950 mb-6 tracking-tight px-2">Verification & Compliance Status</h2>
              <div className="space-y-4">
                <NewComplianceItem 
                  label="CAC Corporate Registration" 
                  isVerified={business.cac_is_verified} 
                  icon={FileCheck} 
                  description="Confirmation of valid Corporate Affairs Commission registration records."
                />
                <NewComplianceItem 
                  label="Taxpayer Identification (TIN)" 
                  isVerified={business.tin_is_verified} 
                  icon={Scale} 
                  description="Verification of valid Federal Inland Revenue Service (FIRS) tax data."
                />
                <NewComplianceItem 
                  label="Operational Address" 
                  isVerified={business.address_is_verified} 
                  icon={MapPin} 
                  description="Validation of physical business location through utility or lease records."
                />
              </div>
            </section>
          </div>

          {/* Right Column: Key Trust Metrics & Certification */}
          <div className="space-y-10">
            {/* Redesigned Trust Score Card */}
            <section className="bg-white p-10 rounded-[36px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <NewTrustScoreCircle score={business.score || business.trustScore} />
              <div className="mt-8">
                <h3 className="text-xl font-black text-slate-950 tracking-tight">Credential Trust Rating</h3>
                <p className="text-sm text-slate-400 mt-2 font-medium px-2 leading-relaxed">
                  Calculated based on document authenticity, registry matching, and corporate data transparency.
                </p>
              </div>
            </section>

            {/* Redesigned Certification Card (Uses platform colors but refined) */}
            <section className="bg-[#E0F2FE]/60 border border-blue-100 p-10 rounded-[36px] text-slate-900 relative overflow-hidden transition-all hover:bg-[#E0F2FE]/80">
              <div className="relative z-10">
                <div className="p-3 bg-white rounded-2xl inline-block mb-5 shadow-sm border border-blue-100 text-blue-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">Verified by InterVerify</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Businesses carrying this badge have successfully passed our automated and manual compliance checks, significantly reducing transactional risk.
                </p>
              </div>
              {/* Stylized background watermark */}
              <div className="absolute -right-12 -bottom-12 opacity-[0.05] text-blue-600">
                <Shield className="w-48 h-48" />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Spacing above footer */}
      <div className="pb-16" />
      <Footer />
    </div>
  );
}
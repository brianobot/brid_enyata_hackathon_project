import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, Globe, Mail, Phone, 
  ShieldCheck, FileCheck, Scale, AlertCircle, 
  ArrowLeft, Loader2, CheckCircle2 
} from "lucide-react";
import api from "../../api/axios";
import SideBar from "../../components/SideBar";

export default function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Using the public business endpoint
        const response = await api.get(`/me/${id}`);
        setBusiness(response.data);
      } catch (err) {
        setError("Could not retrieve business records. The ID may be invalid.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-blue-900 animate-spin" />
          <p className="text-sm font-bold text-gray-500 tracking-tight">Accessing Secure Records...</p>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Data Retrieval Failed</h2>
          <p className="text-sm text-gray-400 font-medium mb-6">{error}</p>
          <button onClick={() => navigate(-1)} className="text-blue-600 font-bold flex items-center gap-2 mx-auto underline">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <SideBar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-12">
          
          {/* Top Navigation */}
          <button 
            onClick={() => navigate(-1)} 
            className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </button>

          {/* Business Identity Card */}
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-24 h-24 bg-blue-900 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-blue-900/10 flex-shrink-0">
                <Building2 className="w-12 h-12" />
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    {business.business_name}
                  </h1>
                  {(business.cac_is_verified && business.tin_is_verified) && (
                    <ShieldCheck className="w-7 h-7 text-blue-600" />
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2.5 text-gray-500 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-gray-300" />
                    {business.business_address || "Address not provided"}
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-500 text-sm font-medium">
                    <Globe className="w-4 h-4 text-gray-300" />
                    <a href={`https://${business.business_website}`} target="_blank" rel="noreferrer" className="hover:text-blue-600 underline">
                      {business.business_website || "No website link"}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-500 text-sm font-medium">
                    <Mail className="w-4 h-4 text-gray-300" />
                    {business.email}
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-500 text-sm font-medium">
                    <Phone className="w-4 h-4 text-gray-300" />
                    {business.business_phone_number || "Contact hidden"}
                  </div>
                </div>
              </div>

              {/* Trust Score Display */}
              <div className="w-full md:w-auto bg-blue-50/50 rounded-3xl p-6 border border-blue-100 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Trust Score</p>
                <span className="text-4xl font-black text-blue-900">{business.score || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Detailed Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-4">About</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {business.business_description || "This entity has not provided a detailed business description yet. Registration records are current as of the latest audit."}
                </p>
              </div>

              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Verification Logs</h3>
                <div className="space-y-4">
                  <VerificationStatusItem 
                    label="Corporate Registry (CAC)" 
                    isVerified={business.cac_is_verified} 
                    icon={FileCheck} 
                  />
                  <VerificationStatusItem 
                    label="Tax Compliance (TIN)" 
                    isVerified={business.tin_is_verified} 
                    icon={Scale} 
                  />
                  <VerificationStatusItem 
                    label="Physical Location" 
                    isVerified={business.address_is_verified} 
                    icon={MapPin} 
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              <div className="bg-blue-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-3">InterVerify Certified</h3>
                  <p className="text-blue-100 text-xs leading-relaxed font-medium opacity-80">
                    This business has undergone official registry validation and passed our initial credibility checks.
                  </p>
                  <button className="mt-6 w-full bg-white text-blue-900 py-3 rounded-xl font-black text-xs transition-all active:scale-95 shadow-lg">
                    Request Full Audit
                  </button>
                </div>
                <ShieldCheck className="absolute -right-8 -bottom-8 w-40 h-40 text-white/10" />
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm font-bold hover:border-blue-200 hover:text-blue-600 transition-all">
                Download Profile PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VerificationStatusItem({ label, isVerified }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isVerified ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-bold text-gray-700 tracking-tight">{label}</span>
      </div>
      {isVerified ? (
        <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase">Confirmed</span>
        </div>
      ) : (
        <span className="text-[10px] font-black uppercase text-gray-300 px-3 py-1">Pending</span>
      )}
    </div>
  );
}
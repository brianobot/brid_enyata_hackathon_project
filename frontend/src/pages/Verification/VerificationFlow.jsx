import { useState, useRef, useEffect } from "react";
import { 
  Shield, LayoutGrid, FileText, Users, Upload, ClipboardCheck,
  ChevronDown, CheckCircle, AlertCircle, Plus, Trash2, File, X, Loader2 
} from "lucide-react"
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import SideBar from '../../components/SideBar'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const INDUSTRIES = [
  "Technology & Software", "Construction", "Retail", "Financial Services",
  "Healthcare", "Education", "Manufacturing", "Logistics & Transport",
  "Agriculture", "Media & Communications", "Legal Services", "Real Estate",
];
const EMPLOYEE_RANGES = ["1 – 10", "11 – 50", "51 – 200", "201 – 500", "501 – 1,000", "1,000+"];
const POSITIONS = ["CEO", "CTO", "CFO", "COO", "Director", "Managing Director", "Chairman"];

const STEPS = [
  { id: 1, label: "Business Details",   icon: LayoutGrid },
  { id: 2, label: "Registration Info",  icon: FileText },
  { id: 3, label: "Directors Info",     icon: Users },
  { id: 4, label: "Document Upload",    icon: Upload },
  { id: 5, label: "Review & Submit",    icon: ClipboardCheck },
];

const mapEmployeeCount = (range) => {
  const mapping = {
    "1 – 10": 1,
    "11 – 50": 11,
    "51 – 200": 51,
    "201 – 500": 201,
    "501 – 1,000": 501,
    "1,000+": 1000,
  };
  return mapping[range] || 0;
};

// ─── SHARED UI COMPONENTS ────────────────────────────────────────────────────
const inputClass =
  "w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition";

const labelClass = "block text-sm font-semibold text-gray-800 mb-1.5";

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-0">
      <label className={labelClass}>
        {label}{required && <span className="text-gray-800"> *</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClass}
    />
  );
}

function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={inputClass + " appearance-none pr-10 cursor-pointer"}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
}

function StepBar({ currentStep }) {
  const pct = (currentStep / 5) * 100;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
      {/* Progress line */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-gray-900">Step {currentStep} of 5</span>
        <span className="text-sm font-semibold text-gray-500">{pct}% Complete</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gray-900 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {/* Step icons */}
      <div className="grid grid-cols-5 gap-2">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const done    = s.id < currentStep;
          const active  = s.id === currentStep;
          return (
            <div
              key={s.id}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 transition-colors
                ${active ? "bg-blue-50 border border-blue-100" : done ? "bg-green-50 border border-green-100" : "bg-gray-50 border border-gray-100"}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center
                ${active ? "bg-blue-900" : done ? "bg-green-500" : "bg-gray-200"}`}>
                {done
                  ? <CheckCircle className="w-5 h-5 text-white" />
                  : <Icon className={`w-5 h-5 ${active ? "text-white" : "text-gray-500"}`} />}
              </div>
              <span className={`text-xs font-medium text-center leading-tight
                ${active ? "text-blue-900" : done ? "text-green-700" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NavButtons({ onBack, onNext, nextLabel = "Continue", disableBack = false }) {
  return (
    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-6">
      <button
        onClick={onBack}
        disabled={disableBack}
        className="border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="bg-blue-900 text-white text-sm font-semibold px-7 py-2.5 rounded-xl hover:bg-blue-800 transition-colors"
      >
        {nextLabel}
      </button>
    </div>
  );
}

// ─── STEP 1: BUSINESS DETAILS ─────────────────────────────────────────────────
function Step1({ data, onChange, onNext }) {
  const s = (field) => (e) => onChange(field, e.target.value);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7">
      <h3 className="text-base font-bold text-gray-900 mb-6">Business Details</h3>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <Field label="Business Name">
            <TextInput value={data.businessName} onChange={s("businessName")} placeholder="your business name" />
          </Field>
          <Field label="Industry" required>
            <SelectInput value={data.industry} onChange={s("industry")} options={INDUSTRIES} placeholder="Select Industry" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Field label="Business Email" required>
            <TextInput value={data.businessEmail} onChange={s("businessEmail")} placeholder="contact@business.com" type="email" />
          </Field>
          <Field label="Year Founded" required>
            <input
    type="number"
    placeholder="e.g. 2024"
    min="1900"
    max={new Date().getFullYear()}
    value={data.registrationYear}
    onChange={(e) => {
      // Only allow up to 4 digits
      if (e.target.value.length <= 4) {
        onChange('registrationYear')(e);
      }
    }}
    className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 transition-all"
  />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-5 items-start">
          {/* Left column */}
          <div className="space-y-5">
            <Field label="Business Phone" required>
              <TextInput value={data.businessPhone} onChange={s("businessPhone")} placeholder="+234 800 0000 000" />
            </Field>
            <Field label="Employee Count" required>
              <SelectInput value={data.employeeCount} onChange={s("employeeCount")} options={EMPLOYEE_RANGES} placeholder="Select Range" />
            </Field>
            <Field label="Website">
              <TextInput value={data.website} onChange={s("website")} placeholder="www.yourbusiness.com" />
            </Field>
          </div>
          {/* Right column – address textarea */}
          <Field label="Business Address" required>
            <textarea
              value={data.businessAddress}
              onChange={s("businessAddress")}
              placeholder="Full business address"
              rows={8}
              className={inputClass + " resize-none"}
            />
          </Field>
        </div>
        <Field label="Business Description" required>
          <textarea
            value={data.businessDescription}
            onChange={s("businessDescription")}
            placeholder="Describe your business services..."
            rows={5}
            className={inputClass + " resize-none"}
          />
        </Field>
      </div>
      <NavButtons onBack={() => {}} disableBack onNext={onNext} />
    </div>
  );
}

// ─── STEP 2: REGISTRATION INFO ────────────────────────────────────────────────
function Step2({ data, onChange, onBack, onNext }) {
  const s = (field) => (e) => onChange(field, e.target.value);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7">
      <h3 className="text-base font-bold text-gray-900 mb-6">Registration info</h3>
      <div className="space-y-5">
        <Field label="CAC Registration Number" required>
          <TextInput value={data.cacNumber} onChange={s("cacNumber")} placeholder="RC 1234567" />
          <p className="text-xs text-gray-400 mt-1.5">Enter your Corporate Affairs Commission registration number</p>
        </Field>
        <Field label="Tax Identification Number (TIN)" required>
          <TextInput value={data.tin} onChange={s("tin")} placeholder="123456789-0001" />
        </Field>
        <Field label="Registration Date" required>
          <input
            type="number"
            placeholder="e.g. 2024"
            min="1900"
            max={new Date().getFullYear()}
            value={data.registrationYear}
            onChange={(e) => {
              // Only allow up to 4 digits
              if (e.target.value.length <= 4) {
                onChange('registrationYear')(e);
              }
            }}
            className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 transition-all"
          />
        </Field>

        {/* Info box */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 mt-2">
          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">Registration Information</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Make sure your CAC and TIN information matches your official registration documents. This information will be verified against government databases.
            </p>
          </div>
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ─── STEP 3: DIRECTORS INFO ───────────────────────────────────────────────────
function Step3({ directors, onChangeDirector, onAddDirector, onRemoveDirector, onBack, onNext }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7">
      <h3 className="text-base font-bold text-gray-900 mb-6">Directors</h3>
      <div className="space-y-4">
        {directors.map((d, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-5 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">Director {i + 1}</span>
              {directors.length > 1 && (
                <button onClick={() => onRemoveDirector(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <TextInput value={d.fullName} onChange={(e) => onChangeDirector(i, "fullName", e.target.value)} placeholder="Full name" />
                </Field>
                <Field label="Position" required>
                  <SelectInput value={d.position} onChange={(e) => onChangeDirector(i, "position", e.target.value)} options={POSITIONS} placeholder="Select position" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Email" required>
                  <TextInput value={d.email} onChange={(e) => onChangeDirector(i, "email", e.target.value)} placeholder="director@business.com" type="email" />
                </Field>
                <Field label="Phone" required>
                  <TextInput value={d.phone} onChange={(e) => onChangeDirector(i, "phone", e.target.value)} placeholder="+234 800 0000 000" />
                </Field>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={onAddDirector}
          className="w-full border border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Another Director
        </button>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ─── STEP 4: DOCUMENT UPLOAD ──────────────────────────────────────────────────
function UploadBox({ label, description, docKey, doc, onChange }) {
  const ref = useRef();
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) onChange(docKey, { name: f.name, file: f, uploaded: true });
  };
  return (
    <div className="border border-gray-200 rounded-xl p-8 text-center">
      {doc.uploaded ? (
        <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <File className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">{doc.name}</p>
              <p className="text-xs text-green-600 font-medium">Uploaded</p>
            </div>
          </div>
          <button
            onClick={() => onChange(docKey, { name: "", file: null, uploaded: false })}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <Upload className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-base font-semibold text-gray-800 mb-1">{label}</p>
          <p className="text-sm text-gray-400 mb-4">{description}</p>
          <button
            onClick={() => ref.current.click()}
            className="border border-gray-200 text-gray-700 text-sm px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Choose File
          </button>
          <input ref={ref} type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={handleFile} />
        </>
      )}
    </div>
  );
}

function Step4({ documents, onChangeDoc, onBack, onNext }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7">
      <h3 className="text-base font-bold text-gray-900 mb-6">Documents</h3>
      <div className="space-y-4">
        <UploadBox
          label="CAC Registration Certificate"
          description="Upload your CAC registration certificate (PDF, max 5MB)"
          docKey="cac" doc={documents.cac} onChange={onChangeDoc}
        />
        <UploadBox
          label="Tax Clearance Certificate"
          description="Upload your latest tax clearance certificate (PDF, max 5MB)"
          docKey="taxClearance" doc={documents.taxClearance} onChange={onChangeDoc}
        />
        <UploadBox
          label="Proof of Address"
          description="Upload utility bill or official document (PDF, max 5MB)"
          docKey="proofAddress" doc={documents.proofAddress} onChange={onChangeDoc}
        />

        {/* Guidelines */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mt-2">
          <p className="text-sm font-semibold text-gray-800 mb-2">Document Guidelines</p>
          {[
            "All documents must be clear and legible",
            "Documents should be current and not older than 6 months",
            "Accepted formats: PDF, JPG, PNG",
            "Maximum file size: 5MB per document",
          ].map((g) => (
            <p key={g} className="text-xs text-gray-500 mb-1">• {g}</p>
          ))}
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ─── STEP 5: REVIEW & SUBMIT ──────────────────────────────────────────────────
function ReviewSection({ icon: title, onEdit, children }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm font-bold text-gray-900">{title}</span>
        </div>
        <button onClick={onEdit} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:border-blue-200">
          <FileText className="w-3.5 h-3.5" /> Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function KV({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value || "—"}</p>
    </div>
  );
}

function Step5({ data, onGoToStep, onBack, onSubmit, isUploading }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div>
      <ReviewSection title="Business Information" onEdit={() => onGoToStep(1)}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <KV label="Business Name"   value={data.businessName} />
          <KV label="CAC Number"      value={data.cacNumber} />
          <KV label="Business Type"   value="Limited Liability Company" />
          <KV label="Registration Date" value={data.registrationDate} />
          <KV label="Email"           value={data.businessEmail} />
          <KV label="Business Name"   value={data.businessName} />
        </div>
      </ReviewSection>

      <ReviewSection title="Tax Compliance" onEdit={() => onGoToStep(2)}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <KV label="TIN Number" value={data.tin} />
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Tax Clearance Document</p>
            <div className="flex items-center gap-2">
              <File className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-900">{data.documents.taxClearance.name}</span>
              {data.documents.taxClearance.uploaded && (
                <span className="text-xs font-semibold text-green-600 ml-1">Uploaded</span>
              )}
            </div>
          </div>
        </div>
      </ReviewSection>

      <ReviewSection title="Director Information" onEdit={() => onGoToStep(3)}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <KV label="Full Name" value={data.directors[0]?.fullName} />
          <KV label="Position"  value={data.directors[0]?.position} />
          <KV label="Email"     value={data.directors[0]?.email} />
          <KV label="Phone"     value={data.directors[0]?.phone} />
        </div>
      </ReviewSection>

      <ReviewSection title="Uploaded Documents" onEdit={() => onGoToStep(4)}>
        <div className="space-y-3">
          {[
            { label: "CAC Certificate",          doc: data.documents.cac },
            { label: "Tax Clearance Certificate", doc: data.documents.taxClearance },
            { label: "Proof of address",          doc: data.documents.proofAddress },
          ].map(({ label, doc }) => (
            <div key={label} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <File className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{doc.name}</p>
                </div>
              </div>
              {doc.uploaded && (
                <span className="text-xs font-semibold text-green-600">• Uploaded</span>
              )}
            </div>
          ))}
        </div>
      </ReviewSection>

      {/* Important info */}
      <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl p-5 mb-5">
        <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-orange-700 mb-2">Important Information</p>
          {[
            "Review all information carefully before submitting",
            "Verification typically takes 24–48 hours after submission",
            "You'll receive email updates on your verification status",
            "Incomplete or inaccurate information may delay verification",
          ].map((t) => (
            <p key={t} className="text-xs text-orange-600 mb-1">• {t}</p>
          ))}
        </div>
      </div>

      {/* Confirmation checkbox */}
      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <div
          onClick={() => setConfirmed(!confirmed)}
          className={`w-4 h-4 mt-0.5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
            confirmed ? "bg-blue-900 border-blue-900" : "border-gray-300 bg-white"
          }`}
        >
          {confirmed && (
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
              <polyline points="1.5,5.5 4,8 8.5,2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          I confirm that all information provided is accurate and complete. I understand that false information may result in rejection of my verification application and potential account suspension.
        </p>
      </label>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <button
          onClick={onBack}
          className="border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={confirmed ? onSubmit : undefined}
          disabled={!confirmed || isUploading}
          className={`text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors ${
            (confirmed && !isUploading)
              ? "bg-blue-900 hover:bg-blue-800 cursor-pointer"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          {isUploading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────────────
function SuccessScreen() {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
      <p className="text-gray-500 text-sm max-w-sm mx-auto mb-2 leading-relaxed">
        Your verification application has been received
      </p>
      <button
        onClick={() => {
          navigate("/dashboard")}}
        className="bg-blue-900 text-white text-sm font-semibold px-8 py-3 rounded-xl hover:bg-blue-800 transition-colors"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function VerificationFlow() {
  const { user, refreshUser } = useAuth();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState(null);

useEffect(() => {
    if (user) {
      setFormData({
        // Step 1
        businessName: user.business_name || "",
        industry: user.industry || "",
        businessEmail: user.email || "", // email not updatable, but we keep for display
        yearFounded: user.year_founded ? String(user.year_founded) : "",
        businessPhone: user.business_phone_number || "",
        businessAddress: user.business_address || "",
        employeeCount: user.employee_count
          ? (() => {
              // Map number back to range string for display
              const ranges = EMPLOYEE_RANGES;
              if (user.employee_count <= 10) return ranges[0];
              if (user.employee_count <= 50) return ranges[1];
              if (user.employee_count <= 200) return ranges[2];
              if (user.employee_count <= 500) return ranges[3];
              if (user.employee_count <= 1000) return ranges[4];
              return ranges[5];
            })()
          : "",
        website: user.business_website || "",
        businessDescription: user.business_description || "",
        // Step 2
        cacNumber: user.business_cac_number || "",
        tin: user.business_tin || "",
        registrationDate: user.business_registration_date
          ? new Date(user.business_registration_date).toLocaleDateString("en-GB")
          : "",
        // Step 3 – directors
        directors: user.business_directors && user.business_directors.length
          ? user.business_directors.map(d => ({
              fullName: d.fullName || d.name || "",
              position: d.position || "",
              email: d.email || "",
              phone: d.phone || "",
            }))
          : [{ fullName: "", position: "", email: "", phone: "" }],
        // Step 4 – documents (initially empty; we'll use mock names if needed)
        documents: {
          cac: { name: "", file: null, uploaded: false, url: "" },
          taxClearance: { name: "", file: null, uploaded: false, url: "" },
          proofAddress: { name: "", file: null, uploaded: false, url: "" },
        },
      });
    } else {
      // Fallback to mock data if user not loaded yet (shouldn't happen)
      setFormData({
        businessName: "",
        industry: "",
        businessEmail: "",
        yearFounded: "",
        businessPhone: "",
        businessAddress: "",
        employeeCount: "",
        website: "",
        businessDescription: "",
        cacNumber: "",
        tin: "",
        registrationDate: "",
        directors: [{ fullName: "", position: "", email: "", phone: "" }],
        documents: {
          cac: { name: "", file: null, uploaded: false, url: "" },
          taxClearance: { name: "", file: null, uploaded: false, url: "" },
          proofAddress: { name: "", file: null, uploaded: false, url: "" },
        },
      });
    }
  }, [user]);

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const updateDirector = (index, field, value) =>
    setFormData((prev) => {
      const dirs = [...prev.directors];
      dirs[index] = { ...dirs[index], [field]: value };
      return { ...prev, directors: dirs };
    });

  const addDirector = () =>
    setFormData((prev) => ({
      ...prev,
      directors: [...prev.directors, { fullName: "", position: "", email: "", phone: "" }],
    }));

  const removeDirector = (index) =>
    setFormData((prev) => ({
      ...prev,
      directors: prev.directors.filter((_, i) => i !== index),
    }));

  const updateDoc = (docKey, value) =>
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [docKey]: value },
    }));

    const uploadFile = async (file, uploadTarget) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_target", uploadTarget);

    try {
      const response = await api.post("/misc/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // returns the URL string
    } catch (err) {
      console.error("Upload failed:" , err.response?.data || err.message);
      throw new Error(`Failed to upload ${file.name}: ${err.message}`);
    }
  };

  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  };

// Handle final submission
  const handleSubmit = async () => {

    setIsUploading(true);
    const loadingToast = toast.loading("Uploading documents...");

    try {
      const docUrls = {};

      for (const [key, doc] of Object.entries(formData.documents)) {
        if (doc.file) {
          
          const url = await uploadFile(doc.file, "TESTS");
          docUrls[key] = url;                                          // plain string ✅
          updateDoc(key, { name: doc.name, file: null, uploaded: true, url });
        } else if (doc.url && typeof doc.url === "string") {
          // Case B: file was already uploaded in a previous step — reuse the URL string
          docUrls[key] = doc.url;                                      // plain string ✅
        } else if (doc.url && typeof doc.url === "object" && doc.url.url) {
          // Case C: safety net — if somehow an old { url: "..." } object crept in, unwrap it
          docUrls[key] = doc.url.url;                                  // unwrap to plain string ✅
        }
        // If none of the above match, the doc was never uploaded — skip it
      }

      toast.loading("Submitting verification data...", { id: loadingToast });

      // 2. Build the payload for PATCH /auth/me
      const payload = {
        business_name: formData.businessName,
        industry: formData.industry,
        year_founded: parseInt(formData.yearFounded) || 0,
        employee_count: mapEmployeeCount(formData.employeeCount),
        business_address: formData.businessAddress,
        business_description: formData.businessDescription,
        business_phone_number: formData.businessPhone,
        business_website: formData.website,
        business_tin: formData.tin,
        business_cac_number: formData.cacNumber,
        business_registration_date: formatDateForAPI(formData.registrationDate),
        business_directors: formData.directors
        .filter(d => d.fullName && d.position && d.email && d.phone)
        .map(d => ({
          fullName: d.fullName,
          position: d.position,
          email: d.email,
          phone: d.phone,
        })),
        documents: docUrls, 
      };

      const response = await api.patch("/auth/me", payload);

      if (response.status === 202) {
        
        toast.success("Verification application submitted successfully!", { id: loadingToast });
        
        setSubmitted(true);
        await refreshUser();   
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response) {
        // console.error("Response data:", err.response.data);
        console.error("Status:", err.response.status);
      }
      const message = err.response?.data?.detail || err.message || "Failed to submit.";
      toast.error(`Error: ${message}`, { id: loadingToast });
    } finally {
      setIsUploading(false);
    }
  };

  // Navigation functions
  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // While user data is loading (or initializing), show a loading spinner
  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin w-8 h-8 text-blue-600 mx-auto" />
          <p className="mt-2 text-gray-500">Loading your information...</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="flex">
      <SideBar />
    <div className="min-h-screen flex-grow bg-gray-100 font-sans">

      <div className="max-w-4xl mx-auto  px-4 py-8">
        {/* Page heading — hidden on review step */}

        {!submitted && (
          <div className="mb-5">
            {step === 5 ? (
              <>
                <h1 className="text-3xl font-extrabold text-gray-900">Review Your Application</h1>
                <p className="text-gray-500 text-sm mt-1">Please review all information before submitting your verification application.</p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-extrabold text-gray-900">Business Verification Application</h1>
                <p className="text-gray-500 text-sm mt-1">Complete the steps below to get your business verified on InterVerify</p>
              </>
            )}
          </div>
        )}

        {submitted ? (
          <SuccessScreen />
        ) : (
          <>
            <StepBar currentStep={step} />

            {step === 1 && (
              <Step1
                data={formData}
                onChange={updateField}
                onNext={next}
              />
            )}
            {step === 2 && (
              <Step2
                data={formData}
                onChange={updateField}
                onBack={back}
                onNext={next}
              />
            )}
            {step === 3 && (
              <Step3
                directors={formData.directors}
                onChangeDirector={updateDirector}
                onAddDirector={addDirector}
                onRemoveDirector={removeDirector}
                onBack={back}
                onNext={next}
              />
            )}
            {step === 4 && (
              <Step4
                documents={formData.documents}
                onChangeDoc={updateDoc}
                onBack={back}
                onNext={next}
              />
            )}
            {step === 5 && (
              <Step5
                data={formData}
                onGoToStep={setStep}
                onBack={back}
                onSubmit={handleSubmit}
                isUploading={isUploading}
              />
            )}
          </>
        )}
      </div>
    </div>
    </div>
  );
}
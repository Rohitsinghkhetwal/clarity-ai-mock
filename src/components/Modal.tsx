import axios from "axios";
import type React from "react";
import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const ROLE_OPTIONS = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Data Engineer",
  "Machine Learning Engineer",
  "Product Manager",
  "UI/UX Designer",
  "QA Engineer",
  "Mobile Developer",
  "Cloud Architect",
  "System Administrator",
  "Business Analyst",
  "Project Manager",
  "Scrum Master",
];

function InterviewModal({ open, onClose, onStart }: any) {
  const companyRef = useRef<HTMLInputElement>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else {
          onClose();
        }
      }
    },
    [onClose, isDropdownOpen]
  );



  const filteredRoles = ROLE_OPTIONS.filter((role) =>
    role.toLowerCase().includes(roleFilter.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (open) {
      companyRef.current?.focus();
      setSelectedRole("");
      setRoleFilter("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute inset-0 bg-foreground/50"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="interview-modal-title"
        className="relative z-10 w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-lg"
      >
        <div className="p-6">
          <h2 id="interview-modal-title" className="text-lg font-semibold text-balance">
            Start your interview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Provide the details to personalize your session.
          </p>

          <div className="mt-4 grid gap-3">
            {/* Company Input */}
            <div>
              <label htmlFor="company" className="sr-only">
                Company
              </label>
              <input
                id="company"
                ref={companyRef}
                type="text"
                placeholder="Company e.g. Meta, Uber, Google"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Role Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <div
                className="h-10 w-full rounded-md border bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center justify-between cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className={selectedRole ? "text-foreground" : "text-muted-foreground"}>
                  {selectedRole || "Select a role..."}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-hidden z-20">
                  
                  <div className="p-2 border-b sticky top-0 bg-background">
                    <input
                      type="text"
                      placeholder="Search roles..."
                      className="w-full h-8 px-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto">
                    {filteredRoles.length > 0 ? (
                      filteredRoles.map((role) => (
                        <div
                          key={role}
                          className={`px-3 py-2 text-sm cursor-pointer hover:bg-accent transition-colors ${
                            selectedRole === role ? "bg-accent font-medium" : ""
                          }`}
                          onClick={() => {
                            setSelectedRole(role);
                            setIsDropdownOpen(false);
                            setRoleFilter("");
                          }}
                        >
                          {role}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                        No roles found
                      </div>
                    )}
                  </div>

                  <div className="p-2 border-t bg-muted/30">
                    <button
                      type="button"
                      className="w-full text-left px-2 py-1.5 text-sm text-primary hover:bg-accent rounded transition-colors"
                      onClick={() => {
                        const customRole = prompt("Enter custom role:");
                        if (customRole) {
                          setSelectedRole(customRole);
                          setIsDropdownOpen(false);
                        }
                      }}
                    >
                      + Custom role
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md font-semibold text-sm border hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate('/interview', {
                  state: {
                    role: selectedRole,
                    company: companyRef.current?.value
                  }
                })}
                type="button"
                className="px-4 py-2 bg-[#241DE7] text-white rounded-md font-semibold text-sm hover:bg-[#1a15b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedRole || !companyRef.current?.value}
              >
                Start interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewModal;
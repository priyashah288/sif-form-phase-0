import { createContext, useContext, useState } from "react";
import { uid } from "../utils/helpers";

const FormContext = createContext();

const initialState = {
  institution: { name:"", pciCode:"", yearEst:"", instType:"", hoiName:"",
    hoiCouncilNo:"", email:"", mobile:"", state:"", district:"", pincode:"",
    lat:"", lng:"", postOffice:"", nearestAirport:"", policeStation:"",
    trustName:"", trustState:"" },
  courses: { selected:{ bpharm:true, dpharm:false, mpharm:false, pharmd:false },
    mpharmSpecs:[], intakes:[{ course:"B.Pharm", sanctioned:"100", actual:"110", status:"Approved" }] },
  infrastructure: { landArea:"", indBuilding:true, sepCampus:true,
    totalBuiltup:"", instructional:"", admin:"", amenities:"", circulation:"",
    classrooms:[{ id:uid(), name:"Class Room 1", course:"B.Pharm", reqArea:75, availArea:"78" }],
    facilities:{} },
  faculty: [
    { id:uid(), photoUrl:"", photoFile:null, name:"MUDDULURU NIRANJAN BABU",
      councilNo:"BH-P-23-18028", qualifications:["Ph.D"], designation:"Director/Principal/HOI",
      departments:["Administration"], course:"All", exp:"27", workload:"8",
      doj:"2007-05-09", aebas:"Not Verified", ftpt:"Full-Time" },
  ],
  nonTeaching: [
    { id:uid(), name:"G SATHYANARAYANA RAJU", qual:"M.A", designation:"Office Superintendent",
      dept:"Administration", doj:"2005-09-01", mobile:"7730084513" },
  ],
  labs: [
    { id:uid(), name:"Pharmaceutics & Pharmacokinetics Lab", course:"B.Pharm",
      dept:"Dept of Pharmaceutics", reqArea:75, availArea:"78", concStudents:"20",
      gas:true, water:true, electricity:true, lat:"", lng:"",
      indoorPhoto:null, outdoorPhoto:null },
  ],
  curriculum: { wdBpharm:"180", wdPharmd:"205", sessionalCount:"3", attendanceTracked:"Yes" },
  library: { area:"1614", readingCapacity:"150", nationalJournals:"103", intlJournals:"347" },
  finance: { totalIncome:"62261411", salaryExp:"33389147", pan:"AAATG8973E", totalExp:"60123928" },
  research: { projects:[], publications:[], patents:[] },
};

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const updateInstitution = (field, value) => {
    setFormData(prev => ({ ...prev, institution: { ...prev.institution, [field]: value } }));
  };

  const updateCourses = (field, value) => {
    setFormData(prev => ({ ...prev, courses: { ...prev.courses, [field]: value } }));
  };

  const updateInfrastructure = (field, value) => {
    setFormData(prev => ({ ...prev, infrastructure: { ...prev.infrastructure, [field]: value } }));
  };

  const updateFaculty = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      faculty: prev.faculty.map(f => f.id === id ? { ...f, [field]: value } : f)
    }));
  };

  const addFaculty = () => {
    setFormData(prev => ({
      ...prev,
      faculty: [...prev.faculty, {
        id: uid(), photoUrl: "", photoFile: null, name: "", councilNo: "",
        qualifications: [], designation: "", departments: [], course: "",
        exp: "", workload: "8", doj: "", aebas: "Not Verified", ftpt: "Full-Time"
      }]
    }));
  };

  const removeFaculty = (id) => {
    setFormData(prev => ({ ...prev, faculty: prev.faculty.filter(f => f.id !== id) }));
  };

  const updateNonTeaching = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      nonTeaching: prev.nonTeaching.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const addNonTeaching = () => {
    setFormData(prev => ({
      ...prev,
      nonTeaching: [...prev.nonTeaching, {
        id: uid(), name: "", qual: "SSLC", designation: "Lab Asst / Attender",
        dept: "Pharmaceutics", doj: "", mobile: ""
      }]
    }));
  };

  const removeNonTeaching = (id) => {
    setFormData(prev => ({ ...prev, nonTeaching: prev.nonTeaching.filter(s => s.id !== id) }));
  };

  const updateLab = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      labs: prev.labs.map(l => l.id === id ? { ...l, [field]: value } : l)
    }));
  };

  const addLab = () => {
    setFormData(prev => ({
      ...prev,
      labs: [...prev.labs, {
        id: uid(), name: "", course: "B.Pharm", dept: "Dept of Pharmaceutics",
        reqArea: 75, availArea: "", concStudents: "20", gas: false, water: false,
        electricity: false, lat: "", lng: "", indoorPhoto: null, outdoorPhoto: null
      }]
    }));
  };

  const removeLab = (id) => {
    setFormData(prev => ({ ...prev, labs: prev.labs.filter(l => l.id !== id) }));
  };

  const updateCurriculum = (field, value) => {
    setFormData(prev => ({ ...prev, curriculum: { ...prev.curriculum, [field]: value } }));
  };

  const updateLibrary = (field, value) => {
    setFormData(prev => ({ ...prev, library: { ...prev.library, [field]: value } }));
  };

  const updateFinance = (field, value) => {
    setFormData(prev => ({ ...prev, finance: { ...prev.finance, [field]: value } }));
  };

  const updateClassroom = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      infrastructure: {
        ...prev.infrastructure,
        classrooms: prev.infrastructure.classrooms.map(c => c.id === id ? { ...c, [field]: value } : c)
      }
    }));
  };

  const addClassroom = () => {
    setFormData(prev => ({
      ...prev,
      infrastructure: {
        ...prev.infrastructure,
        classrooms: [...prev.infrastructure.classrooms, {
          id: uid(), name: `Class Room ${prev.infrastructure.classrooms.length + 1}`,
          course: "B.Pharm", reqArea: 75, availArea: ""
        }]
      }
    }));
  };

  const updateCommonFacility = (name, value) => {
    setFormData(prev => ({
      ...prev,
      infrastructure: {
        ...prev.infrastructure,
        facilities: { ...prev.infrastructure.facilities, [name]: { availArea: value } }
      }
    }));
  };

  return (
    <FormContext.Provider value={{
      formData, setFormData,
      errors, setErrors,
      updateInstitution, updateCourses, updateInfrastructure,
      updateFaculty, addFaculty, removeFaculty,
      updateNonTeaching, addNonTeaching, removeNonTeaching,
      updateLab, addLab, removeLab,
      updateCurriculum, updateLibrary, updateFinance,
      updateClassroom, addClassroom, updateCommonFacility
    }}>
      {children}
    </FormContext.Provider>
  );
}

export const useForm = () => useContext(FormContext);
export function generatePDF(formData) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4" });
  const W = doc.internal.pageSize.getWidth();
  let y = 15;

  const addPage = () => { doc.addPage(); y = 15; };
  const checkY = (needed = 10) => { if (y + needed > 280) addPage(); };

  doc.setFillColor(13, 27, 42);
  doc.rect(0, 0, W, 20, "F");
  doc.setTextColor(200, 151, 58);
  doc.setFontSize(11); doc.setFont("helvetica","bold");
  doc.text("PHARMACY COUNCIL OF INDIA — DIGI-PHARMed", W/2, 8, { align:"center" });
  doc.setTextColor(255,255,255);
  doc.setFontSize(9); doc.setFont("helvetica","normal");
  doc.text("Standard Inspection Form | AY 2026–27", W/2, 14, { align:"center" });
  y = 28;

  const sectionHeader = (title, tag) => {
    checkY(16);
    doc.setFillColor(243,244,246);
    doc.rect(10, y, W-20, 10, "F");
    doc.setTextColor(13, 27, 42);
    doc.setFontSize(9); doc.setFont("helvetica","bold");
    doc.text(`${tag}  ${title}`, 14, y+6.5);
    y += 14;
  };

  const field = (label, value, x = 14, width = 85) => {
    checkY(7);
    doc.setTextColor(74, 85, 104);
    doc.setFontSize(7.5); doc.setFont("helvetica","normal");
    doc.text(label + ":", x, y);
    doc.setTextColor(13, 27, 42);
    doc.setFont("helvetica","bold");
    const val = String(value || "—");
    const lines = doc.splitTextToSize(val, width);
    doc.text(lines, x + 40, y);
    y += 6 * lines.length;
  };

  const twoCol = (pairs) => {
    const half = Math.ceil(pairs.length / 2);
    const left = pairs.slice(0, half);
    const right = pairs.slice(half);
    const startY = y;
    left.forEach(([l, v]) => { field(l, v, 14, 70); });
    const midY = y;
    y = startY;
    right.forEach(([l, v]) => { field(l, v, 110, 70); });
    y = Math.max(midY, y) + 2;
  };

  const inst = formData.institution || {};
  const courses = formData.courses || {};
  const infra = formData.infrastructure || {};
  const faculty = formData.faculty || [];
  const nonTeach = formData.nonTeaching || [];
  const labs = formData.labs || [];
  const curriculum = formData.curriculum || {};
  const library = formData.library || {};
  const finance = formData.finance || {};

  sectionHeader("INSTITUTION DETAILS", "01");
  twoCol([
    ["Institution Name", inst.name], ["PCI Code", inst.pciCode],
    ["Established", inst.yearEst], ["Type", inst.instType],
    ["Principal/HOI", inst.hoiName], ["Council No.", inst.hoiCouncilNo],
    ["Email", inst.email], ["Mobile", inst.mobile],
    ["State", inst.state], ["District", inst.district],
    ["Pin Code", inst.pincode], ["Latitude/Longitude", `${inst.lat || "—"}, ${inst.lng || "—"}`],
  ]);

  sectionHeader("COURSES & INTAKE", "02");
  const selCourses = Object.entries(courses.selected || {}).filter(([,v])=>v).map(([k])=>k.toUpperCase());
  field("Approved Courses", selCourses.join(", ") || "None selected");
  if (courses.mpharmSpecs?.length) field("M.Pharm Specialisations", courses.mpharmSpecs.join(", "));
  y += 4;

  if (window.jspdf?.AutoTable || doc.autoTable) {
    doc.autoTable({
      startY: y,
      head: [["Course","Sanctioned Intake","Actual Admissions","Status"]],
      body: (courses.intakes || []).map(r => [r.course, r.sanctioned, r.actual, r.status]),
      theme:"grid", headStyles:{ fillColor:[13,27,42], textColor:255, fontSize:8 },
      bodyStyles:{ fontSize:8 }, margin:{ left:14, right:14 },
    });
    y = doc.lastAutoTable.finalY + 6;
  }

  sectionHeader("PHYSICAL INFRASTRUCTURE", "03");
  twoCol([
    ["Land Area (Acres)", infra.landArea], ["Independent Building", infra.indBuilding ? "Yes":"No"],
    ["Separate Campus", infra.sepCampus ? "Yes":"No"], ["Total Built-up (sq.mt)", infra.totalBuiltup],
    ["Instructional Area", infra.instructional], ["Admin Area", infra.admin],
    ["Amenities Area", infra.amenities], ["Circulation Area", infra.circulation],
  ]);

  if (infra.classrooms?.length && doc.autoTable) {
    checkY(20);
    doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.setTextColor(13,27,42);
    doc.text("Classrooms", 14, y); y += 4;
    doc.autoTable({
      startY: y,
      head: [["Room","Course","Req. Area (sq.mt)","Avail. Area (sq.mt)","Compliant"]],
      body: infra.classrooms.map(r => [r.name, r.course, r.reqArea, r.availArea, r.availArea >= r.reqArea ? "✓ Yes":"✗ No"]),
      theme:"grid", headStyles:{ fillColor:[13,27,42], textColor:255, fontSize:8 },
      bodyStyles:{ fontSize:8 }, margin:{ left:14, right:14 },
    });
    y = doc.lastAutoTable.finalY + 4;
  }

  if (doc.autoTable) {
    checkY(20);
    doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.setTextColor(13,27,42);
    doc.text("Common Facilities", 14, y); y += 4;
    doc.autoTable({
      startY: y,
      head: [["Facility","Type","Req. Area","Avail. Area","Unit","Status"]],
      body: COMMON_FACILITIES.map(f => {
        const saved = (infra.facilities || {})[f.name] || {};
        const avail = saved.availArea || "";
        const compliant = f.reqArea ? (parseFloat(avail) >= f.reqArea ? "✓":"✗") : "—";
        return [f.name, f.type, f.reqArea || "—", avail || "—", f.unit, compliant];
      }),
      theme:"grid", headStyles:{ fillColor:[13,27,42], textColor:255, fontSize:7 },
      bodyStyles:{ fontSize:7 }, margin:{ left:14, right:14 },
      columnStyles:{ 0:{ cellWidth:55 } },
    });
    y = doc.lastAutoTable.finalY + 6;
  }

  addPage();
  sectionHeader("TEACHING FACULTY", "04");
  if (faculty.length && doc.autoTable) {
    doc.autoTable({
      startY: y,
      head: [["#","Name","Council No.","Qualifications","Designation","Departments","Course","Exp","Workload","DOJ","AEBAS","FT/PT"]],
      body: faculty.map((f,i) => [
        i+1, f.name, f.councilNo,
        (f.qualifications||[]).join(", "),
        f.designation,
        (f.departments||[]).join(", "),
        f.course, f.exp, `${f.workload} hrs/wk`, f.doj, f.aebas, f.ftpt
      ]),
      theme:"grid", headStyles:{ fillColor:[13,27,42], textColor:255, fontSize:7 },
      bodyStyles:{ fontSize:7 }, margin:{ left:14, right:14 },
      columnStyles:{ 0:{ cellWidth:8 }, 2:{ cellWidth:22 } },
    });
    y = doc.lastAutoTable.finalY + 6;
  }

  sectionHeader("NON-TEACHING STAFF", "05");
  if (nonTeach.length && doc.autoTable) {
    doc.autoTable({
      startY: y,
      head: [["#","Name","Qualification","Designation","Department","Date of Joining","Mobile"]],
      body: nonTeach.map((s,i) => [i+1, s.name, s.qual, s.designation, s.dept, s.doj, s.mobile]),
      theme:"grid", headStyles:{ fillColor:[13,27,42], textColor:255, fontSize:8 },
      bodyStyles:{ fontSize:8 }, margin:{ left:14, right:14 },
    });
    y = doc.lastAutoTable.finalY + 6;
  }

  sectionHeader("LABORATORY REGISTRATION", "06");
  if (labs.length && doc.autoTable) {
    doc.autoTable({
      startY: y,
      head: [["#","Lab Name","Course","Dept","Req Area (sq.mt)","Avail Area (sq.mt)","Conc. Students","Gas","Water","Compliant"]],
      body: labs.map((l,i) => [
        i+1, l.name, l.course, l.dept, l.reqArea, l.availArea, l.concStudents,
        l.gas ? "Y":"N", l.water ? "Y":"N",
        (parseFloat(l.availArea) >= 83.6 ? "✓":"✗")
      ]),
      theme:"grid", headStyles:{ fillColor:[13,27,42], textColor:255, fontSize:7 },
      bodyStyles:{ fontSize:7 }, margin:{ left:14, right:14 },
      columnStyles:{ 1:{ cellWidth:45 } },
    });
    y = doc.lastAutoTable.finalY + 6;
  }

  sectionHeader("CURRICULUM & EXAMINATION", "08");
  twoCol([
    ["Working Days — B.Pharm", curriculum.wdBpharm], ["Working Days — Pharm.D", curriculum.wdPharmd],
    ["Sessional Exams/year", curriculum.sessionalCount], ["Attendance Tracked", curriculum.attendanceTracked],
  ]);

  sectionHeader("LIBRARY", "09");
  twoCol([
    ["Library Area (sq.ft)", library.area], ["Reading Room Capacity", library.readingCapacity],
    ["National Journals", library.nationalJournals], ["International Journals", library.intlJournals],
  ]);

  sectionHeader("FINANCE", "10");
  twoCol([
    ["Total Income (₹)", finance.totalIncome], ["Salary Expenditure (₹)", finance.salaryExp],
    ["PAN Number", finance.pan], ["Total Expenditure (₹)", finance.totalExp],
  ]);

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(243,244,246);
    doc.rect(0, 287, W, 10, "F");
    doc.setTextColor(138,151,168);
    doc.setFontSize(7); doc.setFont("helvetica","normal");
    doc.text(`PCI SIF 2026–27 | Generated: ${new Date().toLocaleString("en-IN")}`, 14, 293);
    doc.text(`Page ${i} of ${totalPages}`, W - 14, 293, { align:"right" });
  }

  doc.save(`PCI_SIF_${inst.name || "Institution"}_2026-27.pdf`);
}